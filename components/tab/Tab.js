define([
	'jquery',
	'../Component',
	'../Utils',
	'text!./Tab.ejs'
], function($, Component, Utils, ejsTpl){

	Tab._model = {
		tabs: [],
		selected: -1
	};

	Tab._view = {
		template: ejsTpl,

		events: {
			'click .C_Tab .tab-item': 'setActiveTab_event'
		}
	};

	Tab._messages = {
		TAB_CHANGE: 'TAB_CHANGE'
	};

	function Tab(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Tab, Component);

	Tab.prototype.afterMount = function() {
		this.setActiveTab(this.model.selected);
		this.msgBus.publish('TAB_CHANGE', this.model.selected);
		return this;
	};

	Tab.prototype.setActiveTab = function(idx) {
		this.find('.tab-item').removeClass('active');
		this.model.selected = idx;
		this.find('.tab-item').eq(idx).addClass('active');
	}

	Tab.prototype.setActiveTab_event = function(e) {
		var selectedTabIdx = $(e.currentTarget).index();

		if(selectedTabIdx !== this.model.selected) {
			this.setActiveTab(selectedTabIdx);
		}

		this.msgBus.publish('TAB_CHANGE', this.model.selected);
	};

	return Tab;
});
