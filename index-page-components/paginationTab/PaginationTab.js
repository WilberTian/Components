define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./PaginationTab.ejs',
	'components/pagination/Pagination',
	'../demoCode/DemoCode',
	'text!./paginationHtml.txt',
	'text!./paginationJs.txt',
	'text!./paginationEvents.txt',
	'text!./paginationMessages.txt'
], function($, Component, Utils, ejsTpl, Pagination, DemoCode, paginationHtml, paginationJs, paginationEvents, paginationMessages){

	PaginationTab._model = {};
	PaginationTab._view = {
		template: ejsTpl
	};

	PaginationTab._messages = {};

	function PaginationTab(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(PaginationTab, Component);

	PaginationTab.prototype.afterMount = function() {
		var self = this;

		new Pagination({
			$el: self.find('.default-pagination'),
			model: {
				totalPages: 10
			}
		});

		new DemoCode({
			$el: self.find('.demo-code'),
			model: {
				htmlCode: paginationHtml,
				jsCode: paginationJs,
				eventsCode: paginationEvents,
				messagesCode: paginationMessages
			}
			
		});
	}

	return PaginationTab;
});
