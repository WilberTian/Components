define([
	'jquery',
	'../Component',
	'../Utils',
	'text!./TextWithLength.ejs',
	'../text/Text',
	'../textLength/TextLength'
], function($, Component, Utils, ejsTpl, Text, TextLength){
	TextWithLength._model = {
		text: '',
		placeholder: '',
		currentLength: 0,
		limitationLength: 0
	};

	TextWithLength._view = {
		template: ejsTpl
	};

	function TextWithLength(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(TextWithLength, Component);
	

	TextWithLength.prototype.afterMount = function() {
		var self = this;

		self.c_text = new Text({
			$el: self.find('.C_TextWithLenght_Text'),
			model: {
				text: self.model.text,
				placeholder: self.model.placeholder,
			},
			messages: {
				'TEXT_KEYUP': self.proxy(self.textKeyup_message)
			}
			
		});

		self.c_textLength = new TextLength({
			$el: self.find('.C_TextWithLenght_TextLength'),
			model: {
				currentLength: self.model.currentLength,
				limitationLength: self.model.limitationLength
			},
			
			messages: {
				'TEXT_LENGTH_ERROR': self.proxy(self.textLengthError_message),
				'TEXT_LENGTH_OK': self.proxy(self.textLengthOk_message)
			}
		});
	}

	TextWithLength.prototype.textKeyup_message = function(e, guid, text) {
		this.updateModel({
			text: text,
			currentLength: text.length
		});

		this.find('.C_Text_input').focus();
	}
 	
 	TextWithLength.prototype.textLengthError_message = function() {
 		this.find('.C_Text_wrapper').addClass('error');
 	}

 	TextWithLength.prototype.textLengthOk_message = function() {
 		this.find('.C_Text_wrapper').removeClass('error');
 	}

	return TextWithLength;
});
