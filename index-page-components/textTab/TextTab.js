define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./TextTab.ejs',
	'components/text/Text',
	'components/textarea/Textarea',
	'components/iconText/IconText',
	'components/textLength/TextLength',
	'components/textWithLength/TextWithLength',
	'../demoCode/DemoCode',
	'text!./textHtml.txt',
	'text!./textJs.txt',
	'text!./textEvents.txt',
	'text!./textMessages.txt'
], function($, Component, Utils, ejsTpl, Text, Textarea, IconText, TextLength, TextWithLength, DemoCode, textHtml, textJs, textEvents, textMessages){

	TextTab._model = {};
	TextTab._view = {
		template: ejsTpl
	};

	TextTab._messages = {};

	function TextTab(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(TextTab, Component);

	TextTab.prototype.afterMount = function() {
		var self = this;

		new Text({
	        $el: self.find('.text'),
	        model: {
		        text: '',
		        placeholder: 'input user name'
		    }
	    });

	    new Text({
	        $el: self.find('.disabled-text'),
	        model: {
		        text: 'readonly text',
		        readonly: true
		    }
	    });

	    new IconText({
	        $el: self.find('.icon-text'),
	        model: {
	        	placeholder: 'Search...',
	        	iconClass: 'fa fa-search'
	        }
	    });

	    new TextLength({
	        $el: self.find('.text-length'),
	        model: {
	        	limitationLength: 20
	        }
	    });

	    new TextWithLength({
	        $el: self.find('.text-with-length'),
	        model: {
	        	placeholder: 'address...',
	        	limitationLength: 10
	        }
	    });

	    new Textarea({
	        $el: self.find('.text-area'),
	        model: {
	        	text: '',
		        placeholder: 'this is textarea...',
		        rows: 6
		    },
		    style: {
		    	'.C_Textarea_input': {
		    		resize: 'vertical' 
		    	}
		    }
	    });

		new DemoCode({
			$el: self.find('.demo-code'),
			model: {
				htmlCode: textHtml,
				jsCode: textJs,
				eventsCode: textEvents,
				messagesCode: textMessages
			}
			
		});
	}

	return TextTab;
});
