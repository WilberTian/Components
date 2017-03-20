require.config({
    paths: {
        jquery: 'vendor/jquery.min',
        text: 'vendor/text',
        ejs: 'node_modules/ejs/ejs.min',
        moment: 'node_modules/moment/min/moment.min',
    }
});

require([
    'Icon',
    'Text',
    'IconText',
    'TextLength',
    'Button',
    'IconButton',
    'Select',
    'Search',
    'Calendar',
    'DatePicker',
    'TimeOptions',
    'TimePicker',
    'Modal',
    'Hover',
    'CheckboxGroup',
    'RadioboxGroup',
    'MultiSelect',
    'Tab',
    'Pagination',
    'Stepper'
], function (Icon, Text, IconText, TextLength, Button, IconButton, Select, Search, Calendar, DatePicker, TimeOptions, TimePicker, Modal, Hover, CheckboxGroup, RadioboxGroup, MultiSelect, Tab, Pagination, Stepper) {

    var icon = new Icon({
        $el: $('.icon-search'),
        iconClass: 'fa fa-search'
    });


    var text = new Text({
        $el: $('.text'),
        text: '',
        placeholder: 'input user name'
    });

    var iconText = new IconText({
        $el: $('.icon-text'),
        placeholder: 'Search...',
        iconClass: 'fa fa-search'
    })

    var textLength = new TextLength({
        $el: $('.text-length'),
        limitationLength: 20
    });

    var button = new Button({
        $el: $('.button'),
        text: 'submit'
    })

    var iconButton = new IconButton({
        $el: $('.icon-button'),
        text: 'Setting',
        iconClass: 'fa fa-cog'
    });

    var onlyIconButton = new IconButton({
        $el: $('.only-icon-button'),
        iconClass: 'fa fa-cog'
    });

    var select = new Select({
        $el: $('.select'),
        label: 'Gender',
        required: true,
        selected: {
            label: 'female',
            value: '2'
        },
        options: [{
            label: 'male',
            value: '1'
        }, {
            label: 'female',
            value: '2'
        }]
    });

    var search = new Search({
        $el: $('.search'),
        url: '/mock/search_mock',
        selected: {}
    });

    var calendar = new Calendar({
        $el: $('.calendar')
    });

    var datePicker = new DatePicker({
        $el: $('.date-picker')
    });

    var timeOptions = new TimeOptions({
        $el: $('.time-options')
    });

    var timePicker = new TimePicker({
        $el: $('.time-picker')
    });

    $('.show-modal').on('click', function() {
        var modal = new Modal({
            $el: $('.modal')
        })
        modal.mount();

        modal.subscribe('MODAL_CONFIRM', function(data){
            console.log('modal was confirmed')
            modal.destory();
        });
    });


    var hover = new Hover({
        $el: $('.hover')
    })
    $('.hover').on('mouseover', function(e){
        hover.publish('HOVER_SHOW', e, hover.guid);
    }).on('mouseout', function(e){
        hover.publish('HOVER_HIDE', e, hover.guid);
    })

    var element = $('.ellipsis-hint span')[0];
    if(element.scrollWidth > element.offsetWidth) {
        var ellipsisHint = new Hover({
            $el: $('.ellipsis-hint')
        })
        $('.ellipsis-hint').on('mouseover', function(e){
            ellipsisHint.publish('HOVER_SHOW', e, ellipsisHint.guid);
        }).on('mouseout', function(e){
            ellipsisHint.publish('HOVER_HIDE', e, ellipsisHint.guid);
        })
    }
    

    var checkboxGroup = new CheckboxGroup({
        $el: $('.checkbox-group'),
        checked: [2, 3],
        options: [{
            label: '初级',
            value: '1'
        }, {
            label: '中级',
            value: '2'
        }, {
            label: '高级',
            value: '3'
        }]
    });


    var radioboxGroup = new RadioboxGroup({
        $el: $('.radiobox-group'),
        checked: 2,
        options: [{
            label: '初级',
            value: '1'
        }, {
            label: '中级',
            value: '2'
        }, {
            label: '高级',
            value: '3'
        }]
    });


    var multiSelect = new MultiSelect({
        $el: $('.multi-select'),
        selected: [{
            label: '中级',
            value: '2'
        }, {
            label: '高级',
            value: '3'
        }],
        options: [{
            label: '初级',
            value: '1'
        }, {
            label: '中级',
            value: '2'
        }, {
            label: '高级',
            value: '3'
        }]
    });


    var tab = new Tab({
        $el: $('.tab'),
        selected: 1,
        tabs: [{
            label: '初级',
            value: '1'
        }, {
            label: '中级',
            value: '2'
        }, {
            label: '高级',
            value: '3'
        }]
    })

    var pagination = new Pagination({
        $el: $('.pagination'),
        currentPage: 1,
        totalPages: 10
    });

    var stepper = new Stepper({
        $el: $('.stepper'),
        number: 100
    });
    
});
