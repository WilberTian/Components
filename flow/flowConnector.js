define([], function() {
	function flowConnector(component, store, modelMapper) {

		var self = this;
		store.subscribe(function(){
			var model = modelMapper(store.getModel());
			component.updateModel(model);
		});

	}

	return flowConnector;
});