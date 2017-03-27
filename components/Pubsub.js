define([
	'components/Utils',
	'components/MessageTypes'
], function(Utils, MessageTypes){
	function Pubsub() {
	}

	Pubsub.prototype.subscribe = function(ev, callback) {
		this.checkMessage(ev);

		this._callbacks || (this._callbacks = {});
		(this._callbacks[ev] || (this._callbacks[ev] = [])).push(callback);
		
		return this;		
	};

	Pubsub.prototype.unsubscribe = function(ev, callback) {
	    if(!ev) {
	        this._callbacks = {};
	        return this;
	    }
	    
	    if(!this._callbacks) return this;
		if(!this._callbacks[ev]) return this;
	    
	    for(var i = 0; i < this._callbacks[ev].length; i++) {
	        if(callback === this._callbacks[ev][i]) {
	            this._callbacks[ev].splice(i, 1);
	        }
		}
		
		return this;
	};

	Pubsub.prototype.publish = function() {
		var args = Array.prototype.slice.call(arguments);
				
		var ev = args.shift();
		this.checkMessage(ev);

		Utils.logDebugMsg('MSG: ' + ev + '; ARGS: ' + args);
		
		if(!this._callbacks) return this;
		if(!this._callbacks[ev]) return this;
		
		for(var i = 0; i < this._callbacks[ev].length; i++) {
			this._callbacks[ev][i].apply(this, args);
		}
		
		return this;
	}

	Pubsub.prototype.checkMessage = function(message) {
		if(!(message in MessageTypes)) {
			throw new Error(message + ' was not define in the MessageTypes');
		}
	}

	return Pubsub

});

