(function() {
  'use strict';

  angular
    .module('app.users')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['logger'];
  /* @ngInject */
  function SignUpController(logger) {
    var vm = this;
    vm.title = 'SignUp';

    activate();

    function activate() {
      logger.info('Activated SignUp View');
    }
  }
})();
