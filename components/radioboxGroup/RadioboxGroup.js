define([
	'jquery',
	'../Component',
	'../Utils',
	'text!./RadioboxGroup.ejs'
], function($, Component, Utils, ejsTpl){

	RadioboxGroup._model = {
		options: [],
		checked: -1
	};

	RadioboxGroup._view = {
		template: ejsTpl,

		events: {
			'click .C_radiobox': 'selectRadiobox_event'
		}
	};
	
	RadioboxGroup._messages = {};
	
	function RadioboxGroup(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(RadioboxGroup, Component);


	RadioboxGroup.prototype.selectRadiobox_event = function(e) {
		var self = this;

		self.find('.C_radiobox').removeClass('checked')

		this.model.checked = $(e.currentTarget).find('.C_Radiobox_label').data('value');
		$(e.currentTarget).addClass('checked');

	}

	RadioboxGroup.prototype.afterMount = function() {
		var self = this;

		self.find('.C_radiobox').each(function(){
			var radioboxValue = $(this).find('.C_Radiobox_label').data('value');
			if(self.model.checked === radioboxValue) {
				$(this).addClass('checked');
			}
		})
	}
 
	return RadioboxGroup;
});
