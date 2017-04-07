define([
	'jquery',
	'../Component',
	'../Utils',
	'text!./Select.ejs',
	'../iconText/IconText',
	'../options/Options'
], function($, Component, Utils, ejsTpl, IconText, Options){

	Select._model = {
		options: [],
		selected: {
			label: '未选择',
			value: -100
		}
	};

	Select._view = {
		template: ejsTpl
	};

	Select._messages = {};

	function Select(options) {
		Component.apply(this, arguments || {});
	}
	Utils.inherit(Select, Component);

	Select.prototype.afterMount = function() {
		var self = this;

		self.c_iconText = new IconText({
			$el: self.find('.C_Select_Text'),
			model: {
				text: self.model.selected.label,
				readonly: true,
				iconClass: 'fa fa-chevron-down'
			},
			
			messages: {
				'TEXT_CLICK': self.proxy(self.clickSelect_message)
			}
		});

		self.c_options = new Options({
			$el: self.find('.C_Select_options'),
			model: {
				options: self.model.options
			},
			
			messages: {
				'OPTIONS_SELECT': self.proxy(self.selectOption_message),
				'CLICK_OUTSIDE': self.proxy(self.clickOutside_message)
			}
		})
	}

	Select.prototype.clickSelect_message = function(e, text) {
		e.stopPropagation();
		this.c_options.show();
	}

	Select.prototype.clickOutside_message = function() {
		this.c_options.hide();
	}

	Select.prototype.selectOption_message = function(e, guid, selectedItem) {
		this.model.selected = selectedItem;
		this.c_iconText.updateModel({
			text: this.model.selected.label
		})

		this.c_options.hide();

	}

	return Select;
});


/*
var initMonthSelector = function () {
    $('.js-select-month').on('click', function () {
        var selectedMonth = $('.js-select-month').text().trim();

        $('.hornet-select .option')
            .each(function () {
                if ($(this).text() === selectedMonth) {
                    // get the offset of the current selected month and auto scroll to the selected month
                    var offsetTop = $(this).position().top;
                    $('.hornet-select').scrollTop(offsetTop);
                    return false;
                }
            });
    });
};
*/