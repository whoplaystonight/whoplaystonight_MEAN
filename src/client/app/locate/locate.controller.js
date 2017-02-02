(function(){
  'use strict';

  angular
  .module('app.locate')
  .controller('LocateController',LocateController);

  LocateController.$inject=['$q','dataservice','logger'];



  function LocateController($q,dataservice,logger){

    var vm=this;
    vm.title='Locate';
    vm.location=0;


    /*Nomes declarar per a gastar en la vista
    vm.getLocation=getLocation;*/

  function getLocation(){
    return dataservice.getLocation().then(
      function (data){
        vm.location={
          id:0,
          coords:{
            latitude:data.coords.latitude,
            longitude:data.coords.longitude
          }//end of coords
        };//end of vm.location
        vm.map.center.latitude=vm.location.coords.latitude;
        vm.map.center.longitude=vm.location.coords.longitude;
      }//end of function data
    );//enf of return dataservice
  }//end of getLocation



    //Map centered on spain
    vm.map = { center: { latitude: 39.5770969, longitude: -3.5280415 }, zoom: 10 };
    // vm.marker={
    //   id:0,
    //   // coords: {latitude:39.5770969,
    //   //           longitude:-3.5280415}
    //   };

    activate();

    function activate(){
      var promises =[getEvents(),getLocation()];
      return $q.all(promises).then(function() {
      logger.info('Activated Locate View');
      });
    }//end of activate

    function getEvents() {
      // console.log('Estic al getEvents del controller');
      return dataservice.getEvents().then(function(data) {
        // console.log(data);
        vm.events = data;
        return vm.events;
      });
    }

  }//end of controller

})();//end of clousure
