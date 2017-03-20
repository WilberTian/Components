define([
	'jquery',
	'Component',
	'Utils',
	'text!TimeOptions.ejs',
	'Options'
], function($, Component, Utils, ejsTpl, Options){

	var _data = {
		time: '00:00:00',
		
		template: ejsTpl,

		messages: {
		},

		events: {
		}
	};

	function TimeOptions(options) {
		$.extend(true, this, _data, options);
		Component.call(this, options || {});
	}
	Utils.inherit(TimeOptions, Component);

	TimeOptions.prototype.afterMount = function() {
		var self = this;

		var hourOptions = [];
		var minuteOptions = [];
		var secondOptions = [];

		for(var i = 0; i < 24; i++) {
			var dataStr = (i < 10) ? '0' + i : i + '';
			hourOptions.push({
				label: dataStr,
				value: dataStr
			});
		}

		for(var i = 0; i < 60; i++) {
			var dataStr = (i < 10) ? '0' + i : i + '';
			minuteOptions.push({
				label: dataStr,
				value: dataStr
			});
			secondOptions.push({
				label: dataStr,
				value: dataStr
			});
		}

		self.c_hour_options = new Options({
			$el: self.find('.C_TimeOptions_hour'),
			options: hourOptions,
			msgBus: self.msgBus
		});

		self.c_minute_options = new Options({
			$el: self.find('.C_TimeOptions_minute'),
			options: minuteOptions,
			msgBus: self.msgBus
		});

		self.c_second_options = new Options({
			$el: self.find('.C_TimeOptions_second'),
			options: secondOptions,
			msgBus: self.msgBus
		});

	}

	return TimeOptions;
});

