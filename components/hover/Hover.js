define([
	'jquery',
	'../Component',
	'../Utils',
	'text!./Hover.ejs'
], function($, Component, Utils, ejsTpl){

	Hover._model = {
		content: 'Please fill the content',
		arrowPos: 1,
		style: {
			width: '200px'
		}
	};

	Hover._view = {
		template: ejsTpl,

		events: {
			'mouseover': 'showHover_event',
			'mouseout': 'hideHover_event'
		}
	};

	Hover._messages = {};

	function Hover(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Hover, Component);

	Hover.prototype.beforeMount = function () {
		var $hoverEl = this.find('.C_Hover_Wrapper');
		if($hoverEl) {
			$hoverEl.remove();
		}

		this.$el.append('<div class="C_Hover_Wrapper"></div>');
		this.$el.css('position', 'relative');

		this.find('.C_Hover_Wrapper').css('display', 'none');
		for(var styleProp in this.model.style) {
			this.find('.C_Hover_Wrapper').css(styleProp, this.model.style[styleProp]);
		}
		this.find('.C_Hover_Wrapper').attr('arrow-pos', this.model.arrowPos);
	};

	Hover.prototype.mount = function() {
		this.beforeMount();

		var $el = this.find('.C_Hover_Wrapper');
	    $el.html(this.renderedComponent);

	    this.afterMount();

	    return this;
	}

	Hover.prototype.showHover_event = function (e) {
		this.find('.C_Hover_Wrapper').show();
	}

	Hover.prototype.hideHover_event = function (e) {
		this.find('.C_Hover_Wrapper').hide();
	}
 
	return Hover;
});
