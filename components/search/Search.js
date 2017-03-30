define([
	'jquery',
	'../Component',
	'../Utils',
	'text!./Search.ejs',
	'../iconText/IconText',
	'../options/Options'
], function($, Component, Utils, ejsTpl, IconText, Options) {
	var _data = {
		url: null,
		options: [],
		selected: {},

		template: ejsTpl,

		events: {
			'click .C_Search': 'clickSearch_event'
		}
	}

	function Search(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}
	Utils.inherit(Search, Component);

	Search.prototype.afterMount = function() {
		var self = this;

		self.c_iconText = new IconText({
			$el: self.find('.C_Search_Text'),
			text: self.selected.label || '',
			iconClass: 'fa fa-search',
			messages: {
				'TEXT_FOCUS': self.proxy(self.focusSearch_message),
				'TEXT_KEYUP': self.proxy(self.searchKeyup_message)
			}
		});

		self.c_options = new Options({
			$el: self.find('.C_Search_options'),
			options: self.options,
			messages: {
				'SELECT_OPTION': self.proxy(self.selectOption_message),
				'CLICK_OUTSIDE': self.proxy(self.clickOutside_message)
			}
		})
	}

	Search.prototype.clickSearch_event = function(e) {
		e.stopPropagation();
	}

	Search.prototype.focusSearch_message = function(e, guid, text) {
		var searchValue = $(e.currentTarget).val().trim();
		if(searchValue !== '' && searchValue !== this.selected.label) {
			this.selected.label = $(e.currentTarget).val();
			this.loadData();
		}

		if(this.c_options) {
			this.c_options.show();
		}
	}

	Search.prototype.searchKeyup_message = function(e, text) {
		this.selected.label = $(e.currentTarget).val();
		this.loadData();
	}

	Search.prototype.selectOption_message = function(e, guid, selectedItem){
		this.selected = selectedItem;
		this.c_iconText.updateData({
			text: this.selected.label
		});

		this.c_options.hide();
	}

	Search.prototype.clickOutside_message = function(e, guid, selectedItem){
		this.c_options.hide();
	}

	Search.prototype.loadData = function() {
		var self = this;

		$.get(self.url, {}, function(data) {
			self.options = data.msg.options;
			
			self.c_options.updateData({
				options: self.options
			})

			self.c_options.show();
		}, 'json');
	}

	return Search;

});