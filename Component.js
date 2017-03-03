define([
	'jquery',
	'ejs',
	'Pubsub',
	'Utils'
], function($, ejs, Pubsub, Utils){

	function Component(options) {
		if(options.$el.length === 0) {
			throw new Error('$el was not exist')
		} else {
			this.$el = options.$el;
		}

		this.guid = Utils.guid();
		this.ref = options.ref || this;
	}

	Utils.inherit(Component, Pubsub);

	Component.prototype.beforeRender = function() {
		return this;
	}

	Component.prototype.render = function() {
		// bind the subscriber
		this.initSubscriber();
		this.beforeRender();

		var $el = this.$el;
		var compiledTpl = ejs.compile(this.template);
	    var html = compiledTpl(this);
	    $el.html(html);

	    this.afterRender();
	    this.delegateEvents();
	    return this;
	};
	Component.prototype._render = function() {
		var $el = this.$el;
		var compiledTpl = ejs.compile(this.template);
	    var html = compiledTpl(this);
	    $el.html(html);

	    return this;
	};

	Component.prototype.afterRender = function() {
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
	Component.prototype.toMsgName = function(message) {
		return this.guid + '-' + message;
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
                this.$el.delegate(selector, eventName, method);
            }
        }

        return this;
    }

	Component.prototype.destory = function() {
		this.$el.children().remove();
		// need to remove all the subscribers
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

	return Component;

});
