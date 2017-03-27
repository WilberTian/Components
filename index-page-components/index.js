define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./Index.ejs',
	'components/tab/Tab',
	'./iconTab/IconTab',
	'./buttonTab/ButtonTab'
], function($, Component, Utils, ejsTpl, Tab, IconTab, ButtonTab){

	var _data = {
		template: ejsTpl,

		messages: {
			'TAB_CHANGE': 'tabChange_message'
		}
	}

	function Index(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Index, Component);

	Index.prototype.afterMount = function() {
		var self = this;

		new Tab({
			$el: self.find('.tabs-container'),
			selected: 0,
	        tabs: [{
	            label: 'Icon',
	            value: '1'
	        }, {
	            label: 'Button',
	            value: '2'
	        }, {
	            label: 'Text',
	            value: '3'
	        }],

	        msgBus: self
		})
	}

	Index.prototype.tabChange_message = function(tabIdx) {
		var self = this;

		switch(tabIdx) {
			case 0:
				new IconTab({
					$el: self.find('.tab-content-container')
				});
				break;
			case 1:
				new ButtonTab({
					$el: self.find('.tab-content-container')
				});
				break
		}
	}

	return Index;
});
