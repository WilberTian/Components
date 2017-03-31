define([
	'jquery',
	'moment',
	'../Component',
	'../Utils',
	'text!./DateRange.ejs',
	'../datePicker/DatePicker'
], function($, moment, Component, Utils, ejsTpl, DatePicker) {
	DateRange._model = {
		from: '',
		to: ''
	};

	DateRange._view = {
		template: ejsTpl
	};
	
	DateRange._messages = {};

	function DateRange(options) {
		Component.apply(this, arguments || {});
	}
	Utils.inherit(DateRange, Component);
	
	DateRange.prototype.afterMount = function() {
		var self = this;
		
		self.from = new DatePicker({
	        $el: self.find('.C_DateRange_from'),
	        messages: {
	        	'DATEPICKER_SELECT_DATE': self.proxy(self.fromDateChange)
	        }
	    });

		self.to = new DatePicker({
	        $el: self.find('.C_DateRange_to'),
	        model: {
	        	date: moment().add(1, 'month').format('YYYY-MM-DD')
	        },
	        messages: {
	        	'DATEPICKER_SELECT_DATE': self.proxy(self.toDateChange)
	        }
	    });
	}

	DateRange.prototype.fromDateChange = function() {

	}

	DateRange.prototype.toDateChange = function() {

	}

	return DateRange;

});