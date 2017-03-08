define([
	'FormElement',
	'Utils',
	'text!Text.ejs'
], function(FormElement, Utils, TextTemplate){

	function Text(options) {

		FormElement.apply(this, arguments || {});

		this.template = (options.template || TextTemplate);

		this._placeholder = options.placeholder || '';

	}

	Utils.inherit(Text, FormElement);



	return Text;

});






