define([
	'../../mock/todoListAPI'
], function(todoListAPI){
	function todoConsumer(model, action) {
		switch(action.message) {
			case "QUERY_TODO_LIST":
				var todoListData = todoListAPI.queryTodoListByStatus(filter);

				
				break;
			case "ADD_TODO_ITEM":
				var todoListData = todoListAPI.queryTodoListByStatus(1);

				
				break;
			case "EDIT_TODO_ITEM":
				break;
			case "DELETE_TODO_ITEM":
				break;
			default:
				break;
		}

		return model;
	}

	return todoConsumer;

});
