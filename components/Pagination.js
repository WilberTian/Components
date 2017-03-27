define([
	'jquery',
	'Component',
	'Utils',
	'text!Pagination.ejs',
	'Text',
	'IconButton'
], function($, Component, Utils, ejsTpl, Text, IconButton){

	var _data = {
		currentPage: 1,
		totalPages: 1,

		template: ejsTpl,

		events: {
			'click .C_Pagination_prev': 'prevPage_event',
			'click .C_Pagination_next': 'nextPage_event',
			'click .C_Pagination_item': 'changePage_event'
		},

		messages: {
			'TEXT_KEYUP': 'changeGotoNum_message',
			'BUTTON_CLICK': 'clickGoto_message'
		}
	}

	function Pagination(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Pagination, Component);

	Pagination.prototype.afterMount = function() {
		var self = this;

		self.c_text = new Text({
			$el: self.find('.C_Pagination_goto_text'),
			text: '',
	        placeholder: 'goto...',
	        msgBus: self
		});

		self.c_button = new IconButton({
			$el: self.find('.C_Pagination_goto_button'),
			iconClass: 'fa fa-arrow-circle-right',
			disabled: true,
			msgBus: self
		});
	}
	
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

	Pagination.prototype.changeGotoNum_message = function(e, guid, text) {
		var self = this;

		var pattern=/^0|[1-9][0-9]*$/;

		this.c_button.updateData({
			disabled: !(pattern.test(text) && (parseInt(text, 10) <= self.totalPages))
		});
	}

	Pagination.prototype.clickGoto_message = function() {
		var self = this;

		var gotoPage = parseInt(self.c_text.text);

		if(gotoPage !== this.currentPage) {
			this.updateData({
				currentPage: gotoPage
			})

			this.msgBus.publish('PAGINATION_CHANGE_PAGE', this.currentPage);
		}
	}
 
	return Pagination;
});
