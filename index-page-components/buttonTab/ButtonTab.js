define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./ButtonTab.ejs',
	'components/button/Button',
	'components/dropdownButton/DropdownButton',
	'../demoCode/DemoCode',
	'text!./buttonHtml.txt',
	'text!./buttonJs.txt',
	'text!./buttonEvents.txt',
	'text!./buttonMessages.txt'
], function($, Component, Utils, ejsTpl, Button, DropdownButton, DemoCode, buttonHtml, buttonJs, buttonEvents, buttonMessages){

	ButtonTab._model = {};
	ButtonTab._view = {
		template: ejsTpl
	};

	ButtonTab._messages = {};

	function ButtonTab(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(ButtonTab, Component);

	ButtonTab.prototype.afterMount = function() {
		var self = this;

		new Button({
	        $el: self.find('.submit-button'),
	        model: {
	        	text: 'Submit'
	        }
	    });

	    new Button({
	        $el: self.find('.cancel-button'),
	        model: {
	        	text: 'Cancel'
	        }
	    });

	    new Button({
	        $el: self.find('.disabled-button'),
	        model: {
	        	text: 'Disabled Btn',
	        	disabled: true
	        }
	    });

	    new Button({
	        $el: self.find('.icon-button'),
	        model: {
	        	text: 'Setting',
	        	iconClass: 'fa fa-cog'
	        }
	    });

    	new Button({
	        $el: self.find('.icon-only-button'),
	        model: {
	        	iconClass: 'fa fa-cog'
	        }
	    });

	    new DropdownButton({
	        $el: self.find('.dropdown-button'),
	        model: {
	        	text: 'Actions',
	        	options: [{
	        		label: 'Add',
	        		value: 1
	        	},{
	        		label: 'Delete',
	        		value: 2
	        	},{
	        		label: 'Edit',
	        		value: 3
	        	}]
	        }
	    });

		new DemoCode({
			$el: self.find('.demo-code'),
			model: {
				htmlCode: buttonHtml,
				jsCode: buttonJs,
				eventsCode: buttonEvents,
				messagesCode: buttonMessages
			}
		});
	}

	return ButtonTab;
});
