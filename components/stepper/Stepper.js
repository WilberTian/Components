define([
	'jquery',
	'../Component',
	'../Utils',
	'../text/Text',
	'../button/Button',
	'text!./Stepper.ejs'
], function($, Component, Utils, Text, Button, ejsTpl){

	Stepper._model ={
		number: 0,
		step: 1,
		upperLimitation: Infinity,
		lowerLimitation: -Infinity
	};

	Stepper._view = {
		template: ejsTpl
	};

	Stepper._messages = {};

	function Stepper(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Stepper, Component);

	Stepper.prototype.afterMount = function() {
		var self = this;

		self.c_text = new Text({
			$el: self.find('.C_Stepper_text'),
			model: {
				text: self.model.number,
				disabled: true
			}
		});
		self.c_text.find('.C_Text_input').css('text-align', 'center');

		self.c_dec = new Button({
			$el: self.find('.C_Stepper_dec'),
			model: {
				iconClass: 'fa fa-minus'
			},

			messages: {
				'BUTTON_CLICK': self.proxy(self.decButtonClick_message)
			}
		})

		self.c_inc = new Button({
			$el: self.find('.C_Stepper_inc'),
			model: {
				iconClass: 'fa fa-plus'
			},

			messages: {
				'BUTTON_CLICK': self.proxy(self.incButtonClick_message)
			}
		})
	}

	Stepper.prototype.decButtonClick_message = function() {
		var self = this;

		this.updateModel({
			number: self.model.number - self.model.step
		});
	}

	Stepper.prototype.incButtonClick_message = function() {
		var self = this;

		this.updateModel({
			number: self.model.number + self.model.step
		});
	}
 
	return Stepper;
});
