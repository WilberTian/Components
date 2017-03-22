define([
	'jquery',
	'Component',
	'Utils',
	'text!Toast.ejs'
], function($, Component, Utils, ejsTpl){

	var _data = {
		content: 'Please fill the content',
		timeout: 3000,

		template: ejsTpl,

		events: {
			'click .toast-close': 'closeToast_event'
		}
	}

	function Toast(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Toast, Component);

	Toast.prototype.mount = function() {
		var $el = this.$el;

		this.$toastItem = $(this.renderedPage);
	    $el.append(this.$toastItem);

	    this.afterMount();

	    return this;
	}

	Toast.prototype.afterMount = function() {
		var self = this;

		if(this.timeout > 0) {
			var autoCloseTimer = setTimeout(function(){
				self.$toastItem.remove();
				clearTimeout(autoCloseTimer);

			}, this.timeout);
		}
	}

	Toast.prototype.closeToast_event = function(e) {
		$(e.currentTarget).parent().remove();
	}

	return Toast;
});
