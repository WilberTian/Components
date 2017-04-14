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
						store.dispatch(f());
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
			}
		});

		self.toolBar = new ToolBar({
			$el: self.find('.toolbar-container'),
			model: {
				status: self.model.status
			},
			messages: {
				'QUERY_TODO_LIST': self.proxy(self.queryTodoList_message),
				'ADD_TODO_ITEM': self.proxy(self.addTodoItem_message)
			}
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

	Todo.prototype.consumer = todoConsumer;


	Todo.prototype.queryTodoList_message = function(filter) {
		// filter: 1-all, 2-todo, 3-completed
		var self = this;

		var todoListData = todoListAPI.queryTodoListByStatus(filter);

		self.updateModel({
			todolist: todoListData,
			status: filter
		});
	}

	Todo.prototype.addTodoItem_message = function() {
		this.consumer('ADD_TODO_ITEM');
	}

	return Todo;
});
