define([
	'jquery',
	'Component',
	'Utils',
	'text!Tab.ejs'
], function($, Component, Utils, ejsTpl){

	var _data = {
		tabs: [],
		selected: -1,
		template: ejsTpl,

		events: {
			'click .C_Tab .tab-item': 'setActiveTab_event'
		}
	}

	function Tab(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Tab, Component);

	Tab.prototype.afterMount = function() {
		this.setActiveTab(this.selected);
		return this;
	};

	Tab.prototype.setActiveTab = function(idx) {
		this.find('.tab-item').removeClass('active');
		this.selected = idx;
		this.find('.tab-item').eq(idx).addClass('active');
	}

	Tab.prototype.setActiveTab_event = function(e) {
		var selectedTabIdx = $(e.currentTarget).index();

		if(selectedTabIdx !== this.selected) {
			this.setActiveTab(selectedTabIdx);
		}

		this.msgBus.publish('TAB_CHANGE', this.selected);
	};

	return Tab;
});
