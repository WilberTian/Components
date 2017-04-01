define([
	'jquery',
	'../Component',
	'../Utils',
	'text!./Modal.ejs'
], function($, Component, Utils, ejsTpl){

	Modal._model = {
		header: 'Modal header'
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

	Modal.prototype.afterMount = function() {
		// set the modal content with other component
		this.find('.modal-body').append('add modal content or component in the afterMount method');
		return this;
	};

	Modal.prototype.modalConfirm_event = function(e) {
		var self = this;
		self.msgBus.publish('MODAL_CONFIRM');
	}

	Modal.prototype.modalCancel_event = function(e) {
		this.destory();
	}

	return Modal;
});
