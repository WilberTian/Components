define([], function() {
	return function(consumer, initModel) {
		var listeners = [];
		var model = initModel;

		var dispatch = function(action) {
			model = consumer(model, action)

			for(var i = 0; i < listeners.length; i++) {
				listeners[i]();
			}
		};

		var getModel = function() {
			return model;
		};

		var subscribe = function (listener) {
			listeners.push(listener);
		};

		return {
			dispatch: dispatch,
			getModel: getModel,
			subscribe: subscribe
		};
	};

});