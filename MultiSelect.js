define([
	'jquery',
	'Component',
	'Utils',
	'text!MultiSelect.ejs',
	'Options'
], function($, Component, Utils, ejsTpl, Options){

	var _data = {
		options: [],
		selected: [],

		template: ejsTpl,

		messages: {
			'SELECT_OPTION': 'selectOption_message',
			'CLICK_OUTSIDE': 'clickOutside_message'
		},

		events: {
			'click .C_MulitSelect .C_selected_area .C_selected_item i': 'removeSelectedItem_event',
			'click .C_selected_area': 'renderChildren_event'
		}
	}

	function MultiSelect(options) {
		$.extend(true, this, _data, options);		
		Component.apply(this, arguments || {});
	}

	Utils.inherit(MultiSelect, Component);


	MultiSelect.prototype.removeSelectedItem_event = function(e) {
		e.stopPropagation();

		var selectedValue = $(e.currentTarget).parent().data('value');

		var idx = -1;
		this.selected.forEach(function(item, index){
			if(item.value == selectedValue) {
				idx = index;
			}
		});
		this.selected.splice(idx, 1);

		this.mount();
	}

	MultiSelect.prototype.selectOption_message = function(selectedItem) {
		this.selected.push(selectedItem);
		this.render();
		this.mount();
	}

	MultiSelect.prototype.clickOutside_message = function() {
		this.c_options.destory();
	}

	MultiSelect.prototype.renderChildren_event = function(e) {
		e.stopPropagation();

		var self = this;

		self.c_options = new Options({
			$el: self.find('.C_MultiSelect_options'),
			options: self.options,
			msgBus: self
		})

	}
  
	return MultiSelect;
});
