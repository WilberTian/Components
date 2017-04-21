define([], function() {
	function bindActionCreators(actionCreators, store) {
		for(var actionCreator in actionCreators) {
			var f = actionCreators[actionCreator];
			if(typeof f === 'function') {
				actionCreators[actionCreator] = (function(f){
					return function() {
						var action = f.apply(this, arguments);
						store.dispatch(action);
					};
				})(f);
			}
		}

		return actionCreators;
	}

	return bindActionCreators;
});