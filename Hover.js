define([
	'jquery',
	'Component',
	'Utils',
	'text!Hover.ejs'
], function($, Component, Utils, ejsTpl){

	var _data = {
		content: 'Hover content',
		arrowPos: 1,

		template: ejsTpl,

		messages: {
			'HOVER_SHOW': 'showHover_message',
			'HOVER_HIDE': 'hideHover_message'
		},
	}

	function Hover(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Hover, Component);

	Hover.prototype.beforeMount = function () {
		this.$el.append('<div class="C_Hover_Wrapper"></div>');
		this.$el.css('position', 'relative');

		this.$el = this.$el.find('.C_Hover_Wrapper');
		this.$el.css('display', 'none');
		this.$el.attr('arrow-pos', this.arrowPos);
	};

	Hover.prototype.showHover_message = function () {
		this.$el.show();
	}

	Hover.prototype.hideHover_message = function () {
		this.$el.hide();
	}
 
	return Hover;
});
