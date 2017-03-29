define([
	'jquery',
	'moment',
	'../Component',
	'../Utils',
	'text!./DateRange.ejs',
	'../datePicker/DatePicker'
], function($, moment, Component, Utils, ejsTpl, DatePicker) {
	var _data = {
		date: moment().format('YYYY-MM-DD'),


		template: ejsTpl
	}

	function DateRange(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}
	Utils.inherit(DateRange, Component);
	
	DateRange.prototype.afterMount = function() {
		var self = this;
		
		self.from = new DatePicker({
	        $el: self.find('.C_DateRange_from'),
	        msgBus: self.msgBus
	    });

		self.to = new DatePicker({
	        $el: self.find('.C_DateRange_to'),
	        date: moment().add(1, 'month').format('YYYY-MM-DD'),
	        msgBus: self.msgBus
	    });
	}

	DateRange.prototype.getDate = function() {
		var self = this;

		return {
			from: self.from.getData().date,
			to: self.to.getData().date
		}
	}

	return DateRange;

});