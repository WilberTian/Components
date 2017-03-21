define([
	'jquery',
	'Component',
	'Utils',
	'text!Switch.ejs'
], function($, Component, Utils, ejsTpl){

	var _data = {
		switchOn: true,

		template: ejsTpl,

		events: {
			'click .C_Switch': 'toggleSwitch_event'
		}
	}

	function Switch(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Switch, Component);

	Switch.prototype.toggleSwitch_event = function(e) {
		var status = this.switchOn;

		this.updateData({
			switchOn: !status
		});
	}
 
	return Switch;
});
