define([
	'jquery',
	'../Component',
	'../Utils',
	'text!./Toastr.ejs'
], function($, Component, Utils, ejsTpl){

	Toastr._model = {
		content: 'Please fill the content',
		timeout: 3000
	};

	Toastr._view = {
		template: ejsTpl,

		events: {
			'click .toastr-close': 'closeToastr_event'
		}
	};

	Toastr._style = {
		'.C_Toastr': {
			width: '200px'
		}
	}

	Toastr._messages = {};

	function Toastr(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Toastr, Component);

	Toastr.prototype.mount = function() {
		var $el = this.$el;

		this.$toastrItem = $(this.renderedComponent);
	    $el.append(this.$toastrItem);

	    this.afterMount();

	    return this;
	}

	Toastr.prototype.afterMount = function() {
		var self = this;

		if(this.model.timeout > 0) {
			this._autoCloseTimer = setTimeout(function(){
				self.$toastrItem.remove();
				clearTimeout(this._autoCloseTimer);

			}, this.model.timeout);
		}
	}

	Toastr.prototype.closeToastr_event = function(e) {
		if(this._autoCloseTimer) {
			clearTimeout(this._autoCloseTimer);
		}

		$(e.currentTarget).parent().remove();

	}

	return Toastr;
});
