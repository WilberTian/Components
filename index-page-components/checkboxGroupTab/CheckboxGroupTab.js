define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./CheckboxGroupTab.ejs',
	'components/checkboxGroup/CheckboxGroup',
	'../demoCode/DemoCode',
	'text!./checkboxGroupHtml.txt',
	'text!./checkboxGroupJs.txt',
	'text!./checkboxGroupEvents.txt',
	'text!./checkboxGroupMessages.txt'
], function($, Component, Utils, ejsTpl, CheckboxGroup, DemoCode, checkboxGroupHtml, checkboxGroupJs, checkboxGroupEvents, checkboxGroupMessages){

	CheckboxGroupTab._model = {};
	CheckboxGroupTab._view = {
		template: ejsTpl
	};

	CheckboxGroupTab._messages = {};

	function CheckboxGroupTab(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(CheckboxGroupTab, Component);

	CheckboxGroupTab.prototype.afterMount = function() {
		var self = this;

		new CheckboxGroup({
	        $el: self.find('.checkbox-group'),
	        model: {
	        	checked: [2, 3],
		        options: [{
		            label: '初级',
		            value: '1'
		        }, {
		            label: '中级',
		            value: '2'
		        }, {
		            label: '高级',
		            value: '3'
		        }]
	        }
	        
	    });

		new DemoCode({
			$el: self.find('.demo-code'),
			model: {
				htmlCode: checkboxGroupHtml,
				jsCode: checkboxGroupJs,
				eventsCode: checkboxGroupEvents,
				messagesCode: checkboxGroupMessages
			}
		});
	}

	return CheckboxGroupTab;
});
