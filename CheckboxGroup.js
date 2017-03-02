define([
	'jquery',
	'Component',
	'Utils',
	'text!CheckboxGroup.ejs'
], function($, Component, Utils, ejsTpl){

	var _data = {
		options: [],
		checked: [],

		template: ejsTpl,

		events: {
			'click .C_checkbox': 'selectCheckbox_event'
		}
	}

	function CheckboxGroup(options) {
		Component.apply(this, arguments || {});
		$.extend(true, this, _data, options);
	}

	Utils.inherit(CheckboxGroup, Component);


	CheckboxGroup.prototype.selectCheckbox_event = function(e) {
		var checkboxValue = $(e.currentTarget).find('.C_Checkbox_label').data('value');

		if($(e.currentTarget).hasClass('checked')) {
			$(e.currentTarget).removeClass('checked');
			this.checked.splice(this.checked.indexOf(checkboxValue), 1);
		} else {
			$(e.currentTarget).addClass('checked');
			this.checked.push(checkboxValue);
		}
	}

	CheckboxGroup.prototype.afterRender = function() {
		var self = this;

		$('.C_checkbox').each(function(){
			var checkboxValue = $(this).find('.C_Checkbox_label').data('value');
			if(self.checked.indexOf(checkboxValue) > -1) {
				$(this).addClass('checked');
			}
		})
	}
 
	return CheckboxGroup;
});
