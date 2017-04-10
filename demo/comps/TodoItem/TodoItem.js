define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./TodoItem.ejs',
	'components/switch/Switch',
	'components/button/Button',
	'components/modal/Modal'
], function($, Component, Utils, ejsTpl, Switch, Button, Modal){

	TodoItem._model = {
		id: -1,
		name: '',
		status: '',
		createDate: '',
		completeDate: ''
	};

	TodoItem._view = {
		template: ejsTpl
	};

	TodoItem._messages = {};

	function TodoItem(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(TodoItem, Component);

	TodoItem.prototype.afterMount = function() {
		var self = this;

		new Switch({
			$el: self.find('.status-switch'),
			model: {
				switchOn: self.model.status
			},
			messages: {
				'SWITCH_CHANGE': self.proxy(self.statusChange_message)
			}
		});

		new Button({
			$el: self.find('.delete'),
			model: {
				iconClass: 'fa fa-remove'
			},
			messages: {
				'BUTTON_CLICK': self.proxy(self.deleteClick_message)
			}
		});

		if(self.model.status === false) {
			self.find('.todoitem').addClass('completed');
		} else {
			self.find('.todoitem').removeClass('completed');
		}
		
	}

	TodoItem.prototype.deleteClick_message = function() {
		var self = this;

		var modal = new Modal({
			$el: $('.delete-confirm-modal'),
			model: {
				header: 'Confirm'
			},
            messages: {
            	'MODAL_CONFIRM': function(data){
		            modal.destory();

		            self.destory();
		        }
            }
		})
	}

	TodoItem.prototype.statusChange_message = function(switchStatus) {
		var self = this;

		self.updateModel({
			status: switchStatus
		});

	}

	return TodoItem;
});
