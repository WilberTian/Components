define([], function() {

	function queryTodoList(status) {
		return {
			message: 'QUERY_TODO_LIST',
			status: status
		};
	}

	function addTodoItem(name, status) {
		return {
			message: 'ADD_TODO_ITEM',
			name: name,
			status: status
		};
	}

	return {
		queryTodoList, 
		addTodoItem
	}
});