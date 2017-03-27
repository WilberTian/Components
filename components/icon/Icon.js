define([
	'jquery',
	'../Component',
	'../Utils',
	'text!./Icon.ejs'
], function($, Component, Utils, ejsTpl){

	var _data = {
		iconClass: 'fa fa-cogs',

		template: ejsTpl,
	}

	function Icon(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Icon, Component);

	Icon.prototype.afterMount = function() {
		this.$el.find('.C_Icon').addClass(this.iconClass);
	}

	return Icon;
});
