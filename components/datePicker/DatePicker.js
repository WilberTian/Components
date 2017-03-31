define([
	'jquery',
	'moment',
	'../Component',
	'../Utils',
	'text!./DatePicker.ejs',
	'../iconText/IconText',
	'../calendar/Calendar'
], function($, moment, Component, Utils, ejsTpl, IconText, Calendar) {
	DatePicker._model = {
		date: moment().format('YYYY-MM-DD'),
		from: moment().subtract(6, 'month'),
		to: moment().add(6, 'month'),
	};

	DatePicker._view = {
		template: ejsTpl
	};

	DatePicker._messages = {
		DATEPICKER_SELECT_DATE: 'DATEPICKER_SELECT_DATE'
	};

	function DatePicker(options) {
		Component.apply(this, arguments || {});
	}
	Utils.inherit(DatePicker, Component);
	
	DatePicker.prototype.afterMount = function() {
		var self = this;
		self.c_text = new IconText({
			$el: self.find('.C_DatePicker_Text'),

			model: {
				text: self.model.date,
				enabled: false,
				iconClass: 'fa fa-calendar'
			},
			
			messages: {
				'TEXT_CLICK': self.proxy(self.selectDate_message),
			}
		});

		self.c_calendar = new Calendar({
			$el: self.find('.C_DatePicker_Calendar'),

			model: {
				month: moment(self.model.date).format('YYYY-MM'),
				day: moment(self.model.date).format('D'),
				from: self.model.from,
				to: self.model.to
			},

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

		this.c_calendar.updateModel({
			month: moment(self.model.date).format('YYYY-MM'),
			day: moment(self.model.date).format('D'),
		})
	}

	DatePicker.prototype.chooseDate_message = function(date){
		var dateStr = moment(date).format('YYYY-MM-DD');

		this.model.date = dateStr;
		this.c_calendar.hide();

		this.c_text.updateModel({
			text: dateStr
		});

		this.msgBus.publish('DATEPICKER_SELECT_DATE', dateStr);
	}

	DatePicker.prototype.clickOutside_message = function(){
		this.c_calendar.hide();
	}

	return DatePicker;

});