define([
	'jquery',
	'../Component',
	'../Utils',
	'text!./Text.ejs'
], function($, Component, Utils, ejsTpl){

	Text._model = {
		text: '',
		placeholder: '',
		readonly: false
	};

	Text._view = {
		template: ejsTpl,

		events: {
			// see setup in afterMount
			'keyup .C_Text_input': 'onKeyup_evnet',
			'blur .C_Text_input': 'onBlur_event',
			'focus .C_Text_input': 'onFocus_event',
			'click .C_Text_input': 'onClick_event'
		}
	};

	Text._messages = {
		TEXT_CLICK: 'TEXT_CLICK', 
		TEXT_KEYUP: 'TEXT_KEYUP', 
		TEXT_FOCUS: 'TEXT_FOCUS'
	};

	function Text(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Text, Component);

	Text.prototype.afterMount = function() {

		if(!this.model.readonly) {
			this.view.events = {
				'keyup .C_Text_input': 'onKeyup_evnet',
				'blur .C_Text_input': 'onBlur_event',
				'focus .C_Text_input': 'onFocus_event'
			}
		} else {
			this.view.events = {
				'click .C_Text_input': 'onClick_event'
			}
		}
	}

	Text.prototype.onClick_event = function(e) {
		var text = $(e.currentTarget).val();
		this.msgBus.publish('TEXT_CLICK', e, this.guid, text);
	}

	Text.prototype.onKeyup_evnet = function(e) {
		this.updateModel({
			text: $(e.currentTarget).val()
		});

		// make sure the cursor will be at the end of the text after re-render
		this.find('.C_Text_input').val(this.model.text);
		this.find('.C_Text_input').focus();

		this.msgBus.publish('TEXT_KEYUP', e, this.guid, this.model.text);
	}

	Text.prototype.onBlur_event = function(e) {
		var text = $(e.currentTarget).val();

		this.msgBus.publish('TEXT_BLUR', e, this.guid, text);
	}

	Text.prototype.onFocus_event = function(e) {
		var text = $(e.currentTarget).val();
		this.msgBus.publish('TEXT_FOCUS', e, this.guid, text);
	}
 
	return Text;
});
