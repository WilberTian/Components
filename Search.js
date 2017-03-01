define([
	'jquery',
	'Component',
	'Utils',
	'text!Search.ejs',
	'Options'
], function($, Component, Utils, ejsTpl, Options) {
	var _data = {
		url: null,
		options: [],
		selected: {},

		template: ejsTpl,

		messages: {
			'SELECT_OPTION': 'selectOption_message'
		},

		events: {
			'keyup .C_Search_input': 'searchKeyup_event',
			'click .C_Search_input': 'searchClick_event'
		}
	}

	function Search(options) {
		Component.apply(this, arguments || {});
		$.extend(true, this, _data, options);
	}
	Utils.inherit(Search, Component);


	Search.prototype.searchClick_event = function(e) {

		if($(e.currentTarget).val().trim() !== '') {
			this.selected.label = $(e.currentTarget).val();
			this.loadData();
		}
		this.find('.C_Search_options').show();

		e.stopPropagation();
	}

	Search.prototype.searchKeyup_event = function(e) {
		this.selected.label = $(e.currentTarget).val();
		this.loadData();
	}

	Search.prototype.selectOption_message = function(selectedItem){
		this.selected = selectedItem;
		this.find('.C_Search_input').val(this.selected.label);
		this.find('.C_Search_options').hide();
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
				ref: self
			})
			self.c_options.render();

		}, 'json');
	}


	return Search;

});