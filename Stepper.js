define([
	'jquery',
	'Component',
	'Utils',
	'text!Stepper.ejs'
], function($, Component, Utils, ejsTpl){

	var _data = {
		number: 0,
		upperLimitation: Infinity,
		lowerLimitation: -Infinity,

		template: ejsTpl,

		events: {
			'click .C_Stepper .dec': 'decNumber_event',
			'click .C_Stepper .inc': 'incNumber_event',
			'keyup .C_Stepper_input': 'changeNumber_event'
		}
	}

	function Stepper(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Stepper, Component);
	
	Stepper.prototype.decNumber_event = function(e) {
		console.log('dec')
	}

	Stepper.prototype.incNumber_event = function(e) {
		console.log('inc')
	}

	Stepper.prototype.changeNumber_event = function(e) {
		console.log('change')
	}
 
	return Stepper;
});
