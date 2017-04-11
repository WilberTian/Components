define([
	'jquery',
	'require',
	'../Component',
	'../Utils',
	'text!./Form.ejs',
	'../button/Button'
], function($, require, Component, Utils, ejsTpl, Button){

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

	Form.prototype.getSubmitData = function() {
		var submitData = {};
		this.model.formElements.forEach(function(formElement) {
			$.extend(submitData, formElement.getSubmitElement());
		})

		return submitData;
	}

	return Form;
});
