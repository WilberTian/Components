define([
	'jquery',
	'Component',
	'Utils',
	'text!Search.ejs',
	'Text',
	'Options'
], function($, Component, Utils, ejsTpl, Text, Options) {
	var _data = {
		url: null,
		options: [],
		selected: {},

		template: ejsTpl,

		messages: {
			'SELECT_OPTION': 'selectOption_message',
			'CLICK_OUTSIDE': 'clickOutside_message'
		},

		events: {
			'keyup .C_Search_input': 'searchKeyup_event',
			'click .C_Search_input': 'searchClick_event'
		}
	}

	function Search(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}
	Utils.inherit(Search, Component);


	Search.prototype.searchClick_event = function(e) {
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

	Search.prototype.searchKeyup_event = function(e) {
		this.selected.label = $(e.currentTarget).val();
		this.loadData();
	}

	Search.prototype.selectOption_message = function(selectedItem){
		this.selected = selectedItem;
		this.find('.C_Search_input').val(this.selected.label);
		this.c_options.hide();
	}

	Search.prototype.clickOutside_message = function(selectedItem){
		this.c_options.hide();
	}

	Search.prototype.loadData = function() {
		var self = this;

		$.get(self.url, {}, function(data) {
			self.options = data.msg.options;
			
			if(self.c_options) {
				self.c_options.destory();
			}

			self.c_options = new Options({
				$el: self.$el.find('.C_Search_options'),
				options: self.options,
				msgBus: self
			})

		}, 'json');
	}

	return Search;

});