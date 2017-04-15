define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./Todo.ejs',
	'./ToolBar/ToolBar',
	'./TodoList/TodoList',
	'../mock/todoListAPI',
	'./flow/todo.consumer',
	'./flow/todo.store',
	'./flow/todo.actionCreator'
], function($, Component, Utils, ejsTpl, ToolBar, TodoList, todoListAPI, todoConsumer, todoStore, todoActionCreator){

	Todo._model = {
		todolist: [],
		status: 1
	};
	Todo._view = {
		template: ejsTpl
	};

	Todo._messages = {};

	function Todo(options) {
		var store = todoStore(this, todoConsumer);
		for(var actionCreator in todoActionCreator) {
			var f = todoActionCreator[actionCreator];
			if(typeof f === 'function') {
				todoActionCreator[actionCreator] = (function(f){
					return function() {
						var action = f.apply(this, arguments);
						store.dispatch(action);
					};
				})(f);
			}
		}


		Component.apply(this, arguments || {});
		
	}

	Utils.inherit(Todo, Component);

	Todo.prototype.afterMount = function() {
		var self = this;

		self.todoList = new TodoList({
			$el: self.find('.todolist-container'),
			model: {
				todolist: self.model.todolist
			},
			actionCreator: todoActionCreator
		});

		self.toolBar = new ToolBar({
			$el: self.find('.toolbar-container'),
			model: {
				status: self.model.status
			},
			actionCreator: todoActionCreator
		});

		todoActionCreator.queryTodoList(1);

	};

	Todo.prototype.shouldComponentUpdate = function() {
		var self = this;

		self.todoList.updateModel({
			todolist: self.model.todolist
		});

		return false;
	}

	return Todo;
});
