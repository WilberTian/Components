define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./StepperTab.ejs',
	'components/stepper/Stepper',
	'../demoCode/DemoCode',
	'text!./stepperHtml.txt',
	'text!./stepperJs.txt',
	'text!./stepperEvents.txt',
	'text!./stepperMessages.txt'
], function($, Component, Utils, ejsTpl, Stepper, DemoCode, stepperHtml, stepperJs, stepperEvents, stepperMessages){

	StepperTab._model = {};
	StepperTab._view = {
		template: ejsTpl
	};

	StepperTab._messages = {};

	function StepperTab(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(StepperTab, Component);

	StepperTab.prototype.afterMount = function() {
		var self = this;

		new Stepper({
			$el: self.find('.stepper'),
			model: {
				number: 10
			}
		});

		new DemoCode({
			$el: self.find('.demo-code'),
			model: {
				htmlCode: stepperHtml,
				jsCode: stepperJs,
				eventsCode: stepperEvents,
				messagesCode: stepperMessages
			}
			
		});
	}

	return StepperTab;
});
