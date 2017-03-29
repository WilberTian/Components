define([
	'jquery',
	'moment',
	'Component',
	'Utils',
	'text!TimePicker.ejs',
	'IconText',
	'TimeOptions'
], function($, moment, Component, Utils, ejsTpl, IconText, TimeOptions) {
	var _data = {
		time: '00:00:00',
		from: '',
		to: '',

		template: ejsTpl,

		messages: {
			'SELECT_HOUR': 'selectHour_message',
			'SELECT_MINUTE': 'selectMinute_message',
			'SELECT_SECOND': 'selectSecond_message',
			'TEXT_CLICK': 'selectTime_message',
			'CLICK_OUTSIDE': 'clickOutside_message'
		},

		events: {
			
		}
	}

	function TimePicker(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}
	Utils.inherit(TimePicker, Component);
	
	TimePicker.prototype.afterMount = function() {
		var self = this;
		self.c_text = new IconText({
			$el: self.find('.C_TimePicker_Text'),
			text: self.time,
			enabled: false,
			msgBus: self.msgBus,
			iconClass: 'fa fa-clock-o'
		});

		self.c_timeOptions = new TimeOptions({
			$el: self.find('.C_TimePicker_TimeOptions'),
			msgBus: self.msgBus
		})

		self.c_timeOptions.hide();
	}

	TimePicker.prototype.selectHour_message = function(e, guid, hour) {
		var self = this;

		this.updateData({
			time: self.time.replace(/^\d\d/g, hour.label)
		});
		
	}

	TimePicker.prototype.selectMinute_message = function(e, guid, minute) {
		var self = this;

		this.updateData({
			time: self.time.replace(/:\d\d:/g, ':' + minute.label + ':')
		});
		
	}

	TimePicker.prototype.selectSecond_message = function(e, guid, second) {
		var self = this;

		this.updateData({
			time: self.time.replace(/\d\d$/g, second.label)
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