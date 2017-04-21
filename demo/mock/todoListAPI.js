define([], function(){
	var todoList = [{
		"id": "1",
		"name": "Buy some milk",
		"status": false,
		"createDate": "",
		"completeDate": ""
    }, {
		"id": "2",
		"name": "Buy some coffee bean",
		"status": false,
		"createDate": "",
		"completeDate": ""
    }, {
		"id": "3",
		"name": "Read JavaScript Patterns",
		"status": false,
		"createDate": "",
		"completeDate": ""
    }, {
		"id": "4",
		"name": "Write a blog",
		"status": true, 
		"createDate": "",
		"completeDate": ""
    }, {
		"id": "5",
		"name": "Update todo demo of Components",
		"status": false,
		"createDate": "",
		"completeDate": ""
    }];

    var globalId = '100';

    return {
    	queryTodoListByStatus: function(filter) {
    		return todoList.filter(function(todoItem){
				switch(filter) {
					case 1:
						return true;
						break;
					case 2:
						return todoItem.status === true;
						break;
					case 3: 
						return todoItem.status === false;
						break;
					default:
						return true;
				}
			});
    	},
    	addTodoItem: function(todoItem) {
    		globalId += 1;
    		todoItem.id = globalId;
    		todoList.push(todoItem);

    		return todoList;
    	},
    	updateTodoItem: function(target) {
    		var found = todoList.find(function(todoItem){
    			return todoItem.id === target.id;
    		});

    		if(found) {
    			found.name = target.name;
    			found.status = target.status;
    		}

    		return todoList;
    	},
    	deleteTodoItem: function(target) {
    		var foundIdx = todoList.findIndex(function(todoItem){
    			return todoItem.id === target.id;
    		});

    		if(foundIdx > -1) {
    			todoList.splice(foundIdx, 1);
    		}

    		return todoList;
    	}
    }
});