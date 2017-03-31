define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./Index.ejs',
	'components/tab/Tab',
	'./iconTab/IconTab',
	'./buttonTab/ButtonTab',
	'./textTab/TextTab',
	'./switchTab/SwitchTab',
	'./radioboxGroupTab/RadioboxGroupTab',
	'./checkboxGroupTab/CheckboxGroupTab',
	'./selectAndSearchTab/SelectAndSearchTab',
	'./dateTab/DateTab'
], function($, Component, Utils, ejsTpl, Tab, IconTab, ButtonTab, TextTab, SwitchTab, RadioboxGroupTab, CheckboxGroupTab, SelectAndSearchTab, DateTab){

	Index._model = {};

	Index._view = {
		template: ejsTpl
	};

	Index._messages = {};

	function Index(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Index, Component);

	Index.prototype.afterMount = function() {
		var self = this;

		new Tab({
			$el: self.find('.tabs-container'),
			model: {
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
		        }, {
		            label: 'Switch',
		            value: '4'
		        }, {
		            label: 'RadioboxGroup',
		            value: '5'
		        }, {
		            label: 'CheckboxGroup',
		            value: '6'
		        }, {
		            label: 'Select & Search',
		            value: '7'
		        }, {
		            label: 'Date',
		            value: '8'
		        }]
			},
			
	        messages: {
	        	'TAB_CHANGE': self.proxy(self.tabChange_message)
	        }
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
				break;
			case 2:
				new TextTab({
					$el: self.find('.tab-content-container')
				});
				break;	
			case 3:
				new SwitchTab({
					$el: self.find('.tab-content-container')
				});
				break;		
			case 4:
				new RadioboxGroupTab({
					$el: self.find('.tab-content-container')
				});
				break;		
			case 5:
				new CheckboxGroupTab({
					$el: self.find('.tab-content-container')
				});
				break;	
			case 6:
				new SelectAndSearchTab({
					$el: self.find('.tab-content-container')
				});
				break;		
			case 7:
				new DateTab({
					$el: self.find('.tab-content-container')
				});
				break;						
		}
	}

	return Index;
});
