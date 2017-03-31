define([
	'jquery',
	'../Component',
	'../Utils',
	'text!./Search.ejs',
	'../iconText/IconText',
	'../options/Options'
], function($, Component, Utils, ejsTpl, IconText, Options) {

	Search._model = {
		url: null,
		options: [],
		selected: {}
	};

	Search._view = {
		template: ejsTpl,

		events: {
			'click .C_Search': 'clickSearch_event'
		}
	};
	
	Search._messages = {};

	function Search(options) {
		Component.apply(this, arguments || {});
	}
	Utils.inherit(Search, Component);

	Search.prototype.afterMount = function() {
		var self = this;

		self.c_iconText = new IconText({
			$el: self.find('.C_Search_Text'),
			model: {
				text: self.model.selected.label || '',
				iconClass: 'fa fa-search'
			},
			
			messages: {
				'TEXT_FOCUS': self.proxy(self.focusSearch_message),
				'TEXT_KEYUP': self.proxy(self.searchKeyup_message)
			}
		});

		self.c_options = new Options({
			$el: self.find('.C_Search_options'),
			model: {
				options: self.model.options
			},
			messages: {
				'OPTIONS_SELECT': self.proxy(self.selectOption_message),
				'CLICK_OUTSIDE': self.proxy(self.clickOutside_message)
			}
		})
	}

	Search.prototype.clickSearch_event = function(e) {
		e.stopPropagation();
	}

	Search.prototype.focusSearch_message = function(e, guid, text) {
		var searchValue = $(e.currentTarget).val().trim();
		if(searchValue !== '' && searchValue !== this.model.selected.label) {
			this.model.selected.label = $(e.currentTarget).val();
			this.loadData();
		}

		if(this.c_options) {
			this.c_options.show();
		}
	}

	Search.prototype.searchKeyup_message = function(e, text) {
		this.model.selected.label = $(e.currentTarget).val();
		this.loadData();
	}

	Search.prototype.selectOption_message = function(e, guid, selectedItem){
		this.model.selected = selectedItem;
		this.c_iconText.updateModel({
			text: this.model.selected.label
		});

		this.c_options.hide();
	}

	Search.prototype.clickOutside_message = function(e, guid, selectedItem){
		this.c_options.hide();
	}

	Search.prototype.loadData = function() {
		var self = this;

		$.get(self.model.url, {}, function(data) {
			self.model.options = data.msg.options;
			
			self.c_options.updateModel({
				options: self.model.options
			})

			self.c_options.show();
		}, 'json');
	}

	return Search;

});