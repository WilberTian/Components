define([], function(){
	var opList = [];

    return {
    	getOperationList: function() {
    		return opList;
    	},
    	saveOperation: function(operation) {
    		opList.push(operation);
    		return opList;
    	}
    	
    }
});