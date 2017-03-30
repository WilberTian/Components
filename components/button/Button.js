define([
	'jquery',
	'../Component',
	'../Utils',
	'text!./Button.ejs'
], function($, Component, Utils, ejsTpl){

	var _data = {
		text: '',
		disabled: false,

		template: ejsTpl,

		messages: {
			'BUTTON_CLICK': Utils.noop
		},

		events: {
			'click .C_Button': 'buttonClick_event'
		}
	}

	function Button(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Button, Component);

	Button.prototype.afterMount = function() {
		if(this.disabled) {
			this.find('.C_Button').addClass('disabled-button');
		} else {
			this.find('.C_Button').removeClass('disabled-button');
		}
	}

	Button.prototype.buttonClick_event = function(e) {
		if(!this.disabled) this.msgBus.publish('BUTTON_CLICK', this.currentPage);
	}

	return Button;
});
