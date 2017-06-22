(function() {
    'use strict';

    angular
        .module('app.trade')
        .controller('TradeController', TradeController);

    /** @ngInject */
    function TradeController($http, $scope, DashboardData) {

        var vm = this;
        vm.dashboardData = DashboardData;
        var config = {
            authDomain: "tophold-development.wilddog.com",
            syncURL: "https://tophold-development.wilddogio.com"
        };
        wilddog.initializeApp(config);

        //当前所选的股票名称
        //野狗配置
        setInterval(function() {

            vm.zhgusymbol = sessionStorage.getItem("zhgusymbol");
            var syms = sessionStorage.getItem("gusymbol");
            var sym = syms.toLowerCase();
            var mm = sym.replace(/[/]/, "-");
            var ref = wilddog.sync().ref("/products/" + mm);
            ref.on('value', function(snapshot) {
                var newPost = snapshot.val();
                sypic(newPost);
            }, function(error) {
                console.log(error);
            });

        }, 1000)


        function sypic(newPost) {
            vm.bid_price = newPost.bid_price;
            vm.offer_price = newPost.offer_price;

        }
        var toke = sessionStorage.getItem("Token");
        var product_id = sessionStorage.getItem("product_id");
        // vm.ll = 1;
        vm.kk = 2;
        vm.kl = 3;
        vm.lm = 0;
        vm.ln = 1;
        var time_in_force;
        var custom_typ;
        vm.time_in_force = time_in_force;
        $scope.mys = function(time_in_forces) {
            time_in_force = time_in_forces;
        };
        $scope.mya = function(custom_typ) {
                custom_typ = custom_typ;

            }
            //即时下单 买入
        $scope.buy = function() {
                var token = sessionStorage.getItem("Token");
                var side = 1;

                var qty = vm.number;
                var custom_price = vm.custom_price;
                var custom_stop_px = vm.custom_stop_px
                var data = {
                    custom_typ: 1,
                    product_id: product_id,
                    qty: qty,
                    ord_type: 1,
                    side: side,
                    time_in_force: time_in_force,
                    custom_price: custom_price,
                    custom_stop_px: custom_stop_px
                };
                console.log(data);
                $http({
                    method: "post",
                    data: data,
                    url: "https://staging.tophold.com/api/v2/orders",
                    headers: { "Content-Type": "application/json", "X-Access-Token": token }
                }).success(function(d) {




                }).error(function(error) {

                });

            }
            // 即时 移除自选股
        $scope.remove = function() {
                var token = sessionStorage.getItem("Token");
                var product_id = sessionStorage.getItem("product_id");
                $http({
                    method: "delete",
                    data: { "obj_type": "product", "obj_id": product_id, },
                    url: "https://staging.tophold.com/api/v2/likes",
                    headers: { "Content-Type": "application/json", "X-Access-Token": token }
                }).success(function(d) {
                    vm.success = "移除成功";
                    setTimeout(function() {
                        vm.success = "";
                    }, 1000)
                }).error(function(error) {});

            }
            // 即时 卖出
        $scope.sale = function() {
            var token = sessionStorage.getItem("Token");
            var side = 2;

            var qty = vm.number;
            var custom_price = vm.custom_price;
            var custom_stop_px = vm.custom_stop_px

            var data = {
                custom_typ: 1,
                product_id: product_id,
                qty: qty,
                ord_type: 1,
                side: side,
                time_in_force: time_in_force,
                custom_price: custom_price,
                custom_stop_px: custom_stop_px
            };

            $http({
                method: "post",
                data: data,
                url: "https://staging.tophold.com/api/v2/orders",
                headers: { "Content-Type": "application/json", "X-Access-Token": token }
            }).success(function(d) {
                vm.success = "卖出成功";

            }).error(function(error) {

            });

        }

        //委托下单 买入
        $scope.buys = function() {
                var token = sessionStorage.getItem("Token");
                var side = 1;
                var custom_typ = custom_typ;
                var qty = vm.number;
                var custom_price = vm.custom_price;
                var custom_stop_px = vm.custom_stop_px
                var data = {
                    custom_typ: custom_typ,
                    product_id: product_id,
                    qty: qty,
                    ord_type: 2,
                    side: side,
                    time_in_force: time_in_force,
                    custom_price: custom_price,
                    custom_stop_px: custom_stop_px
                };


                $http({
                    method: "post",
                    data: data,
                    url: "https://staging.tophold.com/api/v2/orders",
                    headers: { "Content-Type": "application/json", "X-Access-Token": token }
                }).success(function(d) {
                    vm.success = "买入成功";
                    setTimeout(function() {
                        vm.success = "";
                    }, 1000)


                }).error(function(error) {

                });

            }
            // 委托 移除自选股
        $scope.removes = function() {
                var token = sessionStorage.getItem("Token");
                var product_id = sessionStorage.getItem("product_id");
                $http({
                    method: "delete",
                    data: { "obj_type": "product", "obj_id": product_id, },
                    url: "https://staging.tophold.com/api/v2/likes",
                    headers: { "Content-Type": "application/json", "X-Access-Token": token }
                }).success(function(d) {
                    vm.success = "移除成功";
                    setTimeout(function() {
                        vm.success = "";
                    }, 1000)
                }).error(function(error) {});
                vm.success = "";
            }
            // 委托 卖出
        $scope.sales = function() {
            var token = sessionStorage.getItem("Token");
            var side = 2;
            var custom_typ = custom_typ;
            var qty = vm.number;
            var custom_price = vm.custom_price;
            var custom_stop_px = vm.custom_stop_px

            var data = {
                custom_typ: custom_typ,
                product_id: product_id,
                qty: qty,
                ord_type: 2,
                side: side,
                time_in_force: time_in_force,
                custom_price: custom_price,
                custom_stop_px: custom_stop_px
            };

            $http({
                method: "post",
                data: data,
                url: "https://staging.tophold.com/api/v2/orders",
                headers: { "Content-Type": "application/json", "X-Access-Token": token }
            }).success(function(d) {
                vm.success = "卖出成功";
                setTimeout(function() {
                    vm.success = "";
                }, 1000)
            }).error(function(error) {

            });
            vm.success = "";
        }





        //持仓列表
        function kk(d) {
            var guname = d.holds;
            for (var key in guname) {
                var symbol = guname[key].symbol;
                console.log(symbol);
                var ref = wilddog.sync().ref("/products" + symbol);
                ref.on('value', function(snapshot) {
                    var newPost = snapshot.val();
                    console.log(newPost);
                }, function(error) {
                    console.log(error);
                });

            }
        }

        vm.nmfalse = "平仓";

        function CiCang() {
            $http({
                method: "get",
                url: "https://staging.tophold.com/api/v2/accounts/detail",
                headers: { "X-Access-Token": toke }
            }).success(function(d) {
                vm.aa = d.holds;
                kk(d)
                $scope.toggle = function(a, b, c) {
                    //c 是id b是股票
                    console.log(a + "||" + b + "==" + c + "==")
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

                        $scope.isactive = c;
                    }).error(function(error) {});
                };

            }).error(function(error) {});
        };
        CiCang();



        vm.nmfalse = "平仓";

        $http({
            method: "get",
            url: "https://staging.tophold.com/api/v2/accounts/detail",
            headers: { "X-Access-Token": toke }
        }).success(function(d) {
            vm.aas = d.holds;

        }).error(function(error) {});





        //订单列表
        vm.dtOptions = {
            dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<i><"pagination"p>>>',
            pagingType: 'simple',
            autoWidth: false,
            responsive: true
        };

        function Dingdan() {

            var token = sessionStorage.getItem("Token")
            $http({
                data: { page: 1, per_page: 20, offset: 0, },
                method: "get",
                url: "https://staging.tophold.com/api/v2/orders",
                headers: { "Content-Type": "application/json", "X-Access-Token": token }
            }).success(function(d) {
                var employees = d.orders;
                vm.employees = employees.reverse()


            }).error(function(error) {});
        }
        Dingdan();


        window.addEventListener('click', function(e) {

            if (e.target.innerText == "我的订单") {

                Dingdan();

            } else if (e.target.innerText == "我的持仓") {

                CiCang()

            }
        })



    }
})();