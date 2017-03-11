define([
	'jquery',
	'Component',
	'MessageTypes',
	'Utils',
	'text!Text.ejs'
], function($, Component, MessageTypes, Utils, ejsTpl){

	var _data = {
		text: '',
		placeholder: '',

		template: ejsTpl,

		events: {
			'click .C_Text_wrapper': 'onClick_event',
			'keyup .C_Text_input': 'onKeyup_evnet'
		}
	}

	function Text(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Text, Component);

	Text.prototype.onClick_event = function(e) {
		this.text = $(e.currentTarget).val();
		this.msgBus.publish(this.msgBus.toMsgName(MessageTypes.TEXT_CLICK), e, this.text);
	}

	Text.prototype.onKeyup_evnet = function(e) {
		this.text = $(e.currentTarget).val();
		this.msgBus.publish(this.msgBus.toMsgName(MessageTypes.TEXT_KEY_UP), e, this.text);
	}
 
	return Text;
});
