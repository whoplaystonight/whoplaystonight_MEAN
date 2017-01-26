(function() {
  'use strict';

  angular
    .module('app.main')
    .controller('MainController', MainController);

  MainController.$inject = ['logger'];
  /* @ngInject */
  function MainController(logger) {
    var vm = this;
    vm.title = 'Main';

    activate();

    function activate() {
      logger.info('Activated Main View');
    }
  }
})();
