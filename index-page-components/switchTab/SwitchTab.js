define([
	'jquery',
	'require',
	'components/Component',
	'components/Utils',
	'text!./SwitchTab.ejs',
	'components/switch/Switch',
	'text!components/switch/LabelSwitch.ejs',
	'../demoCode/DemoCode',
	'text!./switchHtml.txt',
	'text!./switchJs.txt',
	'text!./switchEvents.txt',
	'text!./switchMessages.txt'
], function($, require, Component, Utils, ejsTpl, Switch, labelSwitchTpl, DemoCode, switchHtml, switchJs, switchEvents, switchMessages){

	SwitchTab._model = {};
	SwitchTab._view = {
		template: ejsTpl
	};

	SwitchTab._messages = {};

	function SwitchTab(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(SwitchTab, Component);

	SwitchTab.prototype.afterMount = function() {
		var self = this;

		new Switch({
	        $el: self.find('.switch')
	    });

	    new Switch({
	        $el: self.find('.label-switch'),
	        view: {
	        	template: labelSwitchTpl,
	        	events: {
					'click .C_LabelSwitch': 'toggleSwitch_event'
				}
	        }
	    });

		new DemoCode({
			$el: self.find('.demo-code'),
			model: {
				htmlCode: switchHtml,
				jsCode: switchJs,
				eventsCode: switchEvents,
				messagesCode: switchMessages
			}
			
		});
	}

	return SwitchTab;
});
