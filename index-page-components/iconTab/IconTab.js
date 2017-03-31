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

	IconTab._model = {};

	IconTab._view = {
		template: ejsTpl
	};

	IconTab._messages = {};

	function IconTab(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(IconTab, Component);

	IconTab.prototype.afterMount = function() {
		var self = this;

		new Icon({
			$el: self.find('.icon-search'),
			model: {
				iconClass: 'fa fa-search'
			}
		});

		new Icon({
			$el: self.find('.icon-cog'),
			model: {
				iconClass: 'fa fa-cog'
			}
		});

		new Icon({
			$el: self.find('.icon-cogs'),
			model: {
				iconClass: 'fa fa-cogs'
			}
		});

		new Icon({
			$el: self.find('.icon-file'),
			model: {
				iconClass: 'fa fa-file'
			}
		});

		new Icon({
			$el: self.find('.icon-list'),
			model: {
				iconClass: 'fa fa-list'
			}
		});

		new DemoCode({
			$el: self.find('.demo-code'),
			model: {
				htmlCode: iconHtml,
				jsCode: iconJs,
				eventsCode: iconEvents,
				messagesCode: iconMessages
			}
			
		})
	}

	return IconTab;
});
