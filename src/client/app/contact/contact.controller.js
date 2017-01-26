(function() {
    'use strict';

    angular
    .module('app.contact')
    .controller('ContactController', ContactController);

    ContactController.$inject = ['logger', '$scope'];
    /* @ngInject */
    function ContactController(logger, $scope) {
        var vm = this;
        vm.title = 'Contact';

        activate();

        function activate() {
            logger.info('Activated Contact View');
        }
        $scope.submitForm = function() {

            // check to make sure the form is completely valid
            if ($scope.userForm.$valid) {
                alert('our form is amazing');
            }

        };
    }
})();
