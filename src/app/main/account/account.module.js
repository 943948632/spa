(function() {
    'use strict';

    angular
        .module('app.account', [

            // 3rd Party Dependencies
            'nvd3',
            'datatables'
        ])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
        // State
        $stateProvider
            .state('app.account', {
                url: '/account',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/account/account.html',
                        controller: 'AccountController as vm'
                    }
                },
                resolve: {
                    DashboardData: function(msApi) {
                        return msApi.resolve('dashboard.server@get');
                    }
                },
                bodyClass: 'dashboard-server'
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/account');

        // Api
        // msApiProvider.register('account', ['app/data/account/account.json']);
        msApiProvider.register('account', ['app/data/dashboard/server/data.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title: 'ACCOIUNT',
            group: true,
            weight: 2
        });

        msNavigationServiceProvider.saveItem('fuse.account', {
            title: 'Account',
            icon: 'icon-currency-usd',
            state: 'app.account',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'ACCOIUNT.ACCOIUNT_NAV',
            weight: 2
        });
    }
})();