define([
	'jquery',
	'../../mock/opAPI'
], function($, opAPI){
	function opConsumer(model, action) {
		var model = $.extend({}, model);

		switch(action.message) {
			case "SAVE_OP":
				model.opList = opAPI.saveOperation(action.operation);
				break;
			case "GET_OP_LIST":
				model.opList = opAPI.getOperationList();
				break;
			default:
				break;
		}

		return model;
	}

	return opConsumer;

});
