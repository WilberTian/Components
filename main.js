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
    'Calendar',
    'Modal',
    'Hover',
    'CheckboxGroup',
    'RadioboxGroup'
], function (Text, Select, Search, Calendar, Modal, Hover, CheckboxGroup, RadioboxGroup) {

    var text = new Text({
        $el: $('.text'),
        label: 'UserName',
        placeholder: 'input user name',
        required: true
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

    select.render();



    var search = new Search({
        $el: $('.search'),
        url: '/mock/search_mock',
        selected: {}
    });
    search.render();

    var calendar = new Calendar({
        $el: $('.calendar')
    });
    calendar.render();

    $('.show-modal').on('click', function() {
        var modal = new Modal({
            $el: $('.modal')
        })
        modal.render();

        modal.subscribe(modal.guid + '-MODAL_CONFIRM', function(data){
            console.log('modal was confirmed')
            modal.destory();
        });
    });


    var hover = new Hover({
        $el: $('.hover')
    })
    hover.render();
    $('.hover').on('mouseover', function(){
        hover.publish(hover.guid + '-SHOW_HOVER');
    }).on('mouseout', function(){
        hover.publish(hover.guid + '-HIDE_HOVER');
    })


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

    checkboxGroup.render();

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

    radioboxGroup.render();
});
