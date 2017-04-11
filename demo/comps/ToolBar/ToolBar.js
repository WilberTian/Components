define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./ToolBar.ejs',
	'components/button/Button',
	'components/radioboxGroup/RadioboxGroup',
	'components/modal/Modal',
	'../TodoForm/TodoForm'
], function($, Component, Utils, ejsTpl, Button, RadioboxGroup, Modal, TodoForm){

	ToolBar._model = {};
	ToolBar._view = {
		template: ejsTpl
	};

	ToolBar._messages = {
		RADIOBOXGROUP_CHANGE: 'RADIOBOXGROUP_CHANGE'
	};

	function ToolBar(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(ToolBar, Component);

	ToolBar.prototype.afterMount = function() {
		var self = this;

		new Button({
			$el: self.find('.add'),
			model: {
				iconClass: 'fa fa-plus'
			},

			messages: {
				'BUTTON_CLICK': self.proxy(self.addTodoItem_message)
			}
		});

		new RadioboxGroup({
			$el: self.find('.filter'),
			model: {
				checked: 1,
		        options: [{
		            label: 'All',
		            value: '1'
		        }, {
		            label: 'Todo',
		            value: '2'
		        }, {
		            label: 'Completed',
		            value: '3'
		        }]
			},
			msgBus: self.msgBus
		});
	}

	ToolBar.prototype.addTodoItem_message = function () {
		var modal = new Modal({
			$el: $('.add-todoitem-modal'),
			model: {
				header: 'Add Todo'
			},
			style: {
				'.modal-dialog': {
					width: '480px'
				}
			},
			messages: {
            	'MODAL_CONFIRM': function(data){
		            modal.destory();
		        }
            }
		});

		new TodoForm({
			$el: modal.find('.modal-body')
		});
	}

	return ToolBar;
});
