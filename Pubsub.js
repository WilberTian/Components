define([
	'Settings'
], function(Settings){
	function Pubsub(Settings) {
	}

	Pubsub.prototype.subscribe = function(ev, callback) {
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
		
		if(!this._callbacks) return this;
		if(!this._callbacks[ev]) return this;
		
		for(var i = 0; i < this._callbacks[ev].length; i++) {
			this._callbacks[ev][i].apply(this, args);
		}
		
		return this;
	}

	if(Settings.debug) {
		var publichFn = Pubsub.prototype.publish;
		Pubsub.prototype.publish = publichFn.before(function(){
			var args = Array.prototype.slice.call(arguments);
			var ev = args.shift();

			console.log('MSG: ' + ev + ', ARGS: ' + args);
		})

	}

	return Pubsub

});

