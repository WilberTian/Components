define([
	'jquery',
	'../Component',
	'../Utils',
	'text!./Switch.ejs'
], function($, Component, Utils, ejsTpl){

	Switch._model = {
		switchOn: true,
	};
	Switch._view = {
		template: ejsTpl,

		events: {
			'click .C_Switch': 'toggleSwitch_event'
		}
	};

	Switch._messages = {
		SWITCH_CHANGE: 'SWITCH_CHANGE'
	};

	function Switch(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Switch, Component);

	Switch.prototype.toggleSwitch_event = function(e) {
		var status = this.model.switchOn;

		this.updateModel({
			switchOn: !status
		});

		this.msgBus.publish('SWITCH_CHANGE', this.model.switchOn);
	}
 
	return Switch;
});
