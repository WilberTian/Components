define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./RadioboxGroupTab.ejs',
	'components/radioboxGroup/RadioboxGroup',
	'../demoCode/DemoCode',
	'text!./radioboxGroupHtml.txt',
	'text!./radioboxGroupJs.txt',
	'text!./radioboxGroupEvents.txt',
	'text!./radioboxGroupMessages.txt'
], function($, Component, Utils, ejsTpl, RadioboxGroup, DemoCode, radioboxGroupHtml, radioboxGroupJs, radioboxGroupEvents, radioboxGroupMessages){

	RadioboxGroupTab._model = {};
	RadioboxGroupTab._view = {
		template: ejsTpl
	};

	RadioboxGroupTab._messages = {};

	function RadioboxGroupTab(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(RadioboxGroupTab, Component);

	RadioboxGroupTab.prototype.afterMount = function() {
		var self = this;

		new RadioboxGroup({
	        $el: self.find('.radiobox-group'),
	        model: {
	        	checked: 2,
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
				htmlCode: radioboxGroupHtml,
				jsCode: radioboxGroupJs,
				eventsCode: radioboxGroupEvents,
				messagesCode: radioboxGroupMessages
			}
			
		});
	}

	return RadioboxGroupTab;
});
