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
	'./dateTab/DateTab',
	'./timeTab/TimeTab',
	'./modalTab/ModalTab',
	'./hoverTab/HoverTab',
	'./toastrTab/ToastrTab',
	'./formTab/FormTab',
	'./paginationTab/PaginationTab',
	'./tableTab/TableTab',
	'./stepperTab/StepperTab',
	'./multiSelectTab/MultiSelectTab'
], function($, Component, Utils, ejsTpl, Tab, IconTab, ButtonTab, TextTab, SwitchTab, RadioboxGroupTab, CheckboxGroupTab, SelectAndSearchTab, DateTab, TimeTab, ModalTab, HoverTab, ToastrTab, FormTab, PaginationTab, TableTab, StepperTab, MultiSelectTab){

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
		            value: '0'
		        }, {
		            label: 'Button',
		            value: '1'
		        }, {
		            label: 'Text',
		            value: '2'
		        }, {
		            label: 'Switch',
		            value: '3'
		        }, {
		            label: 'RadioboxGroup',
		            value: '4'
		        }, {
		            label: 'CheckboxGroup',
		            value: '5'
		        }, {
		            label: 'Select & Search',
		            value: '6'
		        }, {
		            label: 'Date',
		            value: '7'
		        }, {
		            label: 'Time',
		            value: '8'
		        }, {
		            label: 'Modal',
		            value: '9'
		        }, {
		            label: 'Hover',
		            value: '10'
		        }, {
		            label: 'Toastr',
		            value: '11'
		        }, {
		            label: 'Form',
		            value: '12'
		        }, {
		            label: 'Pagination',
		            value: '13'
		        }, {
		            label: 'Table',
		            value: '14'
		        }, {
		            label: 'Stepper',
		            value: '15'
		        }, {
		            label: 'MultiSelect',
		            value: '16'
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
			case 8:
				new TimeTab({
					$el: self.find('.tab-content-container')
				});
				break;	
			case 9:
				new ModalTab({
					$el: self.find('.tab-content-container')
				});
				break;
			case 10:
				new HoverTab({
					$el: self.find('.tab-content-container')
				});	
				break;	
			case 11:
				new ToastrTab({
					$el: self.find('.tab-content-container')
				});	
				break;	
			case 12:
				new FormTab({
					$el: self.find('.tab-content-container')
				});	
				break;	
			case 13:
				new PaginationTab({
					$el: self.find('.tab-content-container')
				});	
				break;	
			case 14:
				new TableTab({
					$el: self.find('.tab-content-container')
				});	
				break;	
			case 15:
				new StepperTab({
					$el: self.find('.tab-content-container')
				});	
				break;	
			case 16:
				new MultiSelectTab({
					$el: self.find('.tab-content-container')
				});	
				break;									
			default:
				throw new Error('selected tab value was not existed!')						
		}
	}

	return Index;
});
