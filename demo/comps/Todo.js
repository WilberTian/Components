define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./Todo.ejs',
	'./ToolBar/ToolBar',
	'./TodoList/TodoList',
	'../mock/todoListAPI'
], function($, Component, Utils, ejsTpl, ToolBar, TodoList, todoListAPI){

	Todo._model = {};
	Todo._view = {
		template: ejsTpl
	};

	Todo._messages = {};

	function Todo(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Todo, Component);

	Todo.prototype.afterMount = function() {
		var self = this;

		self.todoList = new TodoList({
			$el: self.find('.todolist-container'),
		});

		self.toolBar = new ToolBar({
			$el: self.find('.toolbar-container'),
			messages: {
				'RADIOBOXGROUP_CHANGE': self.proxy(self.todoListFilterChange_message),
				'ADD_TODO_ITEM': self.proxy(self.addTodoItem_message)
			}
		});

	};

	Todo.prototype.todoListFilterChange_message = function(filter) {
		// filter: 1-all, 2-todo, 3-completed
		var self = this;

		var todoListData = todoListAPI.queryTodoListByStatus(filter);

		self.todoList.updateModel({
			todolist: todoListData
		});
	}

	Todo.prototype.addTodoItem_message = function() {
		var self = this;
		var todoListData = todoListAPI.queryTodoListByStatus(1);

		self.todoList.updateModel({
			todolist: todoListData
		});
	}

	return Todo;
});
