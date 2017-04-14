define([], function() {
	return function(comp, consumer) {
		var dispatch = function(action) {
			var model = consumer(comp.model, action)
			comp.updateModel(model);
		}

		return {
			dispatch: dispatch
		};
	};

});