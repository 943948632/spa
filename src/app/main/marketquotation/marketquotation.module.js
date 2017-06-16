(function() {
    'use strict';

    angular
        .module('app.marketquotation', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
        // State
        $stateProvider
            .state('app.marketquotation', {
                url: '/marketquotation',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/marketquotation/marketquotation.html',
                        controller: 'MarketquotationController as vm'
                    }
                },
                resolve: {
                    MarketquotationData: function(msApi) {
                        return msApi.resolve('account@get');
                    },
                    Tasks: function(msApi) {
                        return msApi.resolve('marketquotation.tasks@get');
                    },
                    Tags: function(msApi) {
                        return msApi.resolve('marketquotation.tags@get');
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/marketquotation');

        // Api
        msApiProvider.register('marketquotation', ['app/data/marketquotation/marketquotation.json']);
        msApiProvider.register('marketquotation.tasks', ['app/data/todo/tasks.json']);
        msApiProvider.register('marketquotation.tags', ['app/data/todo/tags.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title: '',
            group: true,
            weight: 4
        });

        msNavigationServiceProvider.saveItem('fuse.marketquotation', {
            title: 'DELTAWTHD',
            icon: 'icon-elevation-rise',
            state: 'app.marketquotation',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'MDELTAWTHD.MDELTAWTHD_NAV',
            weight: 4
        });
    }
})();