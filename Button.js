define([
	'jquery',
	'Component',
	'Utils',
	'text!Button.ejs'
], function($, Component, Utils, ejsTpl){

	var _data = {
		text: 'button',

		template: ejsTpl,

		events: {
			'click .C_Button': 'buttonClick_event'
		}
	}

	function Button(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Button, Component);

	Button.prototype.buttonClick_event = function(e) {
		this.msgBus.publish(this.msgBus.toMsgName('BUTTON_CLICK'), this.currentPage);
	}
 
	return Button;
});
