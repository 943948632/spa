(function() {
    'use strict';

    angular
        .module('app.dashboards.server', [
            // 3rd Party Dependencies
            'nvd3'

        ])
        .config(config);

    /** @ngInject */
    function config($stateProvider, msApiProvider) {
        // State
        $stateProvider.state('app.dashboards_server', {
            url: '/dashboard-server',
            views: {
                'content@app': {
                    templateUrl: 'app/main/apps/dashboards/server/dashboard-server.html',
                    controller: 'DashboardServerController as vm'
                }
            }


        });

        // Api


    }
})();