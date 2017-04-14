define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./TodoList.ejs',
	'../TodoItem/TodoItem'
], function($, Component, Utils, ejsTpl, TodoItem){

	TodoList._model = {};

	TodoList._view = {
		template: ejsTpl
	};

	TodoList._messages = {};

	function TodoList(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(TodoList, Component);

	TodoList.prototype.afterMount = function() {
		var self = this;
		
		self.model.todolist.forEach(function(todoItem){
			self.$el.append('<div id="compId-' + todoItem.id + '"></div>');

			var todoItemComponent = new TodoItem({
				$el: self.find('#compId-' +  todoItem.id),
				model: {
					id: todoItem.id,
					name: todoItem.name,
					status: todoItem.status,
					createDate: todoItem.createDate,
					completeDate: TodoItem.completeDate
				}
			});
		});
	}

	return TodoList;
});
