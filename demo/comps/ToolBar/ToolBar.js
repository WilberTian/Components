define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./ToolBar.ejs',
	'components/button/Button',
	'components/radioboxGroup/RadioboxGroup'
], function($, Component, Utils, ejsTpl, Button, RadioboxGroup){

	ToolBar._model = {};
	ToolBar._view = {
		template: ejsTpl
	};

	ToolBar._messages = {
		RADIOBOXGROUP_CHANGE: 'RADIOBOXGROUP_CHANGE'
	};

	function ToolBar(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(ToolBar, Component);

	ToolBar.prototype.afterMount = function() {
		var self = this;

		new Button({
			$el: self.find('.add'),
			model: {
				iconClass: 'fa fa-plus'
			}
		});

		new RadioboxGroup({
			$el: self.find('.filter'),
			model: {
				checked: 1,
		        options: [{
		            label: 'All',
		            value: '1'
		        }, {
		            label: 'Todo',
		            value: '2'
		        }, {
		            label: 'Completed',
		            value: '3'
		        }]
			},
			msgBus: self.msgBus
		});
	}

	return ToolBar;
});
