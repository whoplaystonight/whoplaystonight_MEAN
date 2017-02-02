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
          title:'Contact',
          settings:{
            nav:5,
            content:'<i class="fa fa-lock"></i> Locate'
          }//end_settings
        }//end_config
      }];//end_return
  }//end_function
})();//end clousure
