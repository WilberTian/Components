define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./ToastrTab.ejs',
	'components/toastr/Toastr',
	'../demoCode/DemoCode',
	'text!./toastrHtml.txt',
	'text!./toastrJs.txt',
	'text!./toastrEvents.txt',
	'text!./toastrMessages.txt'
], function($, Component, Utils, ejsTpl, Toastr, DemoCode, toastrHtml, toastrJs, toastrEvents, toastrMessages){

	ToastrTab._model = {};
	ToastrTab._view = {
		template: ejsTpl
	};

	ToastrTab._messages = {};

	function ToastrTab(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(ToastrTab, Component);

	ToastrTab.prototype.afterMount = function() {
		var self = this;

		$('.show-default-toastr').on('click', function() {
			new Toastr({
				$el: self.find('.default-toastr'),
				model: {
					content: 'this is a toastr message!'
				}
			});
		});

		new DemoCode({
			$el: self.find('.demo-code'),
			model: {
				htmlCode: toastrHtml,
				jsCode: toastrJs,
				eventsCode: toastrEvents,
				messagesCode: toastrMessages
			}
			
		});
	}

	return ToastrTab;
});
