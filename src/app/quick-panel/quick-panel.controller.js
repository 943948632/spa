(function() {
    'use strict';

    angular
        .module('app.quick-panel')
        .controller('QuickPanelController', QuickPanelController);

    /** @ngInject */
    function QuickPanelController($document, msApi, $http, $scope, $mdDialog, $state) {
        var vm = this;
        $scope.isactive = 0;
        vm.date = new Date();
        vm.settings = {
            notify: true,
            cloud: false,
            retro: true
        };

        msApi.request('quickPanel.activities@get', {},

            function(response) {
                vm.activities = response.data;
            }
        );



        var Token = sessionStorage.getItem("Token");
        // setInterval(function() {
        function Right() {

            $http({
                method: "get",
                data: { page: 1, per_page: 20, offset: 0 },
                url: "https://staging.tophold.com/api/v2/products/likes",
                headers: { "Content-Type": "application/json", "X-Access-Token": Token }
            }).success(function(d) {
                vm.events = d.products;


            }).error(function(error) {});
        }
        Right()
        window.addEventListener('click', function(e) {
            if (e.target.id == "Right") {
                Right()
            }
        })


        $scope.dummyFunction = function(ev, task, en_name, current_price, name, symbol, names) {
            $scope.isactive = ev;
            vm.chname = name.name;
            sessionStorage.setItem("product_id", ev);

            // $state.go('app.dashboard-analytics');
            sessionStorage.setItem("gusymbol", symbol);
            sessionStorage.setItem("zhgusymbol", task);
            localStorage.setItem("gusymbol", symbol);


        }

        msApi.request('quickPanel.notes@get', {},

            function(response) {
                vm.notes = response.data;
            }
        );
    }

})();