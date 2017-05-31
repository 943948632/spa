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
            //买入价格
            vm.mairuprice = d.product.bid_price;
            sessionStorage.setItem("mairuprice", vm.mairuprice);
            //卖出价格
            vm.maichu = d.product.offer_price;
        }).error(function(error) {});


        vm.ll = 1;
        vm.kk = 2;
        vm.kl = 3;
        vm.lm = 0;
        vm.mm = 1;
        $scope.my = function(a) {
            $scope.mys = function(b) {



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








        // Data
        //  vm.title = 'Edit Task';
        // vm.task = angular.copy(Task);


        vm.tasks = Tasks;


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