define([
	'jquery',
	'../Component',
	'../Utils',
	'text!./Textarea.ejs'
], function($, Component, Utils, ejsTpl){

	Textarea._model = {
		text: '',
		placeholder: '',
		readonly: false,
		rows: 8,
		cols: -1,
		resize: 'both'	// none/horizontal/vertical/both
	};

	Textarea._view = {
		template: ejsTpl,

		events: {
			// see setup in afterMount
			'keyup .C_Textarea_input': 'onKeyup_evnet',
			'blur .C_Textarea_input': 'onBlur_event',
			'focus .C_Textarea_input': 'onFocus_event',
			'click .C_Textarea_input': 'onClick_event'
		}
	};

	Textarea._messages = {
		TEXT_CLICK: 'TEXT_CLICK', 
		TEXT_KEYUP: 'TEXT_KEYUP', 
		TEXT_FOCUS: 'TEXT_FOCUS'
	};

	function Textarea(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Textarea, Component);

	Textarea.prototype.afterMount = function() {

		if(!this.model.readonly) {
			this.view.events = {
				'keyup .C_Textarea_input': 'onKeyup_evnet',
				'blur .C_Textarea_input': 'onBlur_event',
				'focus .C_Textarea_input': 'onFocus_event'
			}
		} else {
			this.view.events = {
				'click .C_Textarea_input': 'onClick_event'
			}
		}
	}

	Textarea.prototype.onClick_event = function(e) {
		var text = $(e.currentTarget).val();
		this.msgBus.publish('TEXT_CLICK', e, this.guid, text);
	}

	Textarea.prototype.onKeyup_evnet = function(e) {
		this.updateModel({
			text: $(e.currentTarget).val()
		});

		// make sure the cursor will be at the end of the text after re-render
		this.find('.C_Textarea_input').val(this.model.text);
		this.find('.C_Textarea_input').focus();

		this.msgBus.publish('TEXT_KEYUP', e, this.guid, this.model.text);
	}

	Textarea.prototype.onBlur_event = function(e) {
		var text = $(e.currentTarget).val();

		this.msgBus.publish('TEXT_BLUR', e, this.guid, text);
	}

	Textarea.prototype.onFocus_event = function(e) {
		var text = $(e.currentTarget).val();
		this.msgBus.publish('TEXT_FOCUS', e, this.guid, text);
	}
 
	return Textarea;
});
