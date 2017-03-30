define([
	'jquery',
	'../Component',
	'../Utils',
	'text!./RadioboxGroup.ejs'
], function($, Component, Utils, ejsTpl){

	var _data = {
		options: [],
		checked: -1,

		template: ejsTpl,

		events: {
			'click .C_radiobox': 'selectRadiobox_event'
		}
	}

	function RadioboxGroup(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}

	Utils.inherit(RadioboxGroup, Component);


	RadioboxGroup.prototype.selectRadiobox_event = function(e) {
		var self = this;

		self.find('.C_radiobox').removeClass('checked')

		this.checked = $(e.currentTarget).find('.C_Radiobox_label').data('value');
		$(e.currentTarget).addClass('checked');

	}

	RadioboxGroup.prototype.afterMount = function() {
		var self = this;

		self.find('.C_radiobox').each(function(){
			var radioboxValue = $(this).find('.C_Radiobox_label').data('value');
			if(self.checked === radioboxValue) {
				$(this).addClass('checked');
			}
		})
	}
 
	return RadioboxGroup;
});