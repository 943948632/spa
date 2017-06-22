(function() {
    'use strict';

    angular
        .module('app.deltawthd')
        .controller('DeltawthdController', DeltawthdController);

    /** @ngInject */
    function DeltawthdController(DeltawthdData, $scope, $mdDialog, $document, $http) {
        var vm = this;
        vm.addEvent = addEvent;
        var token = sessionStorage.getItem("Token");


        //账单
        $http({
            method: "get",
            url: "https://staging.tophold.com/api/v2/deposits?q%5Bs%5D=created_at%20desc&page=1&per_page=20&offset=0",
            headers: { "X-Access-Token": token }
        }).success(function(d) {
            vm.deposits = d.deposits;
            var deposits = d.deposits;
            for (var key in deposits) {
                if (deposits[key].status_name == "等待付款") {
                    vm.depositsid = deposits[key].id;
                    $scope.isactive = vm.depositsid;
                    console.log($scope.isactive);
                }

            }


        }).error(function(error) {});
        //生成的账单
        function addEvent(e, $http) {
            console.log(e);
            // http(e, $http)
            // showEventFormDialog('add', false, e);
        }
        //支付宝
        $scope.addEventsZ = function(RMB, ZZ) {
            var data = {
                payment_type: 0,
                rmb_amount: RMB,
                alipay: ZZ,
            };

            $http({
                method: "post",
                data: data,
                url: "https://staging.tophold.com/api/v2/deposits",
                headers: { "X-Access-Token": token }
            }).success(function(d) {


            }).error(function(error) {

                showEventFormDialog()
            });
        }

        //银行卡
        $scope.addEventsC = function(CardNo, RMB, ZZ) {
                var data = {
                    payment_type: 1,
                    no: CardNo,
                    rmb_amount: RMB,
                    alipay: ZZ,
                    payment_no: "payment_no"
                };
                console.log(data)
                $http({
                    method: "post",
                    data: data,
                    url: "https://staging.tophold.com/api/v2/deposits",
                    headers: { "X-Access-Token": token }
                }).success(function(d) {
                    alert("成功");
                }).error(function(error) {});
            }
            //微信
        $scope.addEventsW = function(CardNo, RMB, ZZ) {
                var data = {
                    payment_type: 2,
                    no: CardNo,
                    rmb_amount: RMB,
                    alipay: ZZ,
                    payment_no: "payment_no"
                };
                console.log(data)
                $http({
                    method: "post",
                    data: data,
                    url: "https://staging.tophold.com/api/v2/deposits",
                    headers: { "X-Access-Token": token }
                }).success(function(d) {
                    alert("成功");
                }).error(function(error) {});
            }
            //网银
        $scope.addEventsWY = function(CardNo, RMB, ZZ) {
            var data = {
                payment_type: 3,
                no: CardNo,
                rmb_amount: RMB,
                alipay: ZZ,
                payment_no: "payment_no"
            };
            console.log(data)
            $http({
                method: "post",
                data: data,
                url: "https://staging.tophold.com/api/v2/deposits",
                headers: { "X-Access-Token": token }
            }).success(function(d) {
                alert("成功");
            }).error(function(error) {});
        }









        function showEventFormDialog(type, calendarEvent, e, $http) {
            var dialogData = {
                type: type,
                calendarEvent: calendarEvent,
            };

            $mdDialog.show({
                controller: 'EventFormDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/main/deltawthd/dialogs/event-form/event-form-dialog.html',
                parent: angular.element($document.body),
                targetEvent: e,
                clickOutsideToClose: true,
                locals: {
                    dialogData: dialogData
                }
            });
        }




        vm.dtOptions = {
            dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<i><"pagination"p>>>',
            pagingType: 'simple',
            autoWidth: false,
            responsive: true
        };
    }
})();