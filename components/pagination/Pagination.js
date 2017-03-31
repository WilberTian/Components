define([
	'jquery',
	'../Component',
	'../Utils',
	'text!./Pagination.ejs',
	'../text/Text',
	'../button/Button'
], function($, Component, Utils, ejsTpl, Text, Button){
	Pagination._model = {
		currentPage: 1,
		totalPages: 1
	};

	Pagination._view = {
		template: ejsTpl,

		events: {
			'click .C_Pagination_prev': 'prevPage_event',
			'click .C_Pagination_next': 'nextPage_event',
			'click .C_Pagination_item': 'changePage_event'
		}
	};

	Pagination._messages = {};

	function Pagination(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(Pagination, Component);

	Pagination.prototype.afterMount = function() {
		var self = this;

		self.c_text = new Text({
			$el: self.find('.C_Pagination_goto_text'),
			model: {
				text: '',
	        	placeholder: 'goto...'
			},
			
	        messages: {
				'TEXT_KEYUP': self.proxy(self.changeGotoNum_message)
			}
		});

		self.c_button = new Button({
			$el: self.find('.C_Pagination_goto_button'),
			model: {
				iconClass: 'fa fa-arrow-circle-right',
				disabled: true
			},
			
			messages: {
				'BUTTON_CLICK': self.proxy(self.clickGoto_message)
			}
		});
	}
	
	Pagination.prototype.prevPage_event = function(e) {
		var currentPage = this.model.currentPage;

		if(currentPage > 1) {
			this.updateModel({
				currentPage: currentPage - 1
			})
		}

		this.msgBus.publish('PAGINATION_CHANGE_PAGE', this.model.currentPage);
	}

	Pagination.prototype.nextPage_event = function(e) {
		var currentPage = this.model.currentPage;

		if(currentPage < this.model.totalPages) {
			this.updateModel({
				currentPage: currentPage + 1
			})
		}

		this.msgBus.publish('PAGINATION_CHANGE_PAGE', this.model.currentPage);
	}

	Pagination.prototype.changePage_event = function(e) {
		var changePageTo = parseInt($(e.currentTarget).text(), 10);

		if(changePageTo !== this.model.currentPage) {
			this.updateModel({
				currentPage: changePageTo
			})

			this.msgBus.publish('PAGINATION_CHANGE_PAGE', this.model.currentPage);
		}
	}

	Pagination.prototype.changeGotoNum_message = function(e, guid, text) {
		var self = this;

		var pattern=/^0|[1-9][0-9]*$/;

		this.c_button.updateModel({
			disabled: !(pattern.test(text) && (parseInt(text, 10) <= self.model.totalPages))
		});
	}

	Pagination.prototype.clickGoto_message = function() {
		var self = this;

		var gotoPage = parseInt(self.c_text.text);

		if(gotoPage !== this.model.currentPage) {
			this.updateModel({
				currentPage: gotoPage
			})

			this.msgBus.publish('PAGINATION_CHANGE_PAGE', this.model.currentPage);
		}
	}
 
	return Pagination;
});
