define([
	'jquery',
	'../../Component',
	'../../Utils',
	'text!./TableHeader.ejs',
	'../../icon/Icon'
], function($, Component, Utils, ejsTpl, Icon){
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
		TABLE_HEADER_CLICK: 'TABLE_HEADER_CLICK'
	};

	function TableHeader(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(TableHeader, Component);

	TableHeader.prototype.afterMount = function() {
		var self = this;

		if(!self.c_icons) self.c_icons = [];

		if(self.model.sortable) {
			self.model.thead.forEach(function(th, idx){
				self.c_icons.push(new Icon({
					$el: self.find('.sortable-icon-' + idx),
					model: {
						iconClass: 'fa fa-sort'
					}
				}));
			});
		}
	}

	TableHeader.prototype.tableSort_event = function(e) {
		var self = this;

		var $thElement = $(e.currentTarget);
		var columnId = $thElement.data('col');

		if (self._previousColumnId !== void(0)) {
			if(self._previousColumnId !== columnId) {
				self.c_icons[self._previousColumnId].updateModel({
					iconClass: 'fa fa-sort'
				});
			}
		}
		self._previousColumnId = columnId;

		
		var $iconElement = $thElement.find('.sortable-icon-' + columnId + ' i');
		var order = -1; // 0: default; 1: desc; 2: asc;

		if ($iconElement.hasClass('fa-sort')) {
			order = 1;
			self.c_icons[columnId].updateModel({
				iconClass: 'fa fa-sort-desc'
			});
		} else if ($iconElement.hasClass('fa-sort-desc')) {
			order = 2;
			self.c_icons[columnId].updateModel({
				iconClass: 'fa fa-sort-asc'
			});
		} else if ($iconElement.hasClass('fa-sort-asc')) {
			order = 1;
			self.c_icons[columnId].updateModel({
				iconClass: 'fa fa-sort-desc'
			});
		}

		if(self.model.sortable) this.msgBus.publish('TABLE_HEADER_CLICK', columnId, order);
	}

	return TableHeader;
});
