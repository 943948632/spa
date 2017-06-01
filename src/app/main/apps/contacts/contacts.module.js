(function() {
    'use strict';

    angular
        .module('app.contacts', [
            // 3rd Party Dependencies
            'xeditable'
        ])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {

        $stateProvider.state('app.contacts', {
            url: '/contacts',
            views: {
                'content@app': {
                    templateUrl: 'app/main/apps/contacts/contacts.html',
                    controller: 'ContactsController as vm'
                }
            },
            resolve: {
                Contacts: function(msApi) {
                    return msApi.resolve('contacts.contacts@get');
                },
                User: function(msApi) {
                    return msApi.resolve('contacts.user@get');
                }
            }
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/apps/contacts');

        // Api
        msApiProvider.register('contacts.contacts', ['app/data/contacts/contacts.json']);
        msApiProvider.register('contacts.user', ['app/main/apps/contacts/i18n/user.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('apps.contacts', {
            title: '投资排行榜',
            icon: 'icon-account-box',
            state: 'app.contacts',
            weight: 4
        });

    }

})();