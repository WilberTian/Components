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

		if(sortFn) {
			self.model.tbody.sort(sortFn);
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

			sortFn && self.model.tbody.sort(sortFn);
		}

		self.updateModel({
			tbody: self.model.tbody
		});
	}	

	return TableBody;
});
