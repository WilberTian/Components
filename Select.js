define([
	'jquery',
	'Component',
	'Utils',
	'text!Select.ejs',
	'Options'
], function($, Component, Utils, ejsTpl, Options){

	var _data = {
		options: [],
		selected: {
			label: '未选择',
			value: -100
		},
		
		template: ejsTpl,

		messages: {
			'SELECT_OPTION': 'selectOption_message'
		},

		events: {
			'click .C_Select_selected': 'onSelectClick_event'
		}
	};

	function Select(options) {
		Component.call(this, options || {});
		$.extend(true, this, _data, options);
	}
	Utils.inherit(Select, Component);

	Select.prototype.afterRender = function() {
		var self = this;

		self.c_options = new Options({
			$el: self.find('.C_Select_options'),
			options: self.options,
			ref: self
		})

		self.c_options.render()
	}

	Select.prototype.onSelectClick_event = function(e) {
		this.find('.C_Select_options').toggle();
		e.stopPropagation();
	}

	Select.prototype.selectOption_message = function(selectedItem) {
		this.selected = selectedItem;
		this.find('.C_Select_selected').text(this.selected.label);
		this.find('.C_Select_options').toggle();

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