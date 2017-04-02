define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./TableTab.ejs',
	'components/table/tableHeader/TableHeader',
	'components/table/tableBody/TableBody',
	'../demoCode/DemoCode',
	'text!./tableHtml.txt',
	'text!./tableJs.txt',
	'text!./tableEvents.txt',
	'text!./tableMessages.txt'
], function($, Component, Utils, ejsTpl, TableHeader, TableBody, DemoCode, tableHtml, tableJs, tableEvents, tableMessages){

	TableTab._model = {};
	TableTab._view = {
		template: ejsTpl
	};

	TableTab._messages = {};

	function TableTab(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(TableTab, Component);

	TableTab.prototype.afterMount = function() {
		var self = this;

		new TableHeader({
			$el: $('.table-header'),
			model: {
				sortable: true,
				thead: ['ID', 'Name', 'Gender', 'Age']
			},

			messages: {
				'TABLE_HEADER_CLICK': self.proxy(self.tableHeaderClick_message)
			}
		});

		self.table = new TableBody({
			$el: $('.table-body'),
			model: {
				tbody: [
					['1', 'Wilber', 'Male', 23],
					['2', 'June', 'Female', 18],
					['3', 'Charles', 'Male', 26],
					['4', 'Peter', 'Male', 24],
					['5', 'Sharon', 'Female', 18],
					['6', 'Helena', 'Female', 19],
					['7', 'Harry', 'Male', 23],
					['8', 'Will', 'Male', 27]
				]
			}
		});

		new DemoCode({
			$el: self.find('.demo-code'),
			model: {
				htmlCode: tableHtml,
				jsCode: tableJs,
				eventsCode: tableEvents,
				messagesCode: tableMessages
			}
			
		});
	}

	TableTab.prototype.tableHeaderClick_message = function(columnId, order) {
		// order - 0: default; 1: desc; 2: asc;
		var self = this;

		self.table.sort(columnId, order);
	}

	return TableTab;
});
