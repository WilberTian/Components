define([
	'jquery',
	'../Component',
	'../Utils',
	'text!./TimeOptions.ejs',
	'../options/Options'
], function($, Component, Utils, ejsTpl, Options){

	TimeOptions._model = {};

	TimeOptions._view = {
		template: ejsTpl
	};

	TimeOptions._messages = {
		TIMEOPTIONS_SELECT_HOUR: 'TIMEOPTIONS_SELECT_HOUR',
		TIMEOPTIONS_SELECT_MINUTE: 'TIMEOPTIONS_SELECT_MINUTE',
		TIMEOPTIONS_SELECT_SECOND: 'TIMEOPTIONS_SELECT_SECOND',
		CLICK_OUTSIDE: 'CLICK_OUTSIDE'
	};

	function TimeOptions(options) {
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
			model: {
				options: hourOptions
			},
			
			messages: {
				'OPTIONS_SELECT': self.proxy(self.selectOption_message)
			}
		});

		self.c_minute_options = new Options({
			$el: self.find('.C_TimeOptions_minute'),
			model: {
				options: minuteOptions
			},
			
			messages: {
				'OPTIONS_SELECT': self.proxy(self.selectOption_message)
			}
		});

		self.c_second_options = new Options({
			$el: self.find('.C_TimeOptions_second'),
			model: {
				options: secondOptions
			},
			
			messages: {
				'OPTIONS_SELECT': self.proxy(self.selectOption_message)
			}
		});

	}

	TimeOptions.prototype.selectOption_message = function(e, guid, selectedItem) {
		var self = this;

		if (guid === self.c_hour_options.guid) {
			self.msgBus.publish('TIMEOPTIONS_SELECT_HOUR', e, self.guid, selectedItem);
		} else if (guid === self.c_minute_options.guid) {
			self.msgBus.publish('TIMEOPTIONS_SELECT_MINUTE', e, self.guid, selectedItem);
		} else if (guid === self.c_second_options.guid) {
			self.msgBus.publish('TIMEOPTIONS_SELECT_SECOND', e, self.guid, selectedItem);
		} 
	}

	TimeOptions.prototype.show = TimeOptions.prototype.show.after(function() {
		var self = this;
		$(window).off('click').on('click', self.proxy(_windowClickHandler));
	});

	TimeOptions.prototype.hide = TimeOptions.prototype.hide.after(function(){
		$(window).off('click');
	})

	function _windowClickHandler(e) {
		var self = this;
		var $el = self.$el;

		if (!$el.is(e.currentTarget) && $el.has(e.currentTarget).length === 0) {
	        self.msgBus.publish('CLICK_OUTSIDE', e, self.guid);
	    }

		return this;
	}

	return TimeOptions;
});

