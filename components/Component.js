define([
	'jquery',
	'underscore',
	'ejs',
	'components/Pubsub',
	'components/Utils'
], function($, _, ejs, Pubsub, Utils){

	function Component(options) {
		if(options.$el.length === 0) {
			throw new Error('$el was not exist')
		} else {
			this.$el = options.$el;
		}

		this.guid = Utils.guid();
		this.msgBus = options.msgBus || new Pubsub;

		this.model = $.extend(true, {}, this.constructor._model || {}, options.model || {});
		this.view = $.extend(true, {}, this.constructor._view || {}, options.view || {});
		this.messages = options.messages || {};
		this.style = $.extend(true, {}, this.constructor._style || {}, options.style || {});

		if(options.actionCreator) {
			this.actionCreator = options.actionCreator;
		}

		this.init();

		return this;
	}

	Component.prototype.init = function() {
		this.initSubscriber();

		this.render();
		this.mount();
		this.applyStyle();

		this.undelegateEvents();
	    this.delegateEvents();
	    return this;
	}

	Component.prototype.beforeRender = function() {
		return this;
	}

	Component.prototype.render = function() {
		this.beforeRender();

		var compiledTpl = ejs.compile(this.view.template);
	    this.renderedComponent = compiledTpl(this);

	    this.afterRender();
	    
	    return this;
	};

	Component.prototype.afterRender = function() {
		return this;
	}

	Component.prototype.applyStyle = function() {
		for(var identity in this.style) {
			var style = this.style[identity];
			for(var styleProp in style) {
				this.find(identity).css(styleProp, style[styleProp]);
			}
		}
	}

	Component.prototype.beforeMount = function() {
		return this;
	}

	Component.prototype.mount = function() {
		this.beforeMount();

		var $el = this.$el;
	    $el.html(this.renderedComponent);

	    this.afterMount();

	    return this;
	}

	Component.prototype.afterMount = function() {
		return this;
	};

	Component.prototype.shouldComponentUpdate = function() {
		return true;
	};

	Component.prototype.initSubscriber = function() {
		for(var message in this.messages) {
			if(!(message in this.constructor._messages)) {
				throw new Error(message + ' is not defined in ' + this.constructor.name);
			} else {
				var func = this.messages[message];

				this.msgBus.subscribe(message, func);
			}
			
		}

		return this;
	};
	Component.prototype.clearSubscriber = function() {

	};

	Component.prototype.eventSplitter = /^(\S+)\s*(.*)$/;

	Component.prototype.delegateEvents = function () {
		var events = this.view.events;

        for (var key in events) {
            var methodName = events[key];
            var method = this.proxy(this[methodName]);

            var match = key.match(this.eventSplitter);

            var eventName = match[1], selector = match[2];

            if (selector === '') {
                this.$el.bind(eventName, method);
            } else {
                this.$el.on(eventName, selector, method);
            }
        }

        return this;
    }
    Component.prototype.undelegateEvents = function() {
    	var events = this.view.events;

    	for (var key in events) {
            var methodName = events[key];
            var method = this.proxy(this[methodName]);

            var match = key.match(this.eventSplitter);

            var eventName = match[1], selector = match[2];

            if (selector === '') {
                this.$el.unbind(eventName);
            } else {
                this.$el.off(eventName, selector);
            }
        }

    	return this;
    }

	Component.prototype.destory = function() {
		this.clearSubscriber();
		this.$el.children().remove();
		this.msgBus = null;
	}

	Component.prototype.validate = function(value) {
		var self = this;
		self.rules.forEach(function(rule){
			var $errorMsgEl = self.find(rule.errorMsgIdentity);

			if(!rule.validator(value)) {
				$errorMsgEl.text(rule.errorMsg);
			} else {
				$errorMsgEl.text('');
			}
		});

		return this;
	}

	Component.prototype.hide = function() {
		this.$el.hide();
	};

	Component.prototype.show = function() {
		this.$el.show();
	}

	Component.prototype.toggle = function() {
		this.$el.toggle();
	}

	Component.prototype.find = function(identity) {
		if(this.$el.find(identity).length === 0) return null;

		return this.$el.find(identity);
	}

	Component.prototype.proxy = function(func) {
		var self = this;
		return (function() {
			return func.apply(self, arguments);
		});
	}

	Component.prototype.setStyle = function($el, styleProp, styleValue) {
		$el.css(styleProp, styleValue);
	}

	Component.prototype.updateModel = function(data) {
		var newModel = $.extend({}, this.model, data);

		if (_.isEqual(newModel, this.model)) {
			return;
		}

		this.model = newModel;

		if(this.shouldComponentUpdate()) {
			this.render();
			this.mount();
			this.applyStyle();
		}
		
	}

	Component.prototype.mountTo = function($el) {
		if(!$el || $el.length === 0) {
			throw new Error('can not mount to ' + $el);
		}
		$el.append(this.$el.children());
		this.$el = $el;
	}

	return Component;

});
