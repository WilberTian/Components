define([
	'jquery',
	'moment',
	'Component',
	'Utils',
	'text!Calendar.ejs'
], function($, moment, Component, Utils, ejsTpl){

	var _data = {
		daysInMonth: [],
		month: '2017-04',
		template: ejsTpl,

		messages: {

		},

		events: {
			'click .C_Calendar_picker': 'toggleCalender_event',
			'click .pre': 'showPreMonth_event',
			'click .next': 'showNextMonth_event',
			'click .enabled': 'chooseDate_event'
		}
	}

	function Calendar(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Calendar, Component);

	Calendar.prototype.beforeRender = function() {
		this.getMonthData();

		return this;
	};

	Calendar.prototype.toggleCalender_event = function(e) {

	}

	Calendar.prototype.showPreMonth_event = function(e) {

	}

	Calendar.prototype.showNextMonth_event = function(e) {

	}

	Calendar.prototype.chooseDate_event = function(e) {

	}

	Calendar.prototype.getMonthData = function() {
		var date = moment(this.month + '-01');
		var totalDays = date.daysInMonth();
		var firstDay = date.day();

		var calendarTotalCells = (firstDay + totalDays) > 35 ? 42 : 35;

		for(var i = 0; i < firstDay; i++) {
			this.daysInMonth.push('');
		}

		for(var i = 0; i < totalDays; i++) {
			this.daysInMonth.push(i + 1);
		}
		
		var leftDays = calendarTotalCells - totalDays - firstDay;
		for(var i = 0; i < leftDays; i++) {
			this.daysInMonth.push('');
		}
	}

	return Calendar;
});
