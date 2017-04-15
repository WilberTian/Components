define([
	'jquery',
	'underscore',
	'../../mock/todoListAPI'
], function($, _, todoListAPI){
	function todoConsumer(model, action) {
		var model = $.extend({}, model);

		switch(action.message) {
			case "QUERY_TODO_LIST":
				model.todolist = todoListAPI.queryTodoListByStatus(action.status);
				model.status = action.status;
				
				break;
			case "ADD_TODO_ITEM":
				model.todolist = todoListAPI.addTodoItem(action.todoItem);
				break;
			case "UPDATE_TOTO_ITEM":
				model.todolist = todoListAPI.updateTodoItem(action.todoItem);
				break;
			case "DELETE_TODO_ITEM":
				model.todolist = todoListAPI.deleteTodoItem(action.todoItem);
				break;
			default:
				break;
		}

		return model;
	}

	return todoConsumer;

});
