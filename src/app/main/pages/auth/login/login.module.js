(function() {
    'use strict';

    angular
        .module('app.pages.auth.login', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
        // State
        $stateProvider.state('app.pages_auth_login', {
            url: '/pages/auth/login',
            views: {
                'main@': {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller: 'MainController as vm'
                },
                'content@app.pages_auth_login': {
                    templateUrl: 'app/main/pages/auth/login/login.html',
                    controller: 'LoginController as vm'
                }
            },
            bodyClass: 'login'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/pages/auth/login');
        // apI
        // msApiProvider.register('dashboard.analytics', ['app/data/dashboard/analytics/data.json']);
        // msApiProvider.register('dashboard.analytics', ['https://staging.tophold.com/api/v2/user_cties?api_key=wklking']);
        // Navigation
        // msNavigationServiceProvider.saveItem('pages.auth', {
        //     title: 'Authentication',
        //     icon: 'icon-lock',
        //     weight: 0
        // });

        // msNavigationServiceProvider.saveItem('pages.auth.login', {
        //     title: 'Login',
        //     state: 'app.pages_auth_login',
        //     weight: 1
        // });
    }

})();