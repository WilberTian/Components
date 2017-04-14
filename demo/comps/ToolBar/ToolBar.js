define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./ToolBar.ejs',
	'components/button/Button',
	'components/radioboxGroup/RadioboxGroup',
	'components/modal/Modal',
	'../TodoForm/TodoForm',
	'../../mock/todoListAPI'
], function($, Component, Utils, ejsTpl, Button, RadioboxGroup, Modal, TodoForm, todoListAPI){

	ToolBar._model = {};
	ToolBar._view = {
		template: ejsTpl
	};

	ToolBar._messages = {
		QUERY_TODO_LIST: 'QUERY_TODO_LIST',
		ADD_TODO_ITEM: 'ADD_TODO_ITEM'
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
				checked: self.model.status,
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
			messages: {
				'RADIOBOXGROUP_CHANGE': self.proxy(self.queryTodoList_message)
			}
		});
	}

	ToolBar.prototype.addTodoItem_message = function () {
		var self = this;

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
            		var newTodoItem = todoForm.getSubmitData();
            		todoListAPI.addTodoItem(newTodoItem);
            		self.msgBus.publish('ADD_TODO_ITEM');
		            modal.destory();
		        }
            }
		});

		var todoForm = new TodoForm({
			$el: modal.find('.modal-body')
		});

	};

	ToolBar.prototype.queryTodoList_message = function(status) {
		this.msgBus.publish('QUERY_TODO_LIST', status);
	};

	return ToolBar;
});
