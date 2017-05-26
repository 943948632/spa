(function() {
    'use strict';

    angular
        .module('app.todo')
        .controller('TaskDialogController', TaskDialogController);

    /** @ngInject */
    function TaskDialogController($mdDialog, Task, Tasks, event) {

        var vm = this;
        // var number = vm.number;
        // var pice = vm.current_price;










        // Data
        vm.title = 'Edit Task';
        vm.task = angular.copy(Task);


        vm.tasks = Tasks;


        vm.newTask = false;


        // Methods
        vm.addNewTask = addNewTask;
        vm.saveTask = saveTask;
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
        function saveTask() {

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
            sessionStorage.removeItem("mairuprice");
            sessionStorage.removeItem("maichu");
        }
    }
})();