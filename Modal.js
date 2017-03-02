define([
	'jquery',
	'Component',
	'Utils',
	'text!Modal.ejs'
], function($, Component, Utils, ejsTpl){

	var _data = {
		header: 'Modal header',
		content: 'Modal content',
		template: ejsTpl,

		events: {
			'click .C_Modal .modal-confirm': 'modalConfirm_event',
			'click .C_Modal .modal-cancel': 'modalCancel_event',
		}
	}

	function Modal(options) {
		Component.apply(this, arguments || {});
		$.extend(true, this, _data, options);
	}

	Utils.inherit(Modal, Component);

	Modal.prototype.beforeRender = function() {
		return this;
	};

	Modal.prototype.modalConfirm_event = function(e) {
		var self = this;
		self.ref.publish(self.ref.toMsgName('MODAL_CONFIRM'));
	}

	Modal.prototype.modalCancel_event = function(e) {
		this.destory();
	}

	return Modal;
});
