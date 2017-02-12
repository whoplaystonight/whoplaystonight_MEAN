(function(){
  'use strict';

  angular
  .module('app.locate')
  .controller('LocateController',LocateController)
  .controller('ModalInstanceCtrl',ModalInstanceCtrl);

  /*To inject controller dependencies*/
  LocateController.$inject=['$q','dataservice','logger','$uibModal','$scope'];

  /*State LocateController*/
  function LocateController($q,dataservice,logger,$uibModal,$scope){

    var vm=this;
    vm.title='Locate';

    /*Map centered on spain*/
    vm.map = { center: { latitude: 39.5770969, longitude: -3.5280415 }, zoom: 10 };

    /*To state an open the events details modal*/
    vm.showDetails=showDetails;

    /*Array that contains the coordinates of the events,which are passed to the
    map to show the markers*/
    vm.eventsMarkers=[];

    /*To add the click event to each map marker*/
    vm.clickMarker={
      click:function(marker){
        getEvent(marker.key);
        showDetails(vm.details);
      }
    };

    /*Pagination variables and functions*/
    vm.totalItems=14;
    vm.currentPage = 1;
    // vm.itemsPerPage=vm.viewby;
    vm.itemsPerPage=7;
    vm.pageChanged = function() {
      update();
    };
    function update(){
       var begin =(( vm.currentPage  -1) * vm.itemsPerPage),
          end = begin + vm.itemsPerPage;
          vm.filteredEvents=vm.events.slice(begin, end);
    }

    // vm.setItemsPerPage=function(num){
    //   vm.itemsPerPage=num;
    //   // vm.currentPage=1;
    // };

    /*Call to activate function which return a promise to claim that several
    data are shown in templete*/
    activate();
    function activate(){
      var promises =[getLocation(),getEvents()];
      return $q.all(promises).then(function() {
      logger.info('Activated Locate View');
      });
    }//end of activate

    /*To get the browser location and center the map on this*/
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
              icon:'images/map-pin.ico'
            }//end of coords
          };//end of vm.location
          vm.map.center.latitude=vm.location.coords.latitude;
          vm.map.center.longitude=vm.location.coords.longitude;
        }//end of function data
      );//enf of return dataservice
    }//end of getLocation

    /* To get the events from datbase*/
    function getEvents() {
      // console.log('Estic al getEvents del controller');
      return dataservice.getEvents().then(function(data) {
        // console.log(data);
        vm.events = data;
        // console.log(vm.events.length);
        update();
        getEventLocation();
        return vm.events;
      });
    }

    /*To extract each event form the events array*/
    function getEvent(id){
      // console.log('Estic al getDetails');
      for (var i in vm.events){
        if(id===vm.events[i].event_id){
            vm.details=vm.events[i];
        }
      }
      return vm.details;
    }//end of getDetails
    /*To extract the event coordinates and show the markers on the map*/
    function getEventLocation(){
      for (var i in vm.events){
        vm.eventsMarker={ id:vm.events[i].event_id,
                          latitude:vm.events[i].latitud,
                          longitude:vm.events[i].longitud,
                          icon:'images/EventLocation.ico'
                        };
        vm.eventsMarkers.push(vm.eventsMarker);
      }
      // console.log(vm.eventsMarkers);
      return vm.eventsMarkers;
    }//end of getEventsLocation

    function showDetails(event){
        $uibModal.open({
          templateUrl:'app/locate/details.html',
          controller:['$uibModalInstance','events','event',ModalInstanceCtrl],
          controllerAs:'vm',
          size:'lg',
          backdrop:'true',
          resolve:{
            events:function(){ return vm.events},
            event: function(){ return event;}
          }
        });//end ModalInstance
      // };//end open
    }//end of showDetails

  }//end of controller

  /*To state the modal controller*/
  function ModalInstanceCtrl($uibModalInstance, events, event){
    // console.log(event);
    var vm=this;
    vm.events=events;
    vm.event=event;
  }


})();//end of clousure
