require.config({
    paths: {
        jquery: 'vendor/jquery.min',
        text: 'vendor/text',
        ejs: 'node_modules/ejs/ejs.min',
        moment: 'node_modules/moment/min/moment.min',
    }
});

require([
    'Text',
    'Select',
    'Search',
    'DatePicker',
    'Modal',
    'Hover',
    'CheckboxGroup',
    'RadioboxGroup',
    'MultiSelect',
    'Tab'
], function (Text, Select, Search, DatePicker, Modal, Hover, CheckboxGroup, RadioboxGroup, MultiSelect, Tab) {

    var text = new Text({
        $el: $('.text'),
        text: '',
        placeholder: 'input user name'
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


    var datePicker = new DatePicker({
        $el: $('.date-picker')
    });


    $('.show-modal').on('click', function() {
        var modal = new Modal({
            $el: $('.modal')
        })
        modal.mount();

        modal.subscribe(modal.toMsgName('MODAL_CONFIRM'), function(data){
            console.log('modal was confirmed')
            modal.destory();
        });
    });


    var hover = new Hover({
        $el: $('.hover')
    })
    $('.hover').on('mouseover', function(){
        hover.publish(hover.toMsgName('SHOW_HOVER'));
    }).on('mouseout', function(){
        hover.publish(hover.toMsgName('HIDE_HOVER'));
    })

    var element = $('.ellipsis-hint span')[0];
    if(element.scrollWidth > element.offsetWidth) {
        var ellipsisHint = new Hover({
            $el: $('.ellipsis-hint')
        })
        $('.ellipsis-hint').on('mouseover', function(){
            ellipsisHint.publish(ellipsisHint.toMsgName('SHOW_HOVER'));
        }).on('mouseout', function(){
            ellipsisHint.publish(ellipsisHint.toMsgName('HIDE_HOVER'));
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
    
});
