define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./DateTab.ejs',
	'components/calendar/Calendar',
	'components/datePicker/DatePicker',
	'components/dateRange/DateRange',
	'../demoCode/DemoCode',
	'text!./calendarHtml.txt',
	'text!./calendarJs.txt',
	'text!./calendarEvents.txt',
	'text!./calendarMessages.txt'
], function($, Component, Utils, ejsTpl, Calendar, DatePicker, DateRange, DemoCode, calendarHtml, calendarJs, calendarEvents, calendarMessages){

	DateTab._model = {};
	DateTab._view = {
		template: ejsTpl
	};

	DateTab._messages = {};

	function DateTab(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(DateTab, Component);

	DateTab.prototype.afterMount = function() {
		var self = this;

		new Calendar({
			$el: self.find('.calendar')
		});

		new DatePicker({
	        $el: self.find('.date-picker')
	    });

	    new DateRange({
	    	$el: self.find('.date-range')
	    });

		new DemoCode({
			$el: self.find('.demo-code'),
			model: {
				htmlCode: calendarHtml,
				jsCode: calendarJs,
				eventsCode: calendarEvents,
				messagesCode: calendarMessages
			}
			
		});
	}

	return DateTab;
});
