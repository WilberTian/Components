define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./TextTab.ejs',
	'components/text/Text',
	'components/iconText/IconText',
	'components/textLength/TextLength',
	'components/textWithLength/TextWithLength',
	'../demoCode/DemoCode',
	'text!./textHtml.txt',
	'text!./textJs.txt',
	'text!./textEvents.txt',
	'text!./textMessages.txt'
], function($, Component, Utils, ejsTpl, Text, IconText, TextLength, TextWithLength, DemoCode, textHtml, textJs, textEvents, textMessages){

	var _data = {
		template: ejsTpl,
	}

	function TextTab(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}

	Utils.inherit(TextTab, Component);

	TextTab.prototype.afterMount = function() {
		var self = this;

		new Text({
	        $el: self.find('.text'),
	        text: '',
	        placeholder: 'input user name'
	    });

	    new IconText({
	        $el: self.find('.icon-text'),
	        placeholder: 'Search...',
	        iconClass: 'fa fa-search'
	    });

	    new TextLength({
	        $el: self.find('.text-length'),
	        limitationLength: 20
	    });

	    new TextWithLength({
	        $el: self.find('.text-with-length'),
	        placeholder: 'address...',
	        limitationLength: 10
	    });

		new DemoCode({
			$el: self.find('.demo-code'),
			htmlCode: textHtml,
			jsCode: textJs,
			eventsCode: textEvents,
			messagesCode: textMessages
		});
	}

	return TextTab;
});
