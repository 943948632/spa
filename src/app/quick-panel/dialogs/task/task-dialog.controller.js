(function() {
    'use strict';

    angular
        .module('app.todo')
        .controller('TaskDialogController', TaskDialogController);

    /** @ngInject */
    function TaskDialogController($mdDialog, Task, Tasks, event, $http, $scope) {
        //Task指的事股票的名称,event指的事ID
        console.log($mdDialog + "" + Task + "" + Tasks + "" + event + "=================");
        //event指的是当前ID
        var vm = this;

        var id = event;

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

        $scope.buy = function() {
            $http({
                method: "",

                url: "",
                headers: { "Content-Type": "application/json" }
            }).success(function(d) {
                closeDialog();
            }).error(function(error) {
                closeDialog();
            });
        }









        // Data
        vm.title = 'Edit Task';
        vm.task = angular.copy(Task);


        vm.tasks = Tasks;


        vm.newTask = false;


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
            // sessionStorage.removeItem("mairuprice");
            // sessionStorage.removeItem("maichu");
        }
    }
})();