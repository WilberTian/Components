define([
	'jquery',
	'moment',
	'Component',
	'Utils',
	'text!Calendar.ejs'
], function($, moment, Component, Utils, ejsTpl){

	var _data = {
		days: [],
		month: '2017-04',
		template: ejsTpl,

		events: {
			'click .C_Calendar li': 'chooseOption_event'
		}
	}

	function Calendar(options) {
		Component.apply(this, arguments || {});
		$.extend(true, this, _data, options);
	}

	Utils.inherit(Calendar, Component);

	Calendar.prototype.beforeRender = function() {
		this.getMonthData();

		return this;
	};

	Calendar.prototype.getMonthData = function() {
		var date = moment(this.month + '-01');
		var totalDays = date.daysInMonth();
		var firstDay = date.day();

		var calendarTotalCells = (firstDay + totalDays) > 35 ? 42 : 35;

		for(var i = 0; i < firstDay; i++) {
			this.days.push('');
		}

		for(var i = 0; i < totalDays; i++) {
			this.days.push(i + 1);
		}
		
		var leftDays = calendarTotalCells - totalDays - firstDay;
		for(var i = 0; i < leftDays; i++) {
			this.days.push('');
		}
	}

	return Calendar;
});
