define([
	'jquery',
	'../Component',
	'../Utils',
	'text!./TextLength.ejs'
], function($, Component, Utils, ejsTpl){
	TextLength._model = {
		currentLength: 0,
		limitationLength: 0
	};

	TextLength._view = {
		template: ejsTpl
	};

	TextLength._messages = {
		TEXT_LENGTH_OK: 'TEXT_LENGTH_OK',
		TEXT_LENGTH_ERROR: 'TEXT_LENGTH_ERROR'
	};

	function TextLength(options) {
		Component.apply(this, arguments || {});

	}

	Utils.inherit(TextLength, Component);
	
	TextLength.prototype.afterMount = function() {
		if(this.model.currentLength > this.model.limitationLength) {
			this.find('.C_TextLength').addClass('error');
			this.msgBus.publish('TEXT_LENGTH_ERROR');
		} else {
			this.find('.C_TextLength').removeClass('error');
			this.msgBus.publish('TEXT_LENGTH_OK');
		}
	}
 
	return TextLength;
});
