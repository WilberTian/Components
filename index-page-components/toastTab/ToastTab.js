define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./ToastTab.ejs',
	'components/toast/Toast',
	'../demoCode/DemoCode',
	'text!./toastHtml.txt',
	'text!./toastJs.txt',
	'text!./toastEvents.txt',
	'text!./toastMessages.txt'
], function($, Component, Utils, ejsTpl, Toast, DemoCode, toastHtml, toastJs, toastEvents, toastMessages){

	ToastTab._model = {};
	ToastTab._view = {
		template: ejsTpl
	};

	ToastTab._messages = {};

	function ToastTab(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(ToastTab, Component);

	ToastTab.prototype.afterMount = function() {
		var self = this;

		$('.show-default-toast').on('click', function() {
			new Toast({
				$el: self.find('.default-toast'),
				model: {
					content: 'this is a toast message!'
				}
			});
		});

		new DemoCode({
			$el: self.find('.demo-code'),
			model: {
				htmlCode: toastHtml,
				jsCode: toastJs,
				eventsCode: toastEvents,
				messagesCode: toastMessages
			}
			
		});
	}

	return ToastTab;
});
