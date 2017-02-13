(function() {
  'use strict';

  angular
    .module('app.users')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'signup',
        config: {
          url: '/signup',
          templateUrl: 'app/users/signup.html',
          controller: 'SignUpController',
          controllerAs: 'vm',
          title: 'SignUp',
        }
      },
      {
        state: 'signin',
        config: {
          url: '/signin',
          templateUrl: 'app/users/signin.html',
          controller: 'SignUpController',
          controllerAs: 'vm',
          title: 'SignIn',
        }
      },
      {
        state: 'socialsignin',
        config: {
          url: '/socialsignin',
          controller: 'SocialController'
        }
      }
    ];
  }
})();
