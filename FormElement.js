define([
	'Component',
	'Utils'
], function(Component, Utils){
	
	function FormElement(options) {
		Component.apply(this, arguments || {});

		this._type = options.type;

		this._required = options.required;

		this._label = options.label;

		this._key = options.key;

		this._value = options.value;

		this._hint = options.hint;

		this._validators = options.validators || [];

	}

	Utils.inherit(FormElement, Component);

	FormElement.prototype._validate = function() {
		if(this._validators.length > 0) {
			
		}
	};

	FormElement.prototype._scrollTo = function() {

	};

	return FormElement;

});

