define([
	'jquery',
	'components/Component',
	'components/Utils',
	'text!./HoverTab.ejs',
	'components/hover/Hover',
	'../demoCode/DemoCode',
	'text!./hoverHtml.txt',
	'text!./hoverJs.txt',
	'text!./hoverEvents.txt',
	'text!./hoverMessages.txt'
], function($, Component, Utils, ejsTpl, Hover, DemoCode, hoverHtml, hoverJs, hoverEvents, hoverMessages){

	HoverTab._model = {};
	HoverTab._view = {
		template: ejsTpl
	};

	HoverTab._messages = {};

	function HoverTab(options) {
		Component.apply(this, arguments || {});
	}

	Utils.inherit(HoverTab, Component);

	HoverTab.prototype.afterMount = function() {
		var self = this;

		var hover = new Hover({
	        $el: $('.default-hover'),
	        model: {
            	style: {
            		bottom: '28px',
            		left: '0px'
            	}
            }
	    });
	    hover.updateModel({	
	    	content: 'this is the hover message!'
	    });

	    
	    // need to wrap the span since the overflow: hidden will not show the hover
	    var element = $('.ellipsis-hint span')[0];
	    if(element.scrollWidth > element.offsetWidth) {
	        var ellipsisHint = new Hover({
	            $el: $('.ellipsis-hint'),
	            model: {
	            	content: 'this is a long text, and will use the text-overflow: ellipsis',
	            	style: {
	            		width: '300px',
	            		bottom: '28px',
            			left: '0px'
	            	}
	            }
	            
	        });
	    }


	    new Hover({
	        $el: $('.hover-style-2'),
	        model: {
	        	arrowPos: 2,
	        	style: {
	        		bottom: '28px',
	        		left: '-40px'
	        	}
	        }
	    });

	    new Hover({
	        $el: $('.hover-style-3'),
	        model: {
	        	arrowPos: 3,
	        	style: {
	        		bottom: '28px',
	        		right: '0px'
	        	}
	        }
	    });

	    new Hover({
	        $el: $('.hover-style-5'),
	        model: {
	        	arrowPos: 5,
	        	style: {
	        		top: '30px',
	        		right: '0px'
	        	}
	        }
	    });

	    new Hover({
	        $el: $('.hover-style-6'),
	        model: {
	        	arrowPos: 6,
	        	style: {
	        		top: '30px',
	        		right: '-40px'
	        	}
	        }
	    });

	    new Hover({
	        $el: $('.hover-style-7'),
	        model: {
	        	arrowPos: 7,
	        	style: {
	        		top: '30px',
	        		left: '0px'
	        	}
	        }
	    });

		new DemoCode({
			$el: self.find('.demo-code'),
			model: {
				htmlCode: hoverHtml,
				jsCode: hoverJs,
				eventsCode: hoverEvents,
				messagesCode: hoverMessages
			}
			
		});
	}

	return HoverTab;
});
