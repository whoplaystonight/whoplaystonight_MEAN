(function(){
  'use strict';
  angular
  .module('app.locate')
  .run(appRun);

  appRun.$inject=['routerHelper'];

  function appRun(routerHelper){
    routerHelper.configureStates(getStates());
  }

  function getStates(){
    return[
      {
        state:'locate',
        config:{
          url:'/locate',
          templateUrl:'app/locate/locate.html',
          controller:'LocateController',
          controllerAs:'vm',
          title:'Locate',
          settings:{
            nav:5,
            content:'Locate'
          }//end_settings
        }//end_config
      }//end of state locate
      // ,{
      //   state:'locate.details',
      //   config:{
      //     url:'/{eventId}',
      //     templateUrl:'app/locate/locate.html',
      //     controller:'LocateController',
      //     controllerAs:'vm',
      //     resolve:{
      //         details: function(LocateService){
      //         return LocateService.getEvent();
      //       }//end of data
      //     }//end of resolve
      //   }//end config
      // }//end of state
    ];//end_return
  }//end_function
})();//end clousure
