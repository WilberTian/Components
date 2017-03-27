define([
	'jquery',
	'Component',
	'Utils',
	'Text',
	'IconButton',
	'text!Stepper.ejs'
], function($, Component, Utils, Text, IconButton, ejsTpl){

	var _data = {
		number: 0,
		upperLimitation: Infinity,
		lowerLimitation: -Infinity,

		template: ejsTpl

	}

	function Stepper(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Stepper, Component);

	Stepper.prototype.afterMount = function() {
		var self = this;

		self.c_text = new Text({
			$el: self.find('.C_Stepper_text'),
			text: self.number,
			msgBus: self.msgBus
		});

		self.c_dec = new IconButton({
			$el: self.find('.C_Stepper_dec'),
			iconClass: 'fa fa-minus'
		})

		self.c_inc = new IconButton({
			$el: self.find('.C_Stepper_inc'),
			iconClass: 'fa fa-plus'
		})
	}
 
	return Stepper;
});
