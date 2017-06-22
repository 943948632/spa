(function() {
    'use strict';

    angular.module('app.deltawthd')
        .controller('EventFormDialogController', EventFormDialogController);


    function EventFormDialogController($mdDialog, dialogData) {
        var vm = this;
        vm.saveEvent = saveEvent;
        vm.removeEvent = removeEvent;
        vm.closeDialog = closeDialog;




        function saveEvent() {


            $mdDialog.hide(response);
        }


        function removeEvent() {


            $mdDialog.hide(response);
        }


        function closeDialog() {
            $mdDialog.cancel();
        }
    }
})();