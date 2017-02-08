(function () {
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
        vm.rpassword = '';
        vm.submitSignUpForm = submitSignUpForm;
        vm.submitSignInForm = submitSignInForm;

        activate();

        function activate() {
            logger.info('Activated SignUp View');
        }

        function submitSignUpForm() {
            var datauser = {
                'username': vm.username,
                'email': vm.email,
                'password': vm.password
            }
            var datausertojson = JSON.stringify(datauser);
            console.log(datausertojson)
            dataservice.SignUp(datausertojson).then(function (response) {
                console.log(response)
                if (response == true) {
                    logger.success("Registered user correctly");
                } else {
                    logger.error("An error has occurred");
                }
            });
        }

        function submitSignInForm() {
            var data = {
                'username': vm.username,
                'password': vm.password
            };

            var dataUserJSON = JSON.stringify(data);

            dataservice.SignIn(dataUserJSON).then(function (response) {
                // if (response.data.user === vm.inputUser) {

                //     logger.success('Logged In');
                //     cookiesService.SetCredentials(response.data);
                //     // $uibModalInstance.dismiss('cancel');
                //     // headerService.login();
                //     $state.go('home');
                // } else if (response.data === 'errorcredentials') {

                //     logger.error('Error en las credenciales, el usuario o la contraseña no son correctos');
                // } else {

                //     logger.error('Error en el server');
                // }

            });
        }

    }
})();
