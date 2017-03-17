define([
	'jquery',
	'ejs',
	'MessageTypes',
	'Pubsub',
	'Utils'
], function($, ejs, MessageTypes, Pubsub, Utils){

	function Component(options) {
		if(options.$el.length === 0) {
			throw new Error('$el was not exist')
		} else {
			this.$el = options.$el;
		}

		this.guid = Utils.guid();
		this.msgBus = options.msgBus || this;

		this.init();
		return this;
	}

	Utils.inherit(Component, Pubsub);

	Component.prototype.init = function() {
		this.initSubscriber();

		this.render();
		this.mount();

		this.undelegateEvents();
	    this.delegateEvents();
	    return this;
	}

	Component.prototype.beforeMount = function() {
		return this;
	}

	Component.prototype.render = function() {
		var compiledTpl = ejs.compile(this.template);
	    this.renderedPage = compiledTpl(this);

	    return this;
	};

	Component.prototype.mount = function() {
		this.beforeMount();

		var $el = this.$el;
	    $el.html(this.renderedPage);

	    this.afterMount();

	    return this;
	}

	Component.prototype.afterMount = function() {
		return this;
	};

	Component.prototype.initSubscriber = function() {
		for(var message in this.messages) {
			var methodName = this.messages[message];
			var method = this.proxy(this[methodName])
			this.subscribe(this.toMsgName(message), method);
		}

		return this;
	};
	Component.prototype.clearSubscriber = function() {

	};
	Component.prototype.toMsgName = function(message) {
		if(!(message in MessageTypes)) {
			throw new Error(message + ' was not define in the MessageTypes');
		}
		return this.guid + '-' + MessageTypes[message];
	}

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

	return Component;

});
