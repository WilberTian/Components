define([], function() {

	function queryTodoList(status) {
		return {
			message: 'QUERY_TODO_LIST',
			status: status
		};
	}

	function addTodoItem(todoItem) {
		return {
			message: 'ADD_TODO_ITEM',
			todoItem: todoItem
		};
	}

	function updateTodoItem(todoItem) {
		return {
			message: 'UPDATE_TOTO_ITEM',
			todoItem: todoItem
		};
	}

	function deleteTodoItem(todoItem) {
		return {
			message: 'DELETE_TODO_ITEM',
			todoItem: todoItem
		};
	}

	return {
		queryTodoList, 
		addTodoItem,
		updateTodoItem,
		deleteTodoItem
	}
});