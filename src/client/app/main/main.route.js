(function(){
  'use strict';

  angular
    .module('app.main')
    .run(appRun);

    appRun.$inject=['routerHelper'];

    function appRun(routerHelper){
      routerHelper.configureStates(getStates());
    }

    function getStates(){
      return[
        {
          state:'main',
          config:{
            url:'/',
            templateUrl: 'app/main/main.html',
            controller:'MainController',
            controllerAs:'vm',
            title:'Main',
            settings: {
              nav:1,
              content:'<img src="../images/Home.svg" alt="home"/>'
            }//end_settings
          }//end_config
        }
      ];//end_return
    }//end_function
})();
