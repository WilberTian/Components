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
			messages: {
				'TEXT_KEYUP': self.proxy(self.textKeyup_message)
			}
			
		});

		self.c_textLength = new TextLength({
			$el: self.find('.C_TextWithLenght_TextLength'),
			currentLength: self.currentLength,
			limitationLength: self.limitationLength,
			messages: {
				'TEXT_LENGTH_ERROR': self.proxy(self.textLengthError_message),
				'TEXT_LENGTH_OK': self.proxy(self.textLengthOk_message)
			}
		});
	}

	TextWithLength.prototype.textKeyup_message = function(e, guid, text) {
		this.c_textLength.updateData({
			currentLength: text.length
		});
	}
 	
 	TextWithLength.prototype.textLengthError_message = function() {
 		this.find('.C_Text_wrapper').addClass('error');
 	}

 	TextWithLength.prototype.textLengthOk_message = function() {
 		this.find('.C_Text_wrapper').removeClass('error');
 	}

	return TextWithLength;
});
