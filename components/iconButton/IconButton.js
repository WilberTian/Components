define([
	'jquery',
	'moment',
	'../Component',
	'../Utils',
	'text!./IconButton.ejs',
	'../button/Button',
	'../icon/Icon'
], function($, moment, Component, Utils, ejsTpl, Button, Icon) {
	var _data = {
		text: '',
		iconClass: '',

		template: ejsTpl
	}

	function IconButton(options) {
		var args = $.extend(true, {}, _data, options);
		
		// !!! inherits from other components
		// but the problem is, the child need to follow the parent's class name, since the class name is hard code in parent componnet
		$.extend(true, this, args);
		Button.call(this, args || {});
	}
	Utils.inherit(IconButton, Button);
	
	IconButton.prototype.afterMount = function() {
		var self = this;

		self.c_icon = new Icon({
			$el: self.find('.C_Button_icon'),
			iconClass: self.iconClass
		})

		// !!! inherits from other components
		// the method will be overwrite, need to call parent's method
		Button.prototype.afterMount.apply(self, arguments);
	}

	return IconButton;

});