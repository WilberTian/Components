define([
	'jquery',
	'../Component',
	'../Utils',
	'text!./Toast.ejs'
], function($, Component, Utils, ejsTpl){

	Toast._model = {
		content: 'Please fill the content',
		timeout: 3000,
		style: {
			width: '200px'
		}
	};

	Toast._view = {
		template: ejsTpl,

		events: {
			'click .toast-close': 'closeToast_event'
		}
	};

	Toast._messages = {};

	function Toast(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Toast, Component);

	Toast.prototype.mount = function() {
		var $el = this.$el;

		this.$toastItem = $(this.renderedComponent);
		for(var styleProp in this.model.style) {
			this.$toastItem.css(styleProp, this.model.style[styleProp]);
		}
	    $el.append(this.$toastItem);

	    this.afterMount();

	    return this;
	}

	Toast.prototype.afterMount = function() {
		var self = this;

		if(this.model.timeout > 0) {
			this._autoCloseTimer = setTimeout(function(){
				self.$toastItem.remove();
				clearTimeout(this._autoCloseTimer);

			}, this.model.timeout);
		}
	}

	Toast.prototype.closeToast_event = function(e) {
		if(this._autoCloseTimer) {
			clearTimeout(this._autoCloseTimer);
		}

		$(e.currentTarget).parent().remove();

	}

	return Toast;
});
