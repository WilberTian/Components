define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./TodoForm.ejs',
	'components/form/Form',
	'components/form/formElement/FormElement'
], function($, Component, Utils, ejsTpl, Form, FormElement){

	TodoForm._model = {
		name: '',
		status: true
	};

	TodoForm._view = {
		template: ejsTpl
	};

	TodoForm._messages = {};

	function TodoForm(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(TodoForm, Component);

	TodoForm.prototype.afterMount = function() {
		var self = this;

		var textInForm = new FormElement({
	        $el: $('<div></div>'),
	        model: {
	        	required: true,
		        label: 'Todo',
		        component: {
		            type: 'components/textWithLength/TextWithLength',
		            model: {
		                placeholder: 'todo name...',
		                text: self.model.name,
		                limitationLength: 50
		            },
		            submitField: {
		            	key: 'name',
		            	field: 'text'
		            }
		        }
	        }
	    });

	    var radioboxGroupInForm = new FormElement({
	        $el: $('<div></div>'),
	        model: {
	        	required: true,
		        label: 'status',
		        component: {
		            type: 'components/radioboxGroup/RadioboxGroup',
		            model: {
		                checked: self.model.status,
		                options: [{
		                    label: 'todo',
		                    value: true
		                }, {
		                    label: 'completed',
		                    value: false
		                }]
		            },
		            submitField: {
		            	key: 'status',
		            	field: 'checked'
		            }
		        }
	        }
	    });

	    self.form = new Form({
	        $el: self.find('.todoform'),
	        model: {
	        	formElements: [textInForm, radioboxGroupInForm]
	        },
	        style: {
	        	'.C_FormElement_label': {
	        		width: '80px'
	        	}
	        }
	    });
	}

	TodoForm.prototype.getSubmitData = function() {
		return this.form.getSubmitData();
	}

	return TodoForm;
});
