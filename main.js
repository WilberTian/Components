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
    'Hover'
], function (Text, Select, Search, Calendar, Modal, Hover) {

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
});
