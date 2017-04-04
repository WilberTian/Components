define([
	'jquery',
	'../Component',
	'../Utils',
	'text!./DropdownButton.ejs',
	'../button/Button',
	'../options/Options'
], function($, Component, Utils, ejsTpl, Button, Options){

	DropdownButton._model = {
		options: [],
		text: ''
	};

	DropdownButton._view = {
		template: ejsTpl
	};

	DropdownButton._messages = {};

	function DropdownButton(options) {
		Component.apply(this, arguments || {});
	}
	Utils.inherit(DropdownButton, Component);

	DropdownButton.prototype.afterMount = function() {
		var self = this;

		self.c_button = new Button({
			$el: self.find('.C_DropdownButton_Button'),
			model: {
				text: self.model.text,
				iconClass: 'fa fa-chevron-down'
			},
			
			messages: {
				'BUTTON_CLICK': self.proxy(self.clickDropdownButton_message)
			}
		});

		self.c_options = new Options({
			$el: self.find('.C_DropdownButton_Options'),
			model: {
				options: self.model.options
			},
			
			messages: {
				'OPTIONS_SELECT': self.proxy(self.dropdownButtonOption_message),
				'CLICK_OUTSIDE': self.proxy(self.clickOutside_message)
			}
		})
	}

	DropdownButton.prototype.clickDropdownButton_message = function(e) {
		e.stopPropagation();
		this.c_options.toggle();
	}

	DropdownButton.prototype.clickOutside_message = function() {
		this.c_options.hide();
	}

	DropdownButton.prototype.dropdownButtonOption_message = function(e, guid, dropdownButtonItem) {
		this.c_options.hide();
	}

	return DropdownButton;
});
