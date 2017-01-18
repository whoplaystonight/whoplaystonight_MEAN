(function() {
  'use strict';

  angular
    .module('app.contact')
    .controller('ContactController', ContactController);

  ContactController.$inject = ['logger'];
  /* @ngInject */
  function ContactController(logger) {
    var vm = this;
    vm.title = 'Contact';

    activate();

    function activate() {
      logger.info('Activated Contact View');
    }
  }
})();
