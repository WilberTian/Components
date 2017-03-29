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

	var _data = {
		template: ejsTpl,
	}

	function SelectAndSearchTab(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}

	Utils.inherit(SelectAndSearchTab, Component);

	SelectAndSearchTab.prototype.afterMount = function() {
		var self = this;

		new Options({
			$el: self.find('.options'),
			options: [{
	            label: 'male',
	            value: '1'
	        }, {
	            label: 'female',
	            value: '2'
        	}]
		});

		new Select({
	        $el: self.find('.select'),
	        label: 'Gender',
	        required: true,
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
	    });

	    new Search({
	        $el: self.find('.search'),
	        url: '/mock/search_mock',
	        selected: {}
	    });

		new DemoCode({
			$el: self.find('.demo-code'),
			htmlCode: selectAndSearchHtml,
			jsCode: selectAndSearchJs,
			eventsCode: selectAndSearchEvents,
			messagesCode: selectAndSearchMessages
		});
	}

	return SelectAndSearchTab;
});
