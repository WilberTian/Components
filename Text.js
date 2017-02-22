define([
	'FormElement',
	'Utils',
	'text!Text.ejs'
], function(FormElement, Utils, TextTemplate){

	function Text(options) {

		FormElement.apply(this, arguments || {});

		this.template = (options.template || TextTemplate);

		this._placeholder = options.placeholder || '';


		this._init();
	}

	Utils.inherit(Text, FormElement);

	Text.prototype._init = function() {
		this.render();
	}


	return Text;

});






