define([
	'jquery',
	'Component',
	'Utils',
	'text!Options.ejs'
], function($, Component, Utils, ejsTpl){

	var _data = {
		options: [],
		template: ejsTpl,

		events: {
			'click .C_Options li': 'chooseOption_event'
		}
	}

	function Options(options) {
		Component.apply(this, arguments || {});
		$.extend(true, this, _data, options);
	}

	Utils.inherit(Options, Component);

	Options.prototype.beforeRender = function() {
		this._hideWhenClickOutside(this.$el);
		return this;
	};

	Options.prototype.chooseOption_event = function(e) {
		var self = this;
		var selectedOptionIdx = $(e.currentTarget).index()
		self.ref.publish(self.ref.guid + '-' + 'SELECT_OPTION', self.options[selectedOptionIdx]);
	}

	Options.prototype._hideWhenClickOutside = function($ele) {
		$(window).click(function (e) {
		    if (!$ele.is(e.currentTarget) && $ele.has(e.currentTarget).length === 0) {
		        $ele.hide();
		    }
		});

		return this;
	}

	return Options;
});
