(function() {
    'use strict';

    angular
        .module('app.trade')
        .controller('TradeController', TradeController);

    /** @ngInject */
    function TradeController($http, $scope) {
        var vm = this;


        var toke = sessionStorage.getItem("Token");
        //野狗配置
        // var config = {
        //     authDomain: "tophold-development.wilddog.com",
        //     syncURL: "https://tophold-development.wilddogio.com"
        // };
        // wilddog.initializeApp(config);
        // var ref = wilddog.sync().ref("products/aapl/");
        // ref.on('value', function(snapshot) {
        //     var newPost = snapshot.val();
        // }, function(error) {
        //     console.log(error);
        // });


        //我的下单 

        var product_id = sessionStorage.getItem("product_id");
        vm.ll = 1;
        vm.kk = 2;
        vm.kl = 3;
        vm.lm = 0;
        vm.ln = 1;


        var ord_type;
        vm.ord_type = ord_type;
        $scope.my = function(ord_types) {
            ord_type = ord_types;
        };


        var time_in_force;
        vm.time_in_force = time_in_force;
        $scope.mys = function(time_in_forces) {
            time_in_force = time_in_forces;

        };
        $scope.buy = function() {
                var side = 1;
                var custom_typ = 1;
                var qty = vm.number;
                var data = {
                    custom_typ: custom_typ,
                    product_id: product_id,
                    qty: qty,
                    ord_type: ord_type,
                    side: side,
                    time_in_force: time_in_force
                };
                $http({
                    method: "post",
                    data: data,
                    url: "https://staging.tophold.com/api/v2/orders",
                    headers: { "Content-Type": "application/json", "X-Access-Token": token }
                }).success(function(d) {

                }).error(function(error) {

                });
            }
            //移除自选股
        $scope.remove = function() {
                var product_id = sessionStorage.getItem("product_id");
                $http({
                    method: "delete",
                    data: { "obj_type": "product", "obj_id": product_id, },
                    url: "https://staging.tophold.com/api/v2/likes",
                    headers: { "Content-Type": "application/json", "X-Access-Token": token }
                }).success(function(d) {


                }).error(function(error) {

                });
            }
            //卖出
        $scope.sale = function() {
            var side = 2;
            var custom_typ = 1;
            var qty = vm.number;
            var data = {
                custom_typ: custom_typ,
                product_id: product_id,
                qty: qty,
                ord_type: ord_type,
                side: side,
                time_in_force: time_in_force
            };
            $http({
                method: "post",
                data: data,
                url: "https://staging.tophold.com/api/v2/orders",
                headers: { "Content-Type": "application/json", "X-Access-Token": token }
            }).success(function(d) {

            }).error(function(error) {

            });
        }



        //持仓定时刷新
        setTimeout(function() {
            //持仓列表
            $http({
                method: "get",
                url: "https://staging.tophold.com/api/v2/accounts/detail",
                headers: { "X-Access-Token": toke }
            }).success(function(d) {
                vm.aa = d.holds;
                $scope.toggle = function(a, b, c) {
                    //c 是id b是股票代码
                    var c = c;
                    var Token = sessionStorage.getItem("Token");
                    $http({
                        data: { symbol: b },
                        method: "delete",
                        url: "https://staging.tophold.com/api/v2/holds/sell",
                        headers: { "Content-Type": "application/json", "X-Access-Token": Token }
                    }).success(function(d) {
                        vm.bb = "已平仓";
                        vm.ft = false;
                        alert("平唱");
                        $scope.isactive = c;
                    }).error(function(error) {});
                };
                vm.bb = "平仓";
            }).error(function(error) {});
            vm.nmfalse = "平仓";
        }, 1000);
        //订单列表
        var token = sessionStorage.getItem("Token")
        $http({
            data: { page: 1, per_page: 20, offset: 0, },
            method: "get",
            url: "https://staging.tophold.com/api/v2/orders",
            headers: { "Content-Type": "application/json", "X-Access-Token": token }
        }).success(function(d) {
            vm.proucts = d.orders;
        }).error(function(error) {});


    }
})();