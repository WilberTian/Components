define([
	'jquery',
	'moment',
	'Component',
	'Utils',
	'text!IconText.ejs',
	'Text',
	'Icon'
], function($, moment, Component, Utils, ejsTpl, Text, Icon) {
	var _data = {
		text: '',
		placeholder: '',
		enabled: true,
		iconClass: '',

		template: ejsTpl
	}

	function IconText(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}
	Utils.inherit(IconText, Component);
	
	IconText.prototype.afterMount = function() {
		var self = this;
		self.c_text = new Text({
			$el: self.find('.C_IconText_text'),
			text: self.text,
			placeholder: self.placeholder,
			enabled: self.enabled,
			msgBus: self.msgBus
		});

		self.c_icon = new Icon({
			$el: self.find('.C_IconText_icon'),
			iconClass: self.iconClass
		})

	}

	return IconText;

});