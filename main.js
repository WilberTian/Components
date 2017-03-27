require.config({
    paths: {
        jquery: 'vendor/jquery.min',
        text: 'vendor/text',
        ejs: 'node_modules/ejs/ejs.min',
        moment: 'node_modules/moment/min/moment.min',
    }
});

require([
    'index-page-components/Index'
], function (Index) {
    new Index({
        $el: $('.root')
    })
    
});
