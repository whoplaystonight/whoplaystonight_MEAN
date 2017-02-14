(function() {
    'use strict';

    angular
    .module('app.contact')
    .controller('ContactController', ContactController);

    ContactController.$inject = ['$q','dataservice', '$state', '$timeout', 'logger'];
    /* @ngInject */
    function ContactController($q,dataservice, $state, $timeout, logger) {
        var vm = this;
        vm.title = 'Contact';
        vm.inputName = '';
        vm.inputEmail = '';
        vm.inputSubject = '';
        vm.inputMessage = '';
        vm.sendContact = sendContact;

        activate();

        function activate(){
          var promises =[];
          return $q.all(promises).then(function() {
          logger.info('Activated Contact View');
          });
        }//end of activate

        function sendContact() {
            var data = {
                name: vm.inputName,
                from: vm.inputEmail,
                to: 'whoplaystonight@gmail.com',
                subject: vm.inputSubject,
                text: vm.inputMessage,
                messageDirection: 'to_admin',
            };

            dataservice.sendemail(data).then(function (response) {
                console.log("sendemail");
                if (response) {
                    console.log("true");

                    // Second email:
                    var data2 = {
                        name: vm.inputName,
                        from: vm.inputEmail,
                        to: 'whoplaystonight@gmail.com',
                        subject: vm.inputSubject,
                        text: vm.inputMessage,
                        messageDirection: 'to_user',
                    };
                    dataservice.sendemail(data2).then(function (response) {
                        console.log("sendemail");
                        if (response) {
                            console.log("true");
                            vm.inputName = '';
                            vm.inputEmail = '';
                            vm.inputSubject = '';
                            vm.inputMessage = '';
                        } else {
                            console.log("false");
                            logger.error("Error sending the email, try later");
                        }
                    });

                    logger.success("The email has been sent");
                    vm.inputName = '';
                    vm.inputEmail = '';
                    vm.inputSubject = '';
                    vm.inputMessage = '';
                    $timeout(function () {
                        $state.go('main');
                    }, 3000);


                } else {
                    console.log("false");
                    logger.error("Error sending the email, try later");
                }
            });
        }

    }
    
})();
