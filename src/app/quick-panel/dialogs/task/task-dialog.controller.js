(function() {
    'use strict';

    angular
        .module('app.todo')
        .controller('TaskDialogController', TaskDialogController);

    /** @ngInject */
    function TaskDialogController($mdDialog, Task, Tasks, event, $http, $scope) {
        //Task指的事股票的名称,event指的事ID
        console.log($mdDialog + "" + Task + "" + Tasks + "" + event + "=================" + this);
        //event指的是当前ID
        var vm = this;
        var id = event;
        var token = sessionStorage.getItem("Token");


        $http({
            method: "get",
            url: "https://staging.tophold.com/api/v2/products/" + id,
            headers: { "Content-Type": "application/json" }
        }).success(function(d) {
            var adds = window.location.pathname;
            if (adds == "/dashboard-analytics") {
                vm.mairuprice = d.product.bid_price;
                sessionStorage.setItem("mairuprice", vm.mairuprice);
                vm.maichu = d.product.offer_price;
            } else {


            }
        }).error(function(error) {
            //股票价格
            vm.mairuprice = sessionStorage.getItem("gucurrent_price");
            alert(vm.mairuprice + "这是vm.mairuprice....")
        });
        vm.ll = 1;
        vm.kk = 2;
        vm.kl = 3;
        vm.lm = 0;
        vm.mm = 1;
        $scope.my = function(a) {

            var ids = id;
            $scope.mys = function(b) {
                // 市场行情里面的股票id
                var productid = sessionStorage.getItem("guid");
                //获取地址栏信息
                var adds = window.location.pathname;

                if (adds == "/dashboard-analytics") {
                    //判断是否当前页面的的需求 交易的判断
                    //股票ID
                    var id = ids;
                    alert(id + "这是我的交易里面的")
                } else if (adds == "/contacts") {
                    var id = productid;

                    alert(id + "这是市场行情的")
                }

                var data = {
                    custom_typ: 1,
                    product_id: id,
                    qty: vm.number,
                    ord_type: a,
                    side: 1,
                    time_in_force: b,
                };

                $scope.buy = function() {
                    $http({
                        method: "post",
                        data: data,
                        url: "https://staging.tophold.com/api/v2/orders",
                        headers: { "Content-Type": "application/json", "X-Access-Token": token }
                    }).success(function(d) {

                        closeDialog();

                    }).error(function(error) {
                        closeDialog();
                    });
                }
            }
        };


        //移除自选股
        // 市场行情里面的股票id
        var ids = id;
        var productid = sessionStorage.getItem("guid");
        //获取地址栏信息
        var adds = window.location.pathname;
        if (adds == "/dashboard-analytics") {
            //判断是否当前页面的的需求 交易的判断
            //股票ID
            var id = ids;
            alert(id + "这是我的交易里面的")
        } else if (adds == "/contacts") {
            var id = productid;
            alert(id + "这是市场行情的")
        };
        $scope.remove = function(a) {
            $http({
                method: "delete",
                data: { "obj_type": "product", "obj_id": id, },
                url: "https://staging.tophold.com/api/v2/likes",
                headers: { "Content-Type": "application/json", "X-Access-Token": token }
            }).success(function(d) {

                alert("我成功了");

            }).error(function(error) {

            });
        }

        // Data
        //  vm.title = 'Edit Task';
        // vm.task = angular.copy(Task);
        vm.tasks = Tasks;
        // vm.remove = remove;
        // vm.newTask = false;
        // Methods
        vm.addNewTask = addNewTask;
        vm.buy = buy;
        vm.sale = sale;
        vm.deleteTask = deleteTask;
        vm.newTag = newTag;
        vm.closeDialog = closeDialog;

        //////////

        /**
         * Add new task
         */
        function addNewTask() {


            closeDialog();
        }

        /**
         * Save task
         */
        function buy() {

            closeDialog();
        }

        function sale() {

            closeDialog();
        }

        /**
         * Delete task
         */
        function deleteTask() {
            var confirm = $mdDialog.confirm()
                .title('Are you sure?')
                .content('The Task will be deleted.')
                .ariaLabel('Delete Task')
                .ok('Delete')
                .cancel('Cancel')
                .targetEvent(event);

            $mdDialog.show(confirm).then(function() {
                // Dummy delete action
                for (var i = 0; i < vm.tasks.length; i++) {
                    if (vm.tasks[i].id === vm.task.id) {
                        vm.tasks[i].deleted = true;
                        break;
                    }
                }
            }, function() {
                // Cancel Action
            });
        }


        /**
         * New tag
         *
         * @param chip
         * @returns {{label: *, color: string}}
         */
        function newTag(chip) {

        }

        /**
         * Close dialog
         */
        function closeDialog() {
            $mdDialog.hide();

        }
    }
})();