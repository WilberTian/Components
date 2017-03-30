define([
	'jquery',
	'moment',
	'../Component',
	'../Utils',
	'text!./DatePicker.ejs',
	'../iconText/IconText',
	'../calendar/Calendar'
], function($, moment, Component, Utils, ejsTpl, IconText, Calendar) {
	var _data = {
		date: moment().format('YYYY-MM-DD'),
		from: moment().subtract(6, 'month'),
		to: moment().add(6, 'month'),

		template: ejsTpl,

		messages: {
			'DATEPICKER_SELECT_DATE': Utils.noop
		},

		events: {
			
		}
	}

	function DatePicker(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}
	Utils.inherit(DatePicker, Component);
	
	DatePicker.prototype.afterMount = function() {
		var self = this;
		self.c_text = new IconText({
			$el: self.find('.C_DatePicker_Text'),
			text: self.date,
			enabled: false,
			iconClass: 'fa fa-calendar',

			messages: {
				'TEXT_CLICK': self.proxy(self.selectDate_message),
			}
		});

		self.c_calendar = new Calendar({
			$el: self.find('.C_DatePicker_Calendar'),
			month: moment(self.date).format('YYYY-MM'),
			day: moment(self.date).format('D'),
			from: self.from,
			to: self.to,
			messages: {
				'CALENDAR_SELECT_DATE': self.proxy(self.chooseDate_message),
				'CLICK_OUTSIDE': self.proxy(self.clickOutside_message),
			}
		})

		self.c_calendar.hide();
	}

	DatePicker.prototype.selectDate_message = function(e, text) {
		e.stopPropagation();
		
		var self = this;
		this.c_calendar.show();

		this.c_calendar.updateData({
			month: moment(self.date).format('YYYY-MM'),
			day: moment(self.date).format('D'),
		})
	}

	DatePicker.prototype.chooseDate_message = function(date){
		var dateStr = moment(date).format('YYYY-MM-DD');

		this.date = dateStr;
		this.c_calendar.hide();

		this.c_text.updateData({
			text: dateStr
		});

		this.msgBus.publish('DATEPICKER_SELECT_DATE', dateStr);
	}

	DatePicker.prototype.clickOutside_message = function(){
		this.c_calendar.hide();
	}

	DatePicker.prototype.getData = function() {
		var self = this;

		return {
			date: self.date
		};
	}
	return DatePicker;

});