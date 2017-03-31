define([
	'jquery',
	'../Component',
	'../Utils',
	'text!./Button.ejs',
	'../icon/Icon'
], function($, Component, Utils, ejsTpl, Icon){
	Button._model = {
		text: '',
		iconClass: '',
		disabled: false,
	};

	Button._view = {
		template: ejsTpl,
		events: {
			'click .C_Button': 'buttonClick_event'
		}
	};

	Button._messages = {
		BUTTON_CLICK: 'BUTTON_CLICK'
	};

	function Button(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Button, Component);

	Button.prototype.afterMount = function() {
		var self = this;

		if(this.model.disabled) {
			this.find('.C_Button').addClass('disabled-button');
		} else {
			this.find('.C_Button').removeClass('disabled-button');
		}

		self.model.iconClass !== '' && new Icon({
			$el: self.find('.C_Button_icon'),
			model: {
				iconClass: self.model.iconClass
			}
		});
	}

	Button.prototype.buttonClick_event = function(e) {
		if(!this.model.disabled) this.msgBus.publish('BUTTON_CLICK', this.currentPage);
	}

	return Button;
});
