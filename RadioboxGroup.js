define([
	'jquery',
	'Component',
	'Utils',
	'text!RadioboxGroup.ejs'
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
		Component.apply(this, arguments || {});
		$.extend(true, this, _data, options);
	}

	Utils.inherit(RadioboxGroup, Component);


	RadioboxGroup.prototype.selectRadiobox_event = function(e) {
		$('.C_radiobox').removeClass('checked')

		this.checked = $(e.currentTarget).find('.C_Radiobox_label').data('value');
		$(e.currentTarget).addClass('checked');

	}

	RadioboxGroup.prototype.afterRender = function() {
		var self = this;

		$('.C_radiobox').each(function(){
			var radioboxValue = $(this).find('.C_Radiobox_label').data('value');
			if(self.checked === radioboxValue) {
				$(this).addClass('checked');
			}
		})
	}
 
	return RadioboxGroup;
});
