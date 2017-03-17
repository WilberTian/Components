define([
	'jquery',
	'moment',
	'Component',
	'Utils',
	'text!DatePicker.ejs',
	'Text',
	'Calendar'
], function($, moment, Component, Utils, ejsTpl, Text, Calendar) {
	var _data = {
		url: null,
		date: moment().format('YYYY-MM-DD'),

		template: ejsTpl,

		messages: {
			'TEXT_CLICK': 'selectDate_message',
			'CALENDAR_SELECT_DATE': 'chooseDate_message',
			'CLICK_OUTSIDE': 'clickOutside_message'
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
		self.c_text = new Text({
			$el: $('.C_DatePicker_Text'),
			text: self.date,
			enabled: false,
			iconUrl: 'url(./images/icon-calendar.png)',
			msgBus: self
		});

		self.c_calendar = new Calendar({
			$el: $('.C_DatePicker_Calendar'),
			month: moment(self.date).format('YYYY-MM'),
			day: moment(self.date).format('D'),
			msgBus: self
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
		this.date = date;
		this.c_calendar.hide();

		this.c_text.updateData({
			text: date
		})
	}

	DatePicker.prototype.clickOutside_message = function(){
		this.c_calendar.hide();
	}

	return DatePicker;

});