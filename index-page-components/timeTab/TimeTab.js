define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./TimeTab.ejs',
	'components/timeOptions/TimeOptions',
	'components/timePicker/TimePicker',
	'../demoCode/DemoCode',
	'text!./timeHtml.txt',
	'text!./timeJs.txt',
	'text!./timeEvents.txt',
	'text!./timeMessages.txt'
], function($, Component, Utils, ejsTpl, TimeOptions, TimePicker, DemoCode, timeHtml, timeJs, timeEvents, timeMessages){

	TimeTab._model = {};
	TimeTab._view = {
		template: ejsTpl
	};

	TimeTab._messages = {};

	function TimeTab(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(TimeTab, Component);

	TimeTab.prototype.afterMount = function() {
		var self = this;

		new TimeOptions({
			$el: self.find('.time-options')
		});

		new TimePicker({
	        $el: self.find('.time-picker')
	    });

		new DemoCode({
			$el: self.find('.demo-code'),
			model: {
				htmlCode: timeHtml,
				jsCode: timeJs,
				eventsCode: timeEvents,
				messagesCode: timeMessages
			}
			
		});
	}

	return TimeTab;
});
