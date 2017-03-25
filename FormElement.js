define([
	'jquery',
	'require',
	'Component',
	'Utils',
	'text!FormElement.ejs'
], function($, require, Component, Utils, ejsTpl){

	var _data = {
		required: true,
		lable: 'form label',
		component: {
			type: null,
			data: null
		},

		template: ejsTpl,
	}

	function FormElement(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}

	Utils.inherit(FormElement, Component);

	FormElement.prototype.validate = function() {
		
	}

	FormElement.prototype.afterMount = function() {
		var self = this;
		var componentData = $.extend({}, self.component.data, {$el: self.find('.C_FormElement_component')});
		
		var componentType = self.component.type;
		if(typeof componentType !== 'string') {
			throw new Error('please input the component type in string');
		}

		var Component = null;

		try {
			Component = require(componentType);
			new Component(componentData);
		} catch(e) {
			throw new Error('can not load module ' + componentType);
		}
	}

	return FormElement;
});
