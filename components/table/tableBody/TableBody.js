define([
	'jquery',
	'../../Component',
	'../../Utils',
	'text!./TableBody.ejs'
], function($, Component, Utils, ejsTpl){
	TableBody._model = {
		tbody: []
	};

	TableBody._view = {
		template: ejsTpl
	};

	TableBody._messages = {};

	function TableBody(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(TableBody, Component);

	TableBody.prototype.afterMount = function() {
	}

	TableBody.prototype.sort = function(colunmId, order, sortFn) {
		// 0: default; 1: desc; 2: asc;
		var self = this;
		var dataToSort = self.model.tbody.slice();

		if(sortFn) {
			dataToSort.sort(sortFn);
		} else {
			var sortFn;

			switch(order) {
				case 1:
					sortFn = function(a, b) { return a[colunmId] < b[colunmId]; };
					break;
				case 2:
					sortFn = function(a, b) { return a[colunmId] > b[colunmId]; };
					break;
				default:
					sortFn = null;
			}

			sortFn && dataToSort.sort(sortFn);
		}

		self.updateModel({
			tbody: dataToSort
		});
	}	

	return TableBody;
});
