define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./SelectAndSearchTab.ejs',
	'components/options/Options',
	'components/select/Select',
	'components/search/Search',
	'../demoCode/DemoCode',
	'text!./selectAndSearchHtml.txt',
	'text!./selectAndSearchJs.txt',
	'text!./selectAndSearchEvents.txt',
	'text!./selectAndSearchMessages.txt'
], function($, Component, Utils, ejsTpl, Options, Select, Search, DemoCode, selectAndSearchHtml, selectAndSearchJs, selectAndSearchEvents, selectAndSearchMessages){

	SelectAndSearchTab._model = {};
	SelectAndSearchTab._view = {
		template: ejsTpl
	};

	SelectAndSearchTab._messages = {};

	function SelectAndSearchTab(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(SelectAndSearchTab, Component);

	SelectAndSearchTab.prototype.afterMount = function() {
		var self = this;

		new Options({
			$el: self.find('.options'),
			model: {
				options: [{
		            label: 'male',
		            value: '1'
		        }, {
		            label: 'female',
		            value: '2'
	        	}]
			}
			
		});

		new Select({
	        $el: self.find('.select'),
	        model: {
	        	selected: {
		            label: 'female',
		            value: '2'
		        },
		        options: [{
		            label: 'male',
		            value: '1'
		        }, {
		            label: 'female',
		            value: '2'
		        }]
	        }
	        
	    });

	    new Search({
	        $el: self.find('.search'),
	        model: {
	        	url: '/mock/search_mock',
	        	selected: {}
	        }
	    });

		new DemoCode({
			$el: self.find('.demo-code'),
			model: {
				htmlCode: selectAndSearchHtml,
				jsCode: selectAndSearchJs,
				eventsCode: selectAndSearchEvents,
				messagesCode: selectAndSearchMessages
			}
			
		});
	}

	return SelectAndSearchTab;
});
