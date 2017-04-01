define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./ModalTab.ejs',
	'components/modal/Modal',
	'../demoCode/DemoCode',
	'text!./modalHtml.txt',
	'text!./modalJs.txt',
	'text!./modalEvents.txt',
	'text!./modalMessages.txt'
], function($, Component, Utils, ejsTpl, Modal, DemoCode, modalHtml, modalJs, modalEvents, modalMessages){

	ModalTab._model = {};
	ModalTab._view = {
		template: ejsTpl
	};

	ModalTab._messages = {};

	function ModalTab(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(ModalTab, Component);

	ModalTab.prototype.afterMount = function() {
		var self = this;

		$('.show-default-modal').on('click', function() {
	        var modal = new Modal({
	            $el: self.find('.default-modal'),

	            messages: {
	            	'MODAL_CONFIRM': function(data){
			            console.log('modal was confirmed')
			            modal.destory();
			        }
	            }
	        });
	    });

		new DemoCode({
			$el: self.find('.demo-code'),
			model: {
				htmlCode: modalHtml,
				jsCode: modalJs,
				eventsCode: modalEvents,
				messagesCode: modalMessages
			}
			
		});
	}

	return ModalTab;
});
