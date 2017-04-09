define([
	'jquery',
	'../Component',
	'../Utils',
	'text!./CheckboxGroup.ejs'
], function($, Component, Utils, ejsTpl){

	CheckboxGroup._model = {
		options: [],
		checked: []
	};

	CheckboxGroup._view = {
		template: ejsTpl,

		events: {
			'click .C_checkbox': 'selectCheckbox_event'
		}
	};

	CheckboxGroup._messages = {
		CHECKBOXGROUP_CHANGE: 'CHECKBOXGROUP_CHANGE'
	};

	function CheckboxGroup(options) {
		if(options.options && options.options.length === 0) {
			throw new Error('options is not available');
		}
		Component.apply(this, arguments || {});
	}

	Utils.inherit(CheckboxGroup, Component);


	CheckboxGroup.prototype.selectCheckbox_event = function(e) {
		var checkboxValue = $(e.currentTarget).find('.C_Checkbox_label').data('value');

		if($(e.currentTarget).hasClass('checked')) {
			$(e.currentTarget).removeClass('checked');
			this.model.checked.splice(this.model.checked.indexOf(checkboxValue), 1);
		} else {
			$(e.currentTarget).addClass('checked');
			this.model.checked.push(checkboxValue);
		}

		this.msgBus.publish('CHECKBOXGROUP_CHANGE', self.model.checked);
	}

	CheckboxGroup.prototype.afterMount = function() {
		var self = this;

		self.find('.C_checkbox').each(function(){
			var checkboxValue = $(this).find('.C_Checkbox_label').data('value');
			if(self.model.checked.indexOf(checkboxValue) > -1) {
				$(this).addClass('checked');
			}
		})

		if(self.model.checked.length > 0) {
			this.msgBus.publish('CHECKBOXGROUP_CHANGE', self.model.checked);
		}
	}
 
	return CheckboxGroup;
});
