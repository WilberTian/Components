define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./SwitchTab.ejs',
	'components/switch/Switch',
	'../demoCode/DemoCode',
	'text!./switchHtml.txt',
	'text!./switchJs.txt',
	'text!./switchEvents.txt',
	'text!./switchMessages.txt'
], function($, Component, Utils, ejsTpl, Switch, DemoCode, switchHtml, switchJs, switchEvents, switchMessages){

	var _data = {
		template: ejsTpl,
	}

	function SwitchTab(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}

	Utils.inherit(SwitchTab, Component);

	SwitchTab.prototype.afterMount = function() {
		var self = this;

		new Switch({
	        $el: self.find('.switch')
	    });

		new DemoCode({
			$el: self.find('.demo-code'),
			htmlCode: switchHtml,
			jsCode: switchJs,
			eventsCode: switchEvents,
			messagesCode: switchMessages
		});
	}

	return SwitchTab;
});
