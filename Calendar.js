define([
	'jquery',
	'moment',
	'Component',
	'Utils',
	'text!Calendar.ejs'
], function($, moment, Component, Utils, ejsTpl){

	var _data = {
		daysInMonth: [],
		month: moment().format('YYYY-MM'),
		day: moment().format('D'),
		template: ejsTpl,

		messages: {

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

	Calendar.prototype.beforeMount = function() {
		this.getMonthData();

		return this;
	};

	Calendar.prototype.showPreMonth_event = function(e) {
		var currentMonth = moment(this.month);
		var preMonth = currentMonth.subtract(1, 'month');

		this.month = preMonth.format('YYYY-MM');
		this.daysInMonth.length = 0;
		this.getMonthData();

		this.render();
		this.mount();
	};

	Calendar.prototype.showNextMonth_event = function(e) {
		var currentMonth = moment(this.month);
		var nextMonth = currentMonth.add(1, 'month');

		this.month = nextMonth.format('YYYY-MM');
		this.daysInMonth.length = 0;
		this.getMonthData();

		this.render();
		this.mount();
	};

	Calendar.prototype.chooseDate_event = function(e) {
		var self = this;
		var choosenDate = self.month + '-' + $(e.currentTarget).text();
		self.msgBus.publish(self.msgBus.toMsgName('CHOOSE_DATE'), choosenDate);
	};

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
	        self.msgBus.publish(self.msgBus.toMsgName('CLICK_OUTSIDE'));
	    }

		return this;
	}

	return Calendar;
});
