(function() {
    'use strict';

    angular
        .module('app.contacts')
        .controller('ContactDialogController', ContactDialogController);

    /** @ngInject */
    function ContactDialogController($mdDialog, Contact, Contacts, User, msUtils, $http) {
        var vm = this;
        console.log($mdDialog + "===" + Contact + "====" + Contacts + "===" + User + "===" + msUtils);

        // Data
        vm.title = '查看大盘';
        vm.gusymbol = sessionStorage.getItem("gusymbol");


        vm.contact = angular.copy(Contact);
        vm.contacts = Contacts;
        vm.user = User;
        vm.newContact = false;
        vm.allFields = false;

        if (!vm.contact) {
            vm.contact = {
                'id': msUtils.guidGenerator(),
                'name': '',
                'lastName': '',
                'avatar': 'assets/images/avatars/profile.jpg',
                'nickname': '',
                'company': '',
                'jobTitle': '',
                'email': '',
                'phone': '',
                'address': '',
                'birthday': null,
                'notes': ''
            };


            vm.newContact = true;
            vm.contact.tags = [];
        }

        // Methods
        vm.addNewContact = addNewContact;
        vm.addContact = addContact;
        vm.dealContact = dealContact;
        vm.deleteContactConfirm = deleteContactConfirm;
        vm.closeDialog = closeDialog;
        vm.toggleInArray = msUtils.toggleInArray;
        vm.exists = msUtils.exists;

        //////////

        /**
         * Add new contact
         */
        function addNewContact() {
            vm.contacts.unshift(vm.contact);

            closeDialog();
        }

        /**
         * ADD contact 添加自选股
         */
        function addContact(a) {
            var guid = sessionStorage.getItem("guid");
            var token = sessionStorage.getItem("Token");
            $http({
                url: 'https://staging.tophold.com/api/v2/likes',
                method: 'POST',
                data: { "obj_type": "product", "obj_id": guid },
                headers: { "X-Access-Token": token }

            }).success(function(data) {
                vm.success = "自选股添加成功"
                    // setTimeout(function() {
                    //     closeDialog();
                    // }, 3000);


            }).error(function(data) {
                vm.success = "稍后重试 ..."
            });
        }
        // 交易
        function dealContact(ev, task, a, current_price) {
            alert("交易了");
            //sessionStorage.removeItem("id");
            $mdDialog.show({
                controller: 'TaskDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/quick-panel/dialogs/task/task-dialog.html',
                // parent: angular.element($document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                locals: {
                    Task: task,
                    Tasks: vm.tasks,
                    event: ev,
                    current_price: current_price

                }

            });
        }

        /**
         * Delete Contact Confirm Dialog
         */
        function deleteContactConfirm(ev) {
            var confirm = $mdDialog.confirm()
                .title('Are you sure want to delete the contact?')
                .htmlContent('<b>' + vm.contact.name + ' ' + vm.contact.lastName + '</b>' + ' will be deleted.')
                .ariaLabel('delete contact')
                .targetEvent(ev)
                .ok('OK')
                .cancel('CANCEL');

            $mdDialog.show(confirm).then(function() {

                vm.contacts.splice(vm.contacts.indexOf(Contact), 1);

            });
        }

        /**
         * Close dialog
         */
        function closeDialog() {
            $mdDialog.hide();
        }

    }
})();