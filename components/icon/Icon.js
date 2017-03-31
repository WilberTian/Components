define([
	'jquery',
	'../Component',
	'../Utils',
	'text!./Icon.ejs'
], function($, Component, Utils, ejsTpl){
	Icon._model = {
		iconClass: 'fa fa-cogs'
	};

	Icon._view = {
		template: ejsTpl
	};

	Icon._messages = {};

	function Icon(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Icon, Component);

	Icon.prototype.afterMount = function() {
		this.$el.find('.C_Icon').addClass(this.model.iconClass);
	}

	return Icon;
});
