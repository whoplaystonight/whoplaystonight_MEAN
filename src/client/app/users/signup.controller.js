(function () {
    'use strict';

    angular
        .module('app.users')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['logger', 'dataservice', '$state', '$timeout', '$rootScope'];
    /* @ngInject */
    function SignUpController(logger, dataservice, $state, $timeout, $rootScope) {
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
                    $timeout(function () {
                        $state.go('main');
                    }, 3000);
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
                console.log(response);
                if (response.data.username === vm.username) {
                    logger.success('Logged In');
                    $rootScope.authUser = response.data;
                    console.log(response.data);
                    $timeout(function () {
                        $state.go('main');
                    }, 3000);
                } else if (response.data === 'errorcredentials') {
                    logger.error('User or password wrong');
                } else {
                    logger.error('Server error, try again');
                }

            });
        }

    }
})();