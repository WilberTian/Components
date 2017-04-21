define([
	'jquery',
	'../Component',
	'../Utils',
	'text!./MultiSelect.ejs',
	'../options/Options'
], function($, Component, Utils, ejsTpl, Options){

	MultiSelect._model = {
		options: [],
		selected: []
	};

	MultiSelect._view = {
		template: ejsTpl,

		events: {
			'click .C_MulitSelect .C_selected_area .C_selected_item .delete-item-icon': 'removeSelectedItem_event',
			'click .C_MulitSelect .C_selected_area .C_selected_item': 'stopPropagation_event',
			'click .C_selected_area': 'renderChildren_event'
		}
	};

	MultiSelect._messages = {};

	function MultiSelect(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(MultiSelect, Component);


	MultiSelect.prototype.removeSelectedItem_event = function(e) {
		e.stopPropagation();

		var selectedValue = $(e.currentTarget).parent().data('value');

		var selected = this.model.selected.slice();

		var idx = -1;
		this.model.selected.forEach(function(item, index){
			if(item.value == selectedValue) {
				idx = index;
			}
		});
		selected.splice(idx, 1);

		this.updateModel({
			selected: selected
		});
	}

	MultiSelect.prototype.renderChildren_event = function(e) {
		e.stopPropagation();

		var self = this;

		self.c_options = new Options({
			$el: self.find('.C_MultiSelect_options'),
			model: {
				options: self.model.options,
			},
			
			messages: {
				'OPTIONS_SELECT': self.proxy(self.selectOption_message),
				'CLICK_OUTSIDE': self.proxy(self.clickOutside_message)
			}
		})

	}

	MultiSelect.prototype.selectOption_message = function(e, guid, selectedItem) {
		var selected = this.model.selected.slice();
		
		selected.push(selectedItem);

		this.updateModel({
			selected: selected
		});
	}

	MultiSelect.prototype.clickOutside_message = function() {
		this.c_options.destory();
	}
  
	return MultiSelect;
});
