define([
	'jquery',
	'../Component',
	'../Utils',
	'text!./Text.ejs'
], function($, Component, Utils, ejsTpl){

	var _data = {
		text: '',
		placeholder: '',
		enabled: true,

		rules: [],

		template: ejsTpl,

		messages: {
			'TEXT_CLICK': Utils.noop,
			'TEXT_KEYUP': Utils.noop,
			'TEXT_FOCUS': Utils.noop
		},

		events: {
			// see setup in afterMount
			'keyup .C_Text_input': 'onKeyup_evnet',
			'blur .C_Text_input': 'onBlur_event',
			'focus .C_Text_input': 'onFocus_event',
			'click .C_Text_wrapper': 'onClick_event'
		}
	}

	function Text(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Text, Component);

	Text.prototype.afterMount = function() {

		if(this.enabled) {
			this.events = {
				'keyup .C_Text_input': 'onKeyup_evnet',
				'blur .C_Text_input': 'onBlur_event',
				'focus .C_Text_input': 'onFocus_event'
			}
		} else {
			this.events = {
				'click .C_Text_wrapper': 'onClick_event'
			}
		}
	}

	Text.prototype.onClick_event = function(e) {
		this.text = $(e.currentTarget).val();
		this.msgBus.publish('TEXT_CLICK', e, this.guid, this.text);
	}

	Text.prototype.onKeyup_evnet = function(e) {
		this.text = $(e.currentTarget).val();
		this.msgBus.publish('TEXT_KEYUP', e, this.guid, this.text);
	}

	Text.prototype.onBlur_event = function(e) {
		this.text = $(e.currentTarget).val();

		if (this.rules.length > 0) {
			this.validate(this.text);
		}
	}

	Text.prototype.onFocus_event = function(e) {
		this.text = $(e.currentTarget).val();
		this.msgBus.publish('TEXT_FOCUS', e, this.guid, this.text);
	}
 
	return Text;
});
