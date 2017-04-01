define([
	'jquery',
	'../../Component',
	'../../Utils',
	'text!./TableBody.ejs'
], function($, Component, Utils, ejsTpl){
	TableBody._model = {
		tbody: []
	};

	TableBody._view = {
		template: ejsTpl
	};

	TableBody._messages = {};

	function TableBody(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(TableBody, Component);

	TableBody.prototype.afterMount = function() {
	}

	return TableBody;
});
