define([
	'jquery',
	'../Component',
	'../Utils',
	'text!./Modal.ejs'
], function($, Component, Utils, ejsTpl){

	Modal._model = {
		header: 'Modal header',
		content: 'this is modal content'
	};

	Modal._view = {
		template: ejsTpl,

		events: {
			'click .C_Modal .modal-confirm': 'modalConfirm_event',
			'click .C_Modal .modal-cancel': 'modalCancel_event',
		}
	};

	Modal._messages = {
		MODAL_CONFIRM: 'MODAL_CONFIRM'
	};

	function Modal(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Modal, Component);

	Modal.prototype.modalConfirm_event = function(e) {
		var self = this;
		self.msgBus.publish('MODAL_CONFIRM');
	}

	Modal.prototype.modalCancel_event = function(e) {
		this.destory();
	}

	return Modal;
});
