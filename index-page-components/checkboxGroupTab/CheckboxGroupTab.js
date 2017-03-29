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

	var _data = {
		template: ejsTpl,
	}

	function CheckboxGroupTab(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}

	Utils.inherit(CheckboxGroupTab, Component);

	CheckboxGroupTab.prototype.afterMount = function() {
		var self = this;

		new CheckboxGroup({
	        $el: self.find('.checkbox-group'),
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
	    });

		new DemoCode({
			$el: self.find('.demo-code'),
			htmlCode: checkboxGroupHtml,
			jsCode: checkboxGroupJs,
			eventsCode: checkboxGroupEvents,
			messagesCode: checkboxGroupMessages
		});
	}

	return CheckboxGroupTab;
});
