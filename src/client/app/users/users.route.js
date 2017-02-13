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

          settings: {
            nav: 6,
            content: '<img src="../images/Sign_up.svg" alt="Sign_up"/>'
          }

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

          settings: {
            nav: 7,
            content: '<img src="../images/Sign_in.svg" alt="Sign_in"/>'
          }
        }
      }
    ];
  }
})();
