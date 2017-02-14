(function () {
    'use strict';

    angular
        .module('app.users')
        .controller('SocialController', SocialController);

    SocialController.$inject = ['logger', 'dataservice', '$state', '$timeout', '$rootScope', '$http'];
    /* @ngInject */
    function SocialController(logger, dataservice, $state, $timeout, $rootScope, $http) {

        activate();

        function activate() {
            $http({
                url: '/api/success',
                method: 'GET'
            })
            .then(function(response){
              console.log(response);
                  $rootScope.authUser = response.data;
                  logger.success('Social sign in');
                  $state.go('main');
            })
            .catch(function(fail){
              return false;
            });
        }
    }
})();