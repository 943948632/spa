(function() {
    'use strict';

    angular
        .module('app.dashboards', [
            'app.dashboards.project',
            'app.dashboards.server',
            'app.dashboards.analytics'
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider) {
        // Navigation
        msNavigationServiceProvider.saveItem('apps', {
            title: '当前交易',
            group: true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('apps.dashboards', {
            title: '我的交易情况',
            icon: 'icon-tile-four',
            weight: 1
        });
        msNavigationServiceProvider.saveItem('apps.dashboards.analytics', {
            title: '我的交易',
            state: 'app.dashboards_analytics'
        });

        msNavigationServiceProvider.saveItem('apps.dashboards.project', {
            title: '发现',
            state: 'app.dashboards_project'
        });

        msNavigationServiceProvider.saveItem('apps.dashboards.server', {
            title: '账户资金',
            state: 'app.dashboards_server'
        });


    }

})();