(function(){
  'use strict';

  angular
  .module('app.locate')
  .controller('LocateController',LocateController);

  LocateController.$inject=['logger'];
  
  function LocateController(logger){
    var vm=this;
    vm.title='Locate';

    activate();

    function activate(){
      logger.info('Activated Locate View');
    }
  }
})();
