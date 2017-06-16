(function() {
    'use strict';

    angular
        .module('app.trade', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
        // State
        $stateProvider
            .state('app.trade', {
                url: '/trade',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/trade/trade.html',
                        controller: 'TradeController as vm'
                    }
                },
                // resolve: {
                //     TradeData: function(msApi) {
                //         return msApi.resolve('trade@get');
                //     }
                // }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/trade');

        // Api
        //msApiProvider.register('trade', ['app/data/trade/trade.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title: 'TSAMPLE',
            group: true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('fuse.trade', {
            title: 'TSAMPLE',
            icon: 'icon-account-switch',
            state: 'app.trade',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'TSAMPLE.SAMPLE_NAV',
            weight: 1
        });
    }
})();