define([
	'jquery',
	'moment',
	'../Component',
	'../Utils',
	'text!./TimePicker.ejs',
	'../iconText/IconText',
	'../timeOptions/TimeOptions'
], function($, moment, Component, Utils, ejsTpl, IconText, TimeOptions) {

	TimePicker._model = {
		time: '00:00:00',
		from: '',
		to: ''
	};

	TimePicker._view = {
		template: ejsTpl
	};

	TimePicker._messages = {
		TIMEPICKER_SELECT_TIME: 'TIMEPICKER_SELECT_TIME'
	};

	function TimePicker(options) {
		Component.apply(this, arguments || {});
	}
	Utils.inherit(TimePicker, Component);
	
	TimePicker.prototype.afterMount = function() {
		var self = this;
		self.c_text = new IconText({
			$el: self.find('.C_TimePicker_Text'),
			model: {
				text: self.model.time,
				disabled: true,
				iconClass: 'fa fa-clock-o'
			},
			
			messages: {
				'TEXT_CLICK': self.proxy(self.selectTime_message)
			}
		});

		self.c_timeOptions = new TimeOptions({
			$el: self.find('.C_TimePicker_TimeOptions'),
			messages: {
				'TIMEOPTIONS_SELECT_HOUR': self.proxy(self.selectHour_message),
				'TIMEOPTIONS_SELECT_MINUTE': self.proxy(self.selectMinute_message),
				'TIMEOPTIONS_SELECT_SECOND': self.proxy(self.selectSecond_message),
				'CLICK_OUTSIDE': self.proxy(self.clickOutside_message)
			}
		})

		self.c_timeOptions.hide();
	}

	TimePicker.prototype.selectHour_message = function(e, guid, hour) {
		var self = this;

		this.updateModel({
			time: self.model.time.replace(/^\d\d/g, hour.label)
		});
		
	}

	TimePicker.prototype.selectMinute_message = function(e, guid, minute) {
		var self = this;

		this.updateModel({
			time: self.model.time.replace(/:\d\d:/g, ':' + minute.label + ':')
		});
		
	}

	TimePicker.prototype.selectSecond_message = function(e, guid, second) {
		var self = this;

		this.updateModel({
			time: self.model.time.replace(/\d\d$/g, second.label)
		});
		
	}

	TimePicker.prototype.selectTime_message = function(e, guid, text) {
		e.stopPropagation();
		this.c_timeOptions.show();
	}

	TimePicker.prototype.clickOutside_message = function(){
		this.c_timeOptions.hide();
	}

	return TimePicker;

});