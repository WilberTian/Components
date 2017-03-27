define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./DemoCode.ejs'
], function($, Component, Utils, ejsTpl, Icon){

	var _data = {
		htmlCode: '',
		jsCode: '',
		eventsCode: '',
		messagesCode: '',

		template: ejsTpl,
	}

	function DemoCode(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}

	Utils.inherit(DemoCode, Component);

	return DemoCode;
});
