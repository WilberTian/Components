define([
	'jquery',
	'../Component',
	'../Utils',
	'text!./Options.ejs'
], function($, Component, Utils, ejsTpl){

	Options._model = {
		options: []
	};

	Options._view = {
		template: ejsTpl,
		events: {
			'click .C_Options li': 'chooseOption_event'
		}
	};

	Options._messages = {
		OPTIONS_SELECT: 'OPTIONS_SELECT',
		CLICK_OUTSIDE: 'CLICK_OUTSIDE'
	};

	function Options(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Options, Component);

	Options.prototype.render = Options.prototype.render.after(function() {
		var self = this;
		$(window).off('click').on('click', self.proxy(_windowClickHandler));
	});

	Options.prototype.chooseOption_event = function(e) {
		var self = this;
		var selectedOptionIdx = $(e.currentTarget).index();
		self.msgBus.publish('OPTIONS_SELECT', e, self.guid, self.model.options[selectedOptionIdx]);
	}

	Options.prototype.destory = Options.prototype.destory.after(function(){
		$(window).off('click');
	})

	Options.prototype.show = Options.prototype.show.after(function() {
		var self = this;
		$(window).off('click').on('click', self.proxy(_windowClickHandler));
	});

	Options.prototype.hide = Options.prototype.hide.after(function(){
		$(window).off('click');
	})

	function _windowClickHandler(e) {
		var self = this;
		var $el = self.$el;

		if (!$el.is(e.currentTarget) && $el.has(e.currentTarget).length === 0) {
	        self.msgBus.publish('CLICK_OUTSIDE');
	    }

		return this;
	}

	return Options;
});
