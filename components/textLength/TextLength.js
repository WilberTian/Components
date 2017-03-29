define([
	'jquery',
	'../Component',
	'../Utils',
	'text!./TextLength.ejs'
], function($, Component, Utils, ejsTpl){

	var _data = {
		currentLength: 0,
		limitationLength: 0,

		template: ejsTpl,

		messages: {
			'TEXT_LENGTH_UPDATE': 'textLengthUpdate_message'
		}
	}

	function TextLength(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}

	Utils.inherit(TextLength, Component);
	

	TextLength.prototype.textLengthUpdate_message = function(len) {
		this.updateData({
			currentLength: len
		})

		if(this.currentLength > this.limitationLength) {
			this.find('.C_TextLength').addClass('error');
			this.msgBus.publish('TEXT_LENGTH_ERROR');
		} else {
			this.find('.C_TextLength').removeClass('error');
			this.msgBus.publish('TEXT_LENGTH_OK');
		}
	}
 
	return TextLength;
});
