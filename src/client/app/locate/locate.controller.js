(function(){
  'use strict';

  angular
  .module('app.locate')
  .controller('LocateController',LocateController);

  LocateController.$inject=['$q','dataservice','logger'];

  function LocateController($q,dataservice,logger){

    var vm=this;
    vm.title='Locate';
    // vm.events=[];
    vm.eventMarker={};
    vm.eventsMarkers=[];
    // vm.details=details;

    /*Nomes declarar si es te que gastar en la vista
    vm.getLocation=getLocation;*/

    //Map centered on spain
    vm.map = { center: { latitude: 39.5770969, longitude: -3.5280415 }, zoom: 10 };
    vm.getEvent=getEvent;
    // vm.showDetails=showDetails;

    activate();

    function activate(){
      var promises =[getLocation(),getEvents()];
      return $q.all(promises).then(function() {
      logger.info('Activated Locate View');
      });
    }//end of activate

    function getLocation(){
      return dataservice.getLocation().then(
        function (data){
          vm.location={
            id:0,
            coords:{
              latitude:data.coords.latitude,
              longitude:data.coords.longitude
            },
            options:{
              icon:'images/Location.ico'
            }//end of coords
          };//end of vm.location
          vm.map.center.latitude=vm.location.coords.latitude;
          vm.map.center.longitude=vm.location.coords.longitude;
        }//end of function data
      );//enf of return dataservice
    }//end of getLocation


    function getEvents() {
      // console.log('Estic al getEvents del controller');
      return dataservice.getEvents().then(function(data) {
        // console.log(data);
        vm.events = data;
        getEventLocation();
        return vm.events;
      });
    }

    function getEvent(item){
      console.log('Estic al getEvent');
        return serviceEvent(item).then(
          function(data){
            vm.event=data;
          }
        );
    }//end of getEvent

    function serviceEvent(item){
      console.log('Estic al serviceEvent');
      var deferred=$q.defer();
      getDetails(item,
        function(vmEvent){
        deferred.resolve(vmEvent);
        },
        function(err){
          deferred.reject(err);
        }//end of function(err)
      );//end of getEvent
      return deferred.promise;
    }//End of promiseEvent


    function getDetails(item){
      console.log('Estic al getDetails');
      var id=item.currentTarget.getAttribute('id');
      for (var i in vm.events){
        if(id===vm.events[i].event_id){
            vm.details=vm.events[i];
        }
      }
      console.log(vm.details);
      return vm.details;
    }//end of getEvent



    function getEventLocation(){
      for (var i in vm.events){
        vm.eventsMarker={ id:i,
                          latitude:vm.events[i].latitud,
                          longitude:vm.events[i].longitud };
        vm.eventsMarkers.push(vm.eventsMarker);
      }
      // console.log(vm.eventsMarkers);
      return vm.eventsMarkers;
    }//end of getEventsLocation

  }//end of controller

})();//end of clousure
