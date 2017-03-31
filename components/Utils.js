define([
	'components/Settings'
], function(Settings){
	var inherit = function(child, parent) {
		child.prototype = Object.create(parent.prototype);
		child.prototype.constructor = child;
	};

	function guid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	}

	function logDebugMsg(debugMsg) {
		if(Settings.debug) console.log(debugMsg);
	}

	// enhance Function object
	Function.prototype.before = function(fn) {
		var self = this;

		return function() {
			fn.apply(this, arguments);
			return self.apply(this, arguments);
		}
	}

	Function.prototype.after = function(fn) {
		var self = this;

		return function() {
			var result = self.apply(this, arguments);
			fn.apply(this, arguments);

			return result;
		}
	}

	return {
		inherit: inherit,
		guid: guid,
		logDebugMsg: logDebugMsg,
		noop: function() {}
	}
});

