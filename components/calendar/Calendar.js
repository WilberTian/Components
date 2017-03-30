define([
	'jquery',
	'moment',
	'../Component',
	'../Utils',
	'text!./Calendar.ejs'
], function($, moment, Component, Utils, ejsTpl){

	var _data = {
		daysInMonth: [],
		month: moment().format('YYYY-MM'),
		day: moment().format('D'),
		from: moment().subtract(6, 'month'),
		to: moment().add(6, 'month'),

		template: ejsTpl,

		messages: {
			'CALENDAR_SELECT_DATE': Utils.noop,
			'CLICK_OUTSIDE': Utils.noop
		},

		events: {
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
		this.daysInMonth = this.getMonthData(this.month);

		return this;
	};

	Calendar.prototype.showPreMonth_event = function(e) {
		var self = this;
		e.stopPropagation();

		var currentMonth = moment(this.month);
		var preMonth = currentMonth.subtract(1, 'month').format('YYYY-MM');


		this.updateData({
			month: preMonth,
			daysInMonth: self.getMonthData(preMonth)
		});
	};

	Calendar.prototype.showNextMonth_event = function(e) {
		var self = this;
		e.stopPropagation();

		var currentMonth = moment(this.month);
		var nextMonth = currentMonth.add(1, 'month').format('YYYY-MM');

		this.updateData({
			month: nextMonth,
			daysInMonth: self.getMonthData(nextMonth)
		});
	};

	Calendar.prototype.chooseDate_event = function(e) {
		var self = this;
		var choosenDate = self.month + '-' + $(e.currentTarget).text();
		self.msgBus.publish('CALENDAR_SELECT_DATE', choosenDate);
	};

	Calendar.prototype.getMonthData = function(month) {
		var self = this;

		var daysInMonth = [];
		
		daysInMonth.length = 0;
		var date = moment(month + '-01');
		var totalDays = date.daysInMonth();
		var firstDay = date.day();

		var calendarTotalCells = (firstDay + totalDays) > 35 ? 42 : 35;

		for(var i = 0; i < firstDay; i++) {
			daysInMonth.push('');
		}

		for(var i = 1; i <= totalDays; i++) {
			var iDate = (i < 10) ? moment(month + '-0' + i) : moment(month + '-' + i);

			daysInMonth.push({
				value: i, 
				enabled: iDate.isBefore(self.to) && iDate.isAfter(self.from)
			});
		}
		
		var leftDays = calendarTotalCells - totalDays - firstDay;
		for(var i = 0; i < leftDays; i++) {
			daysInMonth.push('');
		}

		return daysInMonth;
	}

	Calendar.prototype.show = Calendar.prototype.show.after(function() {
		var self = this;
		$(window).off('click').on('click', self.proxy(_windowClickHandler));
	});

	Calendar.prototype.hide = Calendar.prototype.hide.after(function(){
		$(window).off('click');
	})

	function _windowClickHandler(e) {
		var self = this;
		var $el = self.$el;

		if (!$el.is(e.currentTarget) && $el.has(e.currentTarget).length === 0) {
			console.log('click outside of calendar')
	        self.msgBus.publish('CLICK_OUTSIDE');
	    }

		return this;
	}

	return Calendar;
});
