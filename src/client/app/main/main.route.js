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
            url:'/home',
            templateUrl: 'app/main/main.html',
            controller:'MainController',
            controllerAs:'vm',
            title:'Main',
            settings: {
              nav:2,
              content:'<i class="fa fa-lock"></i> Home'
            }//end_settings
          }//end_config
        }
      ];//end_return
    }//end_function
})();
