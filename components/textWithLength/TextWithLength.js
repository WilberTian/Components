define([
	'jquery',
	'../Component',
	'../Utils',
	'text!./TextWithLength.ejs',
	'../text/Text',
	'../textLength/TextLength'
], function($, Component, Utils, ejsTpl, Text, TextLength){

	var _data = {
		text: '',
		placeholder: '',
		currentLength: 0,
		limitationLength: 0,

		template: ejsTpl,

		messages: {
			'TEXT_KEYUP': 'textKeyup_message',
			'TEXT_LENGTH_ERROR': 'textLengthError_message',
			'TEXT_LENGTH_OK': 'textLengthOk_message'
		}
	}

	function TextWithLength(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}

	Utils.inherit(TextWithLength, Component);
	

	TextWithLength.prototype.afterMount = function() {
		var self = this;

		self.c_text = new Text({
			$el: self.find('.C_TextWithLenght_Text'),
			text: self.text,
			placeholder: self.placeholder,
			msgBus: self.msgBus
		});

		self.c_textLength = new TextLength({
			$el: self.find('.C_TextWithLenght_TextLength'),
			currentLength: self.currentLength,
			limitationLength: self.limitationLength,
			msgBus: self.msgBus
		});
	}

	TextWithLength.prototype.textKeyup_message = function(e, guid, text) {
		this.msgBus.publish('TEXT_LENGTH_UPDATE', text.length);
	}
 	
 	TextWithLength.prototype.textLengthError_message = function() {
 		this.find('.C_Text_wrapper').addClass('error');
 	}

 	TextWithLength.prototype.textLengthOk_message = function() {
 		this.find('.C_Text_wrapper').removeClass('error');
 	}

	return TextWithLength;
});
