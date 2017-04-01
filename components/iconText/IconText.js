define([
	'jquery',
	'moment',
	'../Component',
	'../Utils',
	'text!./IconText.ejs',
	'../text/Text',
	'../icon/Icon'
], function($, moment, Component, Utils, ejsTpl, Text, Icon) {
	IconText._model = {
		text: '',
		placeholder: '',
		disabled: false,
		iconClass: ''
	};

	IconText._view = {
		template: ejsTpl
	};

	IconText._messages = Text._messages;

	function IconText(options) {
		Component.apply(this, arguments || {});
	}
	Utils.inherit(IconText, Component);
	
	IconText.prototype.afterMount = function() {
		var self = this;
		self.c_text = new Text({
			$el: self.find('.C_IconText_text'),
			model: {
				text: self.model.text,
				placeholder: self.model.placeholder,
				disabled: self.model.disabled,
			},
			msgBus: self.msgBus
		});

		self.c_icon = new Icon({
			$el: self.find('.C_IconText_icon'),
			model: {
				iconClass: self.model.iconClass
			}
		});
	}

	return IconText;

});