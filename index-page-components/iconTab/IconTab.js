define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./IconTab.ejs',
	'components/icon/Icon',
	'../demoCode/DemoCode',
	'text!./iconHtml.txt',
	'text!./iconJs.txt',
	'text!./iconEvents.txt',
	'text!./iconMessages.txt'
], function($, Component, Utils, ejsTpl, Icon, DemoCode, iconHtml, iconJs, iconEvents, iconMessages){

	var _data = {
		template: ejsTpl,
	}

	function IconTab(options) {
		$.extend(true, this, _data, options);
		Component.apply(this, arguments || {});
	}

	Utils.inherit(IconTab, Component);

	IconTab.prototype.afterMount = function() {
		var self = this;

		new Icon({
			$el: self.find('.icon-search'),
			iconClass: 'fa fa-search'
		});

		new Icon({
			$el: self.find('.icon-cog'),
			iconClass: 'fa fa-cog'
		});

		new Icon({
			$el: self.find('.icon-cogs'),
			iconClass: 'fa fa-cogs'
		});

		new Icon({
			$el: self.find('.icon-file'),
			iconClass: 'fa fa-file'
		});

		new Icon({
			$el: self.find('.icon-list'),
			iconClass: 'fa fa-list'
		});

		new DemoCode({
			$el: self.find('.demo-code'),
			htmlCode: iconHtml,
			jsCode: iconJs,
			eventsCode: iconEvents,
			messagesCode: iconMessages
		})
	}

	return IconTab;
});
