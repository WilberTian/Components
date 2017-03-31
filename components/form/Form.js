define([
	'jquery',
	'require',
	'Component',
	'Utils',
	'text!Form.ejs'
], function($, require, Component, Utils, ejsTpl){

	var _data = {
		formElements: [],

		template: ejsTpl
	}

	function Form(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Form, Component);

	Form.prototype.afterMount = function() {
		var self = this;

		this.formElements.forEach(function(formElement){
			self.find('.C_Form_formElements').append('<div id="' + formElement.guid + '"></div>');
			formElement.updateModel({
				$el: self.find('#' + formElement.guid),
				msgBus: self.msgBus
			});
		});
	}

	return Form;
});
