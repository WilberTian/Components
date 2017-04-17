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
	
	RadioboxGroup._messages = {
		RADIOBOXGROUP_CHANGE: 'RADIOBOXGROUP_CHANGE'
	};
	
	function RadioboxGroup(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(RadioboxGroup, Component);


	RadioboxGroup.prototype.selectRadiobox_event = function(e) {
		var self = this;

		this.updateModel({
			checked: $(e.currentTarget).find('.C_Radiobox_label').data('value')
		});

		this.msgBus.publish('RADIOBOXGROUP_CHANGE', self.model.checked);
	}

	RadioboxGroup.prototype.afterMount = function() {
		var self = this;

		self.find('.C_radiobox').each(function(){
			var radioboxValue = $(this).find('.C_Radiobox_label').data('value');
			if(self.model.checked === radioboxValue) {
				$(this).addClass('checked');
			}
		})

		if(self.model.checked > 0) {
			this.msgBus.publish('RADIOBOXGROUP_CHANGE', self.model.checked);
		}
	}
 
	return RadioboxGroup;
});
