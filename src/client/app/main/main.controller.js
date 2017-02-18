(function() {
  'use strict';

  angular
    .module('app.main')
    .controller('MainController', MainController);

  MainController.$inject = ['logger', '$translatePartialLoader'];
  /* @ngInject */
  function MainController(logger, $translatePartialLoader) {
    var vm = this;
    $translatePartialLoader.addPart('main');
    vm.title = 'Main';
     
    activate();

    function activate() {
      logger.info('Activated Main View');
    }
  }
})();
