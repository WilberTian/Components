define([
	'jquery',
	'require',
	'../Component',
	'../Utils',
	'text!./Form.ejs'
], function($, require, Component, Utils, ejsTpl){

	Form._model = {
		formElements: []
	};

	Form._view = {
		template: ejsTpl
	};

	Form._messages = {};

	function Form(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Form, Component);

	Form.prototype.afterMount = function() {
		var self = this;

		this.model.formElements.forEach(function(formElement){
			self.find('.C_Form_formElements').append('<div id="' + formElement.guid + '"></div>');
			formElement.mountTo(self.find('#' + formElement.guid));
		});
	}

	Form.prototype.submit = function() {
		
	}

	return Form;
});
