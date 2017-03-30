define([
	'jquery',
	'ejs',
	'components/Pubsub',
	'components/Utils'
], function($, ejs, Pubsub, Utils){

	function Component(options) {
		if(options.$el.length === 0) {
			throw new Error('$el was not exist')
		} else {
			this.$el = options.$el;
		}

		this.guid = Utils.guid();
		this.msgBus = options.msgBus || new Pubsub;

		this.init();
		return this;
	}

	Component.prototype.init = function() {
		this.initSubscriber();

		this.render();
		this.mount();

		this.undelegateEvents();
	    this.delegateEvents();
	    return this;
	}

	Component.prototype.beforeRender = function() {
		return this;
	}

	Component.prototype.render = function() {
		this.beforeRender();

		var compiledTpl = ejs.compile(this.template);
	    this.renderedComponent = compiledTpl(this);

	    this.afterRender();
	    
	    return this;
	};

	Component.prototype.afterRender = function() {
		return this;
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

	Component.prototype.initSubscriber = function() {
		for(var message in this.messages) {
			
			var func = this.messages[message];

			this.msgBus.subscribe(message, func);
		}

		return this;
	};
	Component.prototype.clearSubscriber = function() {

	};

	Component.prototype.eventSplitter = /^(\S+)\s*(.*)$/;

	Component.prototype.delegateEvents = function () {
        for (var key in this.events) {
            var methodName = this.events[key];
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
    	for (var key in this.events) {
            var methodName = this.events[key];
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

	Component.prototype.updateData = function(data) {
		$.extend(this, data);
		
		this.render();
		this.mount();
	}

	Component.prototype.getData = function() {
		throw new Error('please implement the getData method for the Component');
	}

	return Component;

});
