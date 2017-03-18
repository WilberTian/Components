define([
	'jquery',
	'Component',
	'Utils',
	'text!Search.ejs',
	'IconText',
	'Options'
], function($, Component, Utils, ejsTpl, IconText, Options) {
	var _data = {
		url: null,
		options: [],
		selected: {},

		template: ejsTpl,

		messages: {
			'TEXT_CLICK': 'clickSearch_message',
			'TEXT_KEY_UP': 'searchKeyup_message',
			'SELECT_OPTION': 'selectOption_message',
			'CLICK_OUTSIDE': 'clickOutside_message'
		},

		events: {
			
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
			msgBus: self.msgBus,
			iconClass: 'fa fa-search'
		});

		self.c_options = new Options({
			$el: self.find('.C_Search_options'),
			options: self.options,
			msgBus: self.msgBus
		})
	}

	Search.prototype.clickSearch_message = function(e, text) {
		var searchValue = $(e.currentTarget).val().trim();
		if(searchValue !== '' && searchValue !== this.selected.label) {
			this.selected.label = $(e.currentTarget).val();
			this.loadData();
		}

		if(this.c_options) {
			this.c_options.show();
		}

		e.stopPropagation();
	}

	Search.prototype.searchKeyup_message = function(e, text) {
		this.selected.label = $(e.currentTarget).val();
		this.loadData();
	}

	Search.prototype.selectOption_message = function(selectedItem){
		this.selected = selectedItem;
		this.c_iconText.updateData({
			text: this.selected.label
		});

		this.c_options.hide();
	}

	Search.prototype.clickOutside_message = function(selectedItem){
		this.c_options.hide();
	}

	Search.prototype.loadData = function() {
		var self = this;

		$.get(self.url, {}, function(data) {
			self.options = data.msg.options;
			
			self.c_options.updateData({
				options: self.options
			})

		}, 'json');
	}

	return Search;

});