(function() {
    'use strict';

    angular
        .module('app.pages.auth.forgot-passwords', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider) {
        // State
        $stateProvider.state('app.pages_auth_forgot-passwords', {
            url: '/pages/auth/forgot-passwords',
            views: {
                'main@': {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller: 'MainController as vm'
                },
                'content@app.pages_auth_forgot-passwords': {
                    templateUrl: 'app/main/pages/auth/forgot-passwords/forgot-passwords.html',
                    controller: 'ForgotPasswordControllers as vm'
                }
            },
            bodyClass: 'forgot-passwords'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/pages/auth/forgot-passwords');

        // Navigation
        msNavigationServiceProvider.saveItem('pages.auth.forgot-passwords', {
            title: 'Forgot Password',
            state: 'app.pages_auth_forgot-passwords',
            weight: 5
        });
    }

})();