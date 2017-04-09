define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./Todo.ejs',
	'./ToolBar/ToolBar',
	'./TodoList/TodoList'
], function($, Component, Utils, ejsTpl, ToolBar, TodoList){

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

		self.toolBar = new ToolBar({
			$el: self.find('.toolbar-container'),
			messages: {
				'RADIOBOXGROUP_CHANGE': self.proxy(self.todoListFilterChange_message)
			}
		});
		
		self.todoList = new TodoList({
			$el: self.find('.todolist-container')
		});

	};

	Todo.prototype.todoListFilterChange_message = function(filter) {
		// filter: 1-all, 2-todo, 3-completed
		var self = this;

		$.ajax({
			url: 'mock/todoList_mock',
			dataType:'json',
			success: function(data) {
				var todoList = data.msg.todolist.filter(function(item){
					switch(filter) {
						case 1:
							return true;
							break;
						case 2:
							return item.status === true;
							break;
						case 3: 
							return item.status === false;
							break;
						default:
							return true;
					}
				});

				self.todoList.updateModel({
					todolist: todoList
				});
			},
			error: function(xhr, err) {
				console.log(err);
			}
		});
	}

	return Todo;
});
