define([
	'jquery',
	'Component',
	'Utils',
	'text!Pagination.ejs'
], function($, Component, Utils, ejsTpl){

	var _data = {
		currentPage: 1,
		totalPages: 1,

		template: ejsTpl,

		events: {
			'click .C_Pagination_prev': 'prevPage_event',
			'click .C_Pagination_next': 'nextPage_event',
			'click .C_Pagination_item': 'changePage_event'
		}
	}

	function Pagination(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Pagination, Component);
	
	Pagination.prototype.prevPage_event = function(e) {
		var currentPage = this.currentPage;

		if(currentPage > 1) {
			this.updateData({
				currentPage: currentPage - 1
			})
		}

		this.msgBus.publish('PAGINATION_CHANGE_PAGE', this.currentPage);
	}

	Pagination.prototype.nextPage_event = function(e) {
		var currentPage = this.currentPage;

		if(currentPage < this.totalPages) {
			this.updateData({
				currentPage: currentPage + 1
			})
		}

		this.msgBus.publish('PAGINATION_CHANGE_PAGE', this.currentPage);
	}

	Pagination.prototype.changePage_event = function(e) {
		var changePageTo = parseInt($(e.currentTarget).text(), 10);

		if(changePageTo !== this.currentPage) {
			this.updateData({
				currentPage: changePageTo
			})

			this.msgBus.publish('PAGINATION_CHANGE_PAGE', this.currentPage);
		}
	}
 
	return Pagination;
});
