(function() {
  'use strict';

  angular
    .module('app.users')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['logger', 'dataservice', '$state', '$timeout'];
  /* @ngInject */
  function SignUpController(logger, dataservice, $state, $timeout) {
    var vm = this;
    vm.title = 'SignUp';
    vm.username = '';
    vm.email = '';
    vm.password = '';
    vm.rpasswordd = '';
    vm.submitSignUpForm = submitSignUpForm;

    activate();

    function activate() {
      logger.info('Activated SignUp View');
    }

    function submitSignUpForm() {
        var datauser = {
            'username' : vm.username,
            'email': vm.email,
            'password': vm.password
        }
        var datausertojson = JSON.stringify(datauser);
        console.log(datausertojson)
        dataservice.SignUp(datausertojson).then(function (response) {
            console.log(response)
            if(response == true){
                logger.success("Registered user correctly");
                $timeout(function () {
                    $state.go('main');
                }, 3000);
            }else{
                logger.error("An error has occurred");
            }
        });
    }
  }
})();
