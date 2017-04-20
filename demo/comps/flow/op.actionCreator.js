define([], function() {

	function saveOperation(operation) {
		return {
			message: 'SAVE_OP',
			operation: operation
		};
	}

	function getOperationList() {
		return {
			message: 'GET_OP_LIST'
		};
	}

	return {
		saveOperation, 
		getOperationList
	}
});