(function() {
    'use strict';

    angular
    .module('app.contact')
    .controller('ContactController', ContactController);

    ContactController.$inject = ['dataservice', '$state', '$timeout'];
    /* @ngInject */
    function ContactController(dataservice, $state, $timeout) {
        var vm = this;
        vm.title = 'Contact';
        vm.inputName = '';
        vm.inputEmail = '';
        vm.inputSubject = '';
        vm.inputMessage = '';
        vm.sendContact = sendContact;

        function sendContact() {
            var data = {
                name: vm.inputName,
                from: vm.inputEmail,
                to: 'whoplaystonight@gmail.com',
                subject: vm.inputSubject,
                text: vm.inputMessage,
            };
            console.log("inside");
            console.log(dataservice);
            dataservice.sendemail(data).then(function(response) {
                console.log("sendemail");
                if (response) {
                    console.log("true");
                    vm.resultMessage = 'The email has been sent';
                    vm.inputName = '';
                    vm.inputEmail = '';
                    vm.inputSubject = '';
                    vm.inputMessage = '';
                } else {
                    console.log("false");
                    vm.resultMessage = 'Error sending the email, try later';
                }
            });
        }
    }
})();
