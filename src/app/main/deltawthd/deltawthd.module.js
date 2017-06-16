(function() {
    'use strict';

    angular
        .module('app.deltawthd', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
        // State
        $stateProvider
            .state('app.deltawthd', {
                url: '/deltawthd',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/deltawthd/deltawthd.html',
                        controller: 'DeltawthdController as vm'
                    }
                },
                resolve: {
                    DeltawthdData: function(msApi) {
                        return msApi.resolve('account@get');
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/deltawthd');

        // Api
        msApiProvider.register('deltawthd', ['app/data/deltawthd/deltawthd.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title: 'DELTAWTHD',
            group: true,
            weight: 3
        });

        msNavigationServiceProvider.saveItem('fuse.deltawthd', {
            title: 'DELTAWTHD',
            icon: 'icon-swap-vertical',
            state: 'app.deltawthd',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'DELTAWTHD.DELTAWTHD_NAV',
            weight: 3
        });
    }
})();