define([
	'jquery',
	'../../Component',
	'../../Utils',
	'text!./TableHeader.ejs'
], function($, Component, Utils, ejsTpl){
	TableHeader._model = {
		thead: [],
		sortable: false
	};

	TableHeader._view = {
		template: ejsTpl,

		events: {
			'click .C_TableHeader_th': 'tableSort_event'
		}
	};

	TableHeader._messages = {
		TABLE_SORT: 'TABLE_SORT'
	};

	function TableHeader(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(TableHeader, Component);

	TableHeader.prototype.afterMount = function() {

	}

	TableHeader.prototype.tableSort_event = function(e) {
		var columnId = $(e.currentTarget).data('col');

		if(sortable) this.msgBus.publish('TABLE_SORT', columnId);
	}

	return TableHeader;
});
