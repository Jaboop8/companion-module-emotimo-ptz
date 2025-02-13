let { MODELS, SERIES_SPECS } = require('./models.js')
const c = require('./choices.js')

module.exports = {
	// ##########################
	// #### Define Variables ####
	// ##########################
	initVariables: function () {
		let variables = []
		let SERIES = {}

		// Set the model and series selected, if in auto, detect what model is connected
		if (this.config.model === 'Auto') {
			this.data.model = this.data.modelDetected
		} else {
			this.data.model = this.config.model
		}

		if (this.data.model !== '') {
			this.data.series = MODELS.find((MODELS) => MODELS.id == this.data.model).series
		}

		// Find the specific commands for a given series
		if (
			this.data.series === 'Auto' ||
			this.data.series === 'Other' ||
			SERIES_SPECS.find((SERIES_SPECS) => SERIES_SPECS.id == this.data.series) == undefined
		) {
			SERIES = SERIES_SPECS.find((SERIES_SPECS) => SERIES_SPECS.id == 'Other')
		}
		else {
			SERIES = SERIES_SPECS.find((SERIES_SPECS) => SERIES_SPECS.id == this.data.series)
		}

		variables.push({ variableId: 'series', name: 'Camera Series' })
		variables.push({ variableId: 'model', name: 'Model of Camera' })

		//System
		if (SERIES.variables.powerState == true) {
			variables.push({ variableId: 'powerState', name: 'Power State Idle/Standby' })
		}
		if (SERIES.variables.cameraName == true) {
			variables.push({ variableId: 'cameraName', name: 'Camera Name' })
		}
		if (SERIES.variables.tallyProgram == true) {
			variables.push({ variableId: 'tallyProgram', name: 'Tally Program ON/OFF' })
		}
		if (SERIES.variables.tallyPreview == true) {
			variables.push({ variableId: 'tallyPreview', name: 'Tally Preview ON/OFF' })
		}
		if (SERIES.variables.digitalZoom == true) {
			variables.push({ variableId: 'digitalZoom', name: 'Digital Zoom ON/OFF' })
		}
		if (SERIES.variables.imageStabilization == true) {
			variables.push({ variableId: 'imageStabilization', name: 'Image Stabilization ON/OFF' })
		}		
		if (SERIES.variables.firmwareVersion == true) {
			variables.push({ variableId: 'firmwareVersion', name: 'Firmware Version' })
		}
		if (SERIES.variables.protocolVersion == true) {
			variables.push({ variableId: 'protocolVersion', name: 'Protocol Version' })
		}

		//Zoom/Focus
		if (SERIES.variables.zoomSpeed == true) {
			variables.push({ variableId: 'zoomSpeed', name: 'Zoom Speed' })
		}
		if (SERIES.variables.zoomValue == true) {
			variables.push({ variableId: 'zoomValue', name: 'Zoom Value' })
		}
		if (SERIES.variables.focusSpeed == true) {
			variables.push({ variableId: 'focusSpeed', name: 'Focus Speed' })
		}
		if (SERIES.variables.focusValue == true) {
			variables.push({ variableId: 'focusValue', name: 'Focus Value' })
		}
		if (SERIES.variables.autoFocusMode == true) {
			variables.push({ variableId: 'autoFocusMode', name: 'Auto Focus Mode' })
		}

		//Pan/Tilt
		if (SERIES.variables.panTiltSpeedValue == true) {
			variables.push({ variableId: 'panTiltSpeedValue', name: 'Pan/Tilt Speed Value' })
		}

		//Exposure
		if (SERIES.variables.exposureMode == true) {
			variables.push({ variableId: 'exposureShootingMode', name: 'Exposure Shooting Mode' })
			variables.push({ variableId: 'exposureMode', name: 'Exposure Mode' })
		}
		if (SERIES.variables.ae == true) {
			variables.push({ variableId: 'aeGainLimitMax', name: 'AE Gain Limit Max' })
			variables.push({ variableId: 'aeGainLimitMaxMin', name: 'AE Gain Limit Max Min' })
			variables.push({ variableId: 'aeGainLimitMaxMax', name: 'AE Gain Limit Max Max' })
			variables.push({ variableId: 'aeBrightness', name: 'AE Brightness' })
			variables.push({ variableId: 'aePhotometry', name: 'AE Photometry' })
			variables.push({ variableId: 'aeFlickerReduct', name: 'AE Flicker Reduct' })
			variables.push({ variableId: 'aeResp', name: 'AE Resp' })
		}
		if (SERIES.variables.shutterMode == true) {
			variables.push({ variableId: 'shutterMode', name: 'Shutter Mode' })
		}
		if (SERIES.variables.shutterValue == true) {
			variables.push({ variableId: 'shutterValue', name: 'Shutter Value' })
		}
		if (SERIES.variables.irisMode == true) {
			variables.push({ variableId: 'irisMode', name: 'Iris Mode' })
		}
		if (SERIES.variables.irisValue == true) {
			variables.push({ variableId: 'irisValue', name: 'Iris Value' })
		}
		if (SERIES.variables.gainMode == true) {
			variables.push({ variableId: 'gainMode', name: 'Gain Mode' })
		}
		if (SERIES.variables.gainValue == true) {
			variables.push({ variableId: 'gainValue', name: 'Gain Value' })
		}
		if (SERIES.variables.ndfilterValue == true) {
			variables.push({ variableId: 'ndfilterValue', name: 'Neutral Density Value' })
		}
		if (SERIES.variables.pedestalValue == true) {
			variables.push({ variableId: 'pedestalValue', name: 'Pedestal Value' })
		}

		//White Balance
		if (SERIES.variables.whitebalanceMode == true) {
			variables.push({ variableId: 'whitebalanceMode', name: 'White Balance Mode' })
		}
		if (SERIES.variables.kelvinValue == true) {
			variables.push({ variableId: 'kelvinValue', name: 'Kelvin Value' })
		}
		if (SERIES.variables.rGainValue == true) {
			variables.push({ variableId: 'rGainValue', name: 'Red Gain Value' })
		}
		if (SERIES.variables.bGainValue == true) {
			variables.push({ variableId: 'bGainValue', name: 'Blue Gain Value' })
		}

		//Recall Preset
		if (SERIES.variables.presetNames == true) {
			for (let i = 1; i <= 100; i++) {
				variables.push({ variableId: 'presetname_' + i, name: 'Preset ' + i + ' Name' });
			}
		}
		if (SERIES.variables.presetLastUsed == true) {
			variables.push({ variableId: 'presetLastUsed', name: 'Preset Last Used' })
		}
		if (SERIES.variables.presetRecallMode == true) {
			variables.push({ variableId: 'presetRecallMode', name: 'Preset Recall Mode' })
		}
		if (SERIES.variables.presetTimeValue == true) {
			variables.push({ variableId: 'presetTimeValue', name: 'Preset Time Value' })
		}
		if (SERIES.variables.presetSpeedValue == true) {
			variables.push({ variableId: 'presetSpeedValue', name: 'Preset Speed Value' })
		}

		return variables
	},

	// #########################
	// #### Check Variables ####
	// #########################
	checkVariables: function () {
		try {
			let SERIES = {};

			// Set the model and series selected, if in auto, detect what model is connected
			if (this.config.model === 'Auto') {
				this.data.model = this.data.modelDetected
			} else {
				this.data.model = this.config.model
			}

			if (this.data.model !== '') {
				this.data.series = MODELS.find((MODELS) => MODELS.id == this.data.model).series
			}

			// Find the specific commands for a given series
			if (
				this.data.series === 'Auto' ||
				this.data.series === 'Other' ||
				SERIES_SPECS.find((SERIES_SPECS) => SERIES_SPECS.id == this.data.series) == undefined
			) {
				SERIES = SERIES_SPECS.find((SERIES_SPECS) => SERIES_SPECS.id == 'Other')
			}
			else {
				SERIES = SERIES_SPECS.find((SERIES_SPECS) => SERIES_SPECS.id == this.data.series)
			}

			variableValues = {};

			variableValues.seris = this.data.series;
			variableValues.model = this.data.model;
	
			//System
			variableValues.cameraName = this.data.cameraName;
			variableValues.powerState = this.data.powerState;
			variableValues.tallyProgram = this.data.tallyProgram;
			variableValues.tallyPreview = this.data.tallyPreview;
			variableValues.digitalZoom = this.data.digitalZoom;
			variableValues.imageStabilization = this.data.imageStabilization;
			variableValues.firmwareVersion = this.data.firmwareVersion;
			variableValues.protocolVersion = this.data.protocolVersion;
	
			//Zoom/Focus
			variableValues.zoomSpeed = this.data.zoomSpeed;
			variableValues.zoomValue = this.data.zoomValue;
			variableValues.focusSpeed = c.CHOICES_FOCUS_SPEED[this.fSpeedIndex].label;
			variableValues.focusValue = this.data.focusValue;
			variableValues.autoFocusMode = this.data.autoFocusMode;
	
			//Pan/Tilt
			variableValues.panTiltSpeedValue = c.CHOICES_PT_SPEED[this.ptSpeedIndex].label;
	
			//Exposure
			if (SERIES.variables.exposureShootingMode == true) {
				let index;
				let exposureShootingModeValue = this.data.exposureShootingMode;
				if (SERIES.actions.exposureShootingMode.dropdown) {
					index = SERIES.actions.exposureShootingMode.dropdown.findIndex((EXPSHOOTINGMODE) => EXPSHOOTINGMODE.id == this.data.exposureShootingMode);
					this.exposureShootingModeIndex = index;
					let exposureShootingMode = SERIES.actions.exposureShootingMode.dropdown[this.exposureShootingModeIndex];
					if (exposureShootingMode) {
						exposureShootingModeValue = exposureShootingMode.label;
					}
				}
				else {
					index = c.CHOICES_EXPOSURESHOOTINGMODES_OTHER().findIndex((EXPSHOOTINGMODE) => EXPSHOOTINGMODE.id == this.data.exposureShootingMode);
					this.exposureShootingModeIndex = index;
					let exposureShootingMode = SERIES.actions.exposureShootingMode.dropdown[this.exposureShootingModeIndex];
					if (exposureShootingMode) {
						exposureShootingModeValue = exposureShootingMode.label;
					}
				}
				variableValues.exposureShootingMode = exposureShootingModeValue;
			}

			if (SERIES.variables.exposureMode == true) {
				let index;
				let exposureModeValue = this.data.exposureMode;
				if (SERIES.actions.exposureMode.dropdown) {
					index = SERIES.actions.exposureMode.dropdown.findIndex((EXPMODE) => EXPMODE.id == this.data.exposureMode);
					this.exposureModeIndex = index;
					let exposureMode = SERIES.actions.exposureMode.dropdown[this.exposureModeIndex];
					if (exposureMode) {
						exposureModeValue = exposureMode.label;
					}
				}
				else {
					index = c.CHOICES_EXPOSUREMODES_OTHER().findIndex((EXPMODE) => EXPMODE.id == this.data.exposureMode);
					this.exposureModeIndex = index;
					let exposureMode = SERIES.actions.exposureMode.dropdown[this.exposureModeIndex];
					if (exposureMode) {
						exposureModeValue = exposureMode.label;
					}
				}
				variableValues.exposureMode = exposureModeValue;
			}

			if (SERIES.variables.ae == true) {
				variableValues.aeGainLimitMax = this.data.aeGainLimitMax;
				variableValues.aeGainLimitMaxMin = this.data.aeGainLimitMaxMin;
				variableValues.aeGainLimitMaxMax = this.data.aeGainLimitMaxMax;
				variableValues.aeBrightness = this.data.aeBrightness;
				variableValues.aePhotometry = this.data.aePhotometry;
				variableValues.aeFlickerReduct = this.data.aeFlickerReduct;
				variableValues.aeResp = this.data.aeResp;
			}

			if (SERIES.variables.shutterMode == true) {
				variableValues.shutterMode = this.data.shutterMode;
			}

			if (SERIES.variables.shutterValue == true) {
				let index;
				let shutterValue = this.data.shutterValue;
				if (SERIES.actions.shutter.dropdown) {
					index = SERIES.actions.shutter.dropdown.findIndex((SHUTTER) => SHUTTER.id == this.data.shutterValue);
					this.shutterIndex = index;
					let shutter = SERIES.actions.shutter.dropdown[this.shutterIndex];
					if (shutter) {
						shutterValue = shutter.label;
					}
				}
				else {
					index = c.CHOICES_SHUTTER_OTHER().findIndex((SHUTTER) => SHUTTER.id == this.data.shutterValue);
					this.shutterIndex = index;
					let shutter = SERIES.actions.shutter.dropdown[this.shutterIndex];
					if (shutter) {
						shutterValue = shutter.label;
					}
				}
				variableValues.shutterValue = shutterValue;
			}

			if (SERIES.variables.irisMode == true) {
				let value = this.data.irisMode;

				if (this.data.irisMode === 'auto') {
					value = 'Auto';
				}
				else if (this.data.irisMode === 'manual') {
					value = 'Manual';
				}

				variableValues.irisMode = value;
			}

			if (SERIES.variables.irisValue == true) {
				let index;
				let irisValue = this.data.irisValue;
				if (SERIES.actions.iris.dropdown) {
					index = SERIES.actions.iris.dropdown.findIndex((IRIS) => IRIS.id == this.data.irisValue);
					this.irisIndex = index;
					let iris = SERIES.actions.iris.dropdown[this.irisIndex];
					if (iris) {
						irisValue = iris.label;
					}
				}
				else {
					index = c.CHOICES_IRIS_OTHER().findIndex((IRIS) => IRIS.id == this.data.irisValue);
					this.irisIndex = index;
					let iris = SERIES.actions.iris.dropdown[this.irisIndex];
					if (iris) {
						irisValue = iris.label;
					}
				}
				variableValues.irisValue = irisValue;
			}

			if (SERIES.variables.gainMode == true) {
				let value = this.data.gainMode;

				if (this.data.gainMode === 'auto') {
					value = 'Auto';
				}
				else if (this.data.gainMode === 'manual') {
					value = 'Manual';
				}

				variableValues.gainMode = value;
			}

			if (SERIES.variables.gainValue == true) {
				let index;
				let gainValue = this.data.gainValue;
				if (SERIES.actions.gain.dropdown) {
					index = SERIES.actions.gain.dropdown.findIndex((GAIN) => GAIN.id == this.data.gainValue);
					this.gainIndex = index;
					let gain = SERIES.actions.gain.dropdown[this.gainIndex];
					if (gain) {
						gainValue = gain.label;
					}
				}
				else {
					index = c.CHOICES_GAIN_OTHER().findIndex((GAIN) => GAIN.id == this.data.gainValue);
					this.gainIndex = index;
					let gain = SERIES.actions.gain.dropdown[this.gainIndex];
					if (gain) {
						gainValue = gain.label;
					}
				}
				variableValues.gainValue = gainValue;
			}

			if (SERIES.variables.ndfilterValue == true) {
				let index;
				let ndfilterValue = this.data.ndfilterValue;
				if (SERIES.actions.ndfilter.dropdown) {
					index = SERIES.actions.ndfilter.dropdown.findIndex((NDFILTER) => NDFILTER.id == this.data.ndfilterValue);
					this.ndfilterIndex = index;
					let ndfilter = SERIES.actions.ndfilter.dropdown[this.ndfilterIndex];
					if (ndfilter) {
						ndfilterValue = ndfilter.label;
					}
				}
				else {
					index = c.CHOICES_NDFILTER_OTHER().findIndex((NDFILTER) => NDFILTER.id == this.data.ndfilterValue);
					this.ndfilterIndex = index;
					let ndfilter = SERIES.actions.ndfilter.dropdown[this.ndfilterIndex];
					if (ndfilter) {
						ndfilterValue = ndfilter.label;
					}
				}
				variableValues.ndfilterValue = ndfilterValue;
			}

			if (SERIES.variables.pedestalValue == true) {
				let index;
				let pedestalValue = this.data.pedestalValue;
				if (SERIES.actions.pedestal.dropdown) {
					index = SERIES.actions.pedestal.dropdown.findIndex((PEDESTAL) => PEDESTAL.id == this.data.pedestalValue);
					this.pedestalIndex = index;
					let pedestal = SERIES.actions.pedestal.dropdown[this.pedestalIndex];
					if (pedestal) {
						pedestalValue = pedestal.label;
					}
				}
				else {
					index = c.CHOICES_PEDESTAL_OTHER().findIndex((PEDESTAL) => PEDESTAL.id == this.data.pedestalValue);
					this.pedestalIndex = index;
					let pedestal = SERIES.actions.pedestal.dropdown[this.pedestalIndex];
					if (pedestal) {
						pedestalValue = pedestal.label;
					}
				}
				variableValues.pedestalValue = pedestalValue;
			}
	
			//White Balance
			if (SERIES.variables.whitebalanceMode == true) {
				let wbmode = SERIES.actions.whitebalanceMode.dropdown.find((WBMODE) => WBMODE.id == this.data.whitebalanceMode);
				if (wbmode) {
					let value = wbmode.label;
					variableValues.whitebalanceMode = value;
				}
			}

			if (SERIES.variables.kelvinValue == true) {
				let kelvin = SERIES.actions.kelvin.dropdown.find((KELVIN) => KELVIN.id == this.data.kelvinValue);
				if (kelvin) {
					let value = kelvin.label;
					variableValues.kelvinValue = value;
				}
			}

			if (SERIES.variables.rGainValue == true) {
				let rGain = SERIES.actions.rGain.dropdown.find((RGAIN) => RGAIN.id == this.data.rGainValue);
				if (rGain) {
					let value = rGain.label;
					variableValues.rGainValue = value;
				}
			}

			if (SERIES.variables.bGainValue == true) {
				let bGain = SERIES.actions.bGain.dropdown.find((BGAIN) => BGAIN.id == this.data.bGainValue);
				if (bGain) {
					let value = bGain.label;
					variableValues.bGainValue = value;
				}
			}
			
			//Recall Preset
			if (SERIES.variables.presetNames == true) {
				for (let i = 1; i <= 100; i++) {
					variableValues[`presetname${i}`] = this.data[`presetname${i}`];
				}
			}

			if (SERIES.variables.presetLastUsed == true) {
				let indexLastUsed = c.CHOICES_PRESETS().findIndex((PRESETLASTUSED) => PRESETLASTUSED.id == this.data.presetLastUsed);
				this.presetLastUsedIndex = indexLastUsed;
				variableValues.presetLastUsed = c.CHOICES_PRESETS()[indexLastUsed].label;
			}

			if (SERIES.variables.presetRecallMode == true) {
				let index = c.CHOICES_PRESETRECALLMODES.findIndex((PRESETRECALLMODE) => PRESETRECALLMODE.id == this.data.presetRecallMode);
				this.presetRecallModeIndex = index;
				variableValues.presetRecallMode = c.CHOICES_PRESETRECALLMODES[index].label;
			}	

			if (SERIES.variables.presetTimeValue == true) {
				let value = c.CHOICES_PSTIME().find((PRESETTIMEVALUE) => PRESETTIMEVALUE.id == this.data.presetTimeValue).varLabel;
				variableValues.presetTimeValue = value;
			}

			if (SERIES.variables.presetSpeedValue == true) {
				let value = c.CHOICES_PSSPEED().find((PRESETSPEEDVALUE) => PRESETSPEEDVALUE.id == this.data.presetSpeedValue).varLabel;
				variableValues.presetSpeedValue = value;
			}
		}
		catch(error) {
			this.log('error', 'Error parsing Variables from PTZ: ' + String(error))
		}
	}
}
