define([
	'jquery',
	'require',
	'../../Component',
	'../../Utils',
	'text!./FormElement.ejs'
], function($, require, Component, Utils, ejsTpl){

	FormElement._model = {
		required: true,
		lable: 'form label',
		rules: [],
		component: {
			type: null,
			model: null,
			submitField: null
		}
	};

	FormElement._view = {
		template: ejsTpl
	};

	FormElement._messages = {};

	function FormElement(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(FormElement, Component);

	FormElement.prototype.afterMount = function() {
		var self = this;
		var componentOptions = $.extend({}, {model: self.model.component.model}, {$el: self.find('.C_FormElement_component')});
		
		var componentType = self.model.component.type;
		if(typeof componentType !== 'string') {
			throw new Error('please input the component type in string');
		}

		var Component = null;

		try {
			Component = require(componentType);
			self._componentInstance = new Component(componentOptions);
		} catch(e) {
			throw new Error('can not load module ' + componentType);
		}
	}

	FormElement.prototype.getSubmitObject = function() {
		var self = this;
		var submitField = self.model.component.submitField;
		
		if(submitField === null) {
			throw new Error('please set submit field for ' + self.model.component.type);
		} else {
			var submitObject = {};
			submitObject[submitField.key] = self._componentInstance.model[submitField.field];

			Utils.logDebugMsg('submit data of ' + self.model.component.type + ' is ' + JSON.stringify(submitObject));

			return submitObject;
		}
	}

	return FormElement;
});
