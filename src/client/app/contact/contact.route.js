(function(){
  'use strict';

  angular
    .module('app.contact')
    .run(appRun);

    appRun.$inject=['routerHelper'];

    function appRun(routerHelper){
      routerHelper.configureStates(getStates());
    }

    function getStates(){
      return[
        {
          state:'contact',
          config:{
            url:'/contact',
            templateUrl: 'app/contact/contact.html',
            controller:'ContactController',
            controllerAs:'vm',
            title:'Contact',
            settings: {
              nav:3,
              content:'<i class="fa fa-lock"></i> Contact'
            }
          }
        }];
    }
})();
