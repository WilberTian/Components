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
				thead: ['ID', 'Name', 'Gender', 'Age']
			}
		});

		new TableBody({
			$el: $('.table-body'),
			model: {
				tbody: [
					['1', 'Wilber', 'Male', '23'],
					['2', 'Wilber', 'Male', '23'],
					['3', 'Wilber', 'Male', '23'],
					['4', 'Wilber', 'Male', '23'],
					['5', 'Wilber', 'Male', '23'],
					['6', 'Wilber', 'Male', '23'],
					['7', 'Wilber', 'Male', '23'],
					['8', 'Wilber', 'Male', '23']
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

	return TableTab;
});
