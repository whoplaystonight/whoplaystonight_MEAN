(function(){
  'use strict';

  angular
  .module('app.locate')
  .controller('LocateController',LocateController);

  LocateController.$inject=['$q','dataservice','logger'];

  function LocateController($q,dataservice,logger){
    var vm=this;
    vm.title='Locate';
    //Map centered on spain
    vm.map = { center: { latitude: 39.5770969, longitude: -3.5280415 }, zoom: 6 };

    activate();

    function activate(){
      logger.info('Activated Locate View');
    }
  }
})();
