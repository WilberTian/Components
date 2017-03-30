define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./ButtonTab.ejs',
	'components/button/Button',
	'components/iconButton/IconButton',
	'../demoCode/DemoCode',
	'text!./buttonHtml.txt',
	'text!./buttonJs.txt',
	'text!./buttonEvents.txt',
	'text!./buttonMessages.txt'
], function($, Component, Utils, ejsTpl, Button, IconButton, DemoCode, buttonHtml, buttonJs, buttonEvents, buttonMessages){

	var _data = {
		template: ejsTpl,
	}

	function ButtonTab(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}

	Utils.inherit(ButtonTab, Component);

	ButtonTab.prototype.afterMount = function() {
		var self = this;

		new Button({
	        $el: self.find('.submit-button'),
	        text: 'Submit'
	    });

	    new Button({
	        $el: self.find('.cancel-button'),
	        text: 'Cancel'
	    });

	    new IconButton({
	        $el: self.find('.icon-button'),
	        text: 'Setting',
	        iconClass: 'fa fa-cog'
	    });

    	new IconButton({
	        $el: self.find('.icon-only-button'),
	        iconClass: 'fa fa-cog'
	    });

		new DemoCode({
			$el: self.find('.demo-code'),
			htmlCode: buttonHtml,
			jsCode: buttonJs,
			eventsCode: buttonEvents,
			messagesCode: buttonMessages
		});
	}

	return ButtonTab;
});