define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./DemoCode.ejs'
], function($, Component, Utils, ejsTpl, Icon){
	DemoCode._model = {
		htmlCode: '',
		jsCode: '',
		eventsCode: '',
		messagesCode: ''
	};

	DemoCode._view = {
		template: ejsTpl
	};

	function DemoCode(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(DemoCode, Component);

	return DemoCode;
});
