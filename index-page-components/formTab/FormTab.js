define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./FormTab.ejs',
	'components/form/formElement/FormElement',
	'components/form/Form',
	'../demoCode/DemoCode',
	'text!./formHtml.txt',
	'text!./formJs.txt',
	'text!./formEvents.txt',
	'text!./formMessages.txt'
], function($, Component, Utils, ejsTpl, FormElement, Form, DemoCode, formHtml, formJs, formEvents, formMessages){

	FormTab._model = {};
	FormTab._view = {
		template: ejsTpl
	};

	FormTab._messages = {};

	function FormTab(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(FormTab, Component);

	FormTab.prototype.afterMount = function() {
		var self = this;

		var formElementText = new FormElement({
	        $el: $('<div></div>'),
	        model: {
	        	required: true,
		        label: 'User name',
		        component: {
		            type: 'components/textWithLength/TextWithLength',
		            model: {
		                placeholder: 'user name...',
		                text: '',
		                limitationLength: 20
		            }
		        }
	        }
	    });
	    formElementText.mountTo($('.form-element-text'));

	    var formElementRadioboxGroup = new FormElement({
	        $el: $('.form-element-radioboxGroup'),
	        model: {
	        	required: true,
		        label: 'Gender',
		        component: {
		            type: 'components/radioboxGroup/RadioboxGroup',
		            model: {
		                checked: 1,
				        options: [{
				            label: 'Male',
				            value: '1'
				        }, {
				            label: 'Female',
				            value: '2'
				        }]
		            }
		        }
	        }
	    });


	    var textInForm = new FormElement({
	        $el: $('<div></div>'),
	        model: {
	        	required: true,
		        label: 'User name',
		        component: {
		            type: 'components/textWithLength/TextWithLength',
		            model: {
		                placeholder: 'user name...',
		                text: '',
		                limitationLength: 20
		            },
		            submitField: {
		            	key: 'name',
		            	field: 'text'
		            }
		        }
	        }
	    });
	    var checkBoxGroupInForm = new FormElement({
	        $el: $('<div></div>'),
	        model: {
	        	required: true,
		        label: 'interests',
		        component: {
		            type: 'components/checkboxGroup/CheckboxGroup',
		            model: {
		                checked: [2, 3],
		                options: [{
		                    label: 'Reading',
		                    value: '1'
		                }, {
		                    label: 'Running',
		                    value: '2'
		                }, {
		                    label: 'Swimming',
		                    value: '3'
		                }]
		            },
		            submitField: {
		            	key: 'interests',
		            	field: 'checked'
		            }
		        }
	        }
	    });

	    var form = new Form({
	        $el: $('.form'),
	        model: {
	        	formElements: [textInForm, checkBoxGroupInForm]
	        }
	    });
			

		new DemoCode({
			$el: self.find('.demo-code'),
			model: {
				htmlCode: formHtml,
				jsCode: formJs,
				eventsCode: formEvents,
				messagesCode: formMessages
			}
			
		});
	}

	return FormTab;
});
