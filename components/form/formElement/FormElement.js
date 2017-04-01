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
		component: {
			type: null,
			data: null
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
			new Component(componentOptions);
		} catch(e) {
			throw new Error('can not load module ' + componentType);
		}
	}

	return FormElement;
});
