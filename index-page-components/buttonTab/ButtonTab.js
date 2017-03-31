define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./ButtonTab.ejs',
	'components/button/Button',
	'../demoCode/DemoCode',
	'text!./buttonHtml.txt',
	'text!./buttonJs.txt',
	'text!./buttonEvents.txt',
	'text!./buttonMessages.txt'
], function($, Component, Utils, ejsTpl, Button, DemoCode, buttonHtml, buttonJs, buttonEvents, buttonMessages){

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
