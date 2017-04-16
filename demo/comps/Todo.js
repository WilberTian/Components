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
	'./flow/todo.actionCreator',
	'../../flow/combineConsumers',
	'../../flow/bindActionCreators'
], function($, Component, Utils, ejsTpl, ToolBar, TodoList, todoListAPI, todoConsumer, todoStore, todoActionCreator, combineConsumers, bindActionCreators){

	Todo._model = {
		todolist: [],
		status: 1
	};
	Todo._view = {
		template: ejsTpl
	};

	Todo._messages = {};

	function Todo(options) {
		var appConsumer = combineConsumers({todoConsumer});

		var store = todoStore(appConsumer);


		var modelMapper = function(model, modelKey) {
			return model[modelKey];
		}

		var self = this;
		store.subscribe(function(){
			var model = modelMapper(store.getModel(), 'todoConsumer');
			self.updateModel(model);
		});

		bindActionCreators(todoActionCreator, store);

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
