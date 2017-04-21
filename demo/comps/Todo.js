define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./Todo.ejs',
	'components/textarea/Textarea',
	'./ToolBar/ToolBar',
	'./TodoList/TodoList',
	'../mock/todoListAPI',
	'./flow/todo.consumer',
	'./flow/todo.actionCreator',
	'./flow/op.consumer',
	'./flow/op.actionCreator',
	'../../flow/combineConsumers',
	'../../flow/createStore',
	'../../flow/bindActionCreators',
	'../../flow/flowConnector'
], function($, Component, Utils, ejsTpl, Textarea, ToolBar, TodoList, todoListAPI, todoConsumer, todoActionCreator, opConsumer, opActionCreator, combineConsumers, createStore, bindActionCreators, flowConnector){

	Todo._model = {
		todolist: [],
		status: 1,
		opList: []
	};
	Todo._view = {
		template: ejsTpl
	};

	Todo._messages = {};

	function Todo(options) {
		var appConsumer = combineConsumers({todoConsumer, opConsumer});
		var store = createStore(appConsumer);

		var modelMapper = function(model) {
			var componentModel = {};

			componentModel.todolist = model['todoConsumer'].todolist;
			componentModel.status = model['todoConsumer'].status;
			componentModel.opList = model['opConsumer'].opList;

			return componentModel;
		}

		flowConnector(this, store, modelMapper);

		bindActionCreators(todoActionCreator, store);
		bindActionCreators(opActionCreator, store);
		this.combinedActionCreators = $.extend({}, todoActionCreator, opActionCreator);

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
			actionCreator: self.combinedActionCreators
		});

		self.toolBar = new ToolBar({
			$el: self.find('.toolbar-container'),
			model: {
				status: self.model.status
			},
			actionCreator: self.combinedActionCreators
		});

		self.opListComponent = new Textarea({
			$el: self.find('.op-container'),
			model: {
				text: self.model.opList.join('\n'),
				readonly: true
			},
			style: {
				'.C_Textarea_input': {
					resize: 'none',
					width: '100%'
				}
				
			}
		});

		self.combinedActionCreators.queryTodoList(1);

	};

	Todo.prototype.shouldComponentUpdate = function() {
		var self = this;

		self.todoList.updateModel({
			todolist: self.model.todolist
		});

		self.opListComponent.updateModel({
			text: self.model.opList.join('\n'),
		});

		return false;
	}

	return Todo;
});
