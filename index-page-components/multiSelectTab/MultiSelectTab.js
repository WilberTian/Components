define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./MultiSelectTab.ejs',
	'components/multiSelect/MultiSelect',
	'../demoCode/DemoCode',
	'text!./multiSelectHtml.txt',
	'text!./multiSelectJs.txt',
	'text!./multiSelectEvents.txt',
	'text!./multiSelectMessages.txt'
], function($, Component, Utils, ejsTpl, MultiSelect, DemoCode, multiSelectHtml, multiSelectJs, multiSelectEvents, multiSelectMessages){

	MultiSelectTab._model = {};
	MultiSelectTab._view = {
		template: ejsTpl
	};

	MultiSelectTab._messages = {};

	function MultiSelectTab(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(MultiSelectTab, Component);

	MultiSelectTab.prototype.afterMount = function() {
		var self = this;

		new MultiSelect({
	        $el: $('.multi-select'),
	        model: {
	        	selected: [{
		            label: '中级',
		            value: '2'
		        }, {
		            label: '高级',
		            value: '3'
		        }],
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
				htmlCode: multiSelectHtml,
				jsCode: multiSelectJs,
				eventsCode: multiSelectEvents,
				messagesCode: multiSelectMessages
			}
			
		});
	}

	return MultiSelectTab;
});
