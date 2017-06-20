(function() {
    'use strict';

    angular
        .module('app.trade', ['datatables'])
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
                resolve: {
                    DashboardData: function(msApi) {
                        return msApi.resolve('trade@get');
                    }


                }

            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/trade');


        msApiProvider.register('trade', ['app/data/dashboard/server/data.json']);
        msApiProvider.register('trade', ['app/data/trade/data.json']);


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