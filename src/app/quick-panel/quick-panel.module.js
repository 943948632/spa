(function() {
    'use strict';

    angular
        .module('app.quick-panel', [])
        .config(config);

    /** @ngInject */
    function config($translatePartialLoaderProvider, msApiProvider) {
        // Translation
        $translatePartialLoaderProvider.addPart('app/quick-panel');

        // Api
        msApiProvider.register('quickPanel.activities', ['app/data/quick-panel/activities.json']);
        msApiProvider.register('quickPanel.contacts', ['app/data/quick-panel/contacts.json']);
        // msApiProvider.register('quickPanel.events', ['https://staging.tophold.com/api/v2/products/likes']);
        msApiProvider.register('quickPanel.notes', ['app/data/quick-panel/notes.json']);
    }
})();