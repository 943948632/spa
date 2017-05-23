(function() {
    'use strict';

    angular
        .module('fuse')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($scope, $rootScope) {
        // Data
        const vm = this;
        vm.use
            //////////

        // Remove the splash screen
        $scope.$on('$viewContentAnimationEnded', function(event) {
            if (event.targetScope.$id === $scope.$id) {
                $rootScope.$broadcast('msSplashScreen::remove');
            }
        });
    }
})();