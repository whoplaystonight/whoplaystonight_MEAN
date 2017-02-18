(function () {
  'use strict';

  angular
    .module('app.layout')
    .controller('MenuController', MenuController);

  MenuController.$inject = ['$state', 'routerHelper', '$rootScope', 'dataservice', '$q', 'logger', '$translate', '$translatePartialLoader'];
  /* @ngInject */
  function MenuController($state, routerHelper, $rootScope, dataservice, $q, logger, $translate, $translatePartialLoader) {
    var vm = this;
    $translatePartialLoader.addPart('layout');
    var states = routerHelper.getStates();
    vm.isCurrent = isCurrent;
    vm.logout = logout;
    vm.setLang = setLang;
    activate();

    function activate() {
      getNavRoutes();

      var promises = [getAuthUser()];
      return $q.all(promises).then(function(){
          logger.info('Activated layout view');
      });
    }

    function getNavRoutes() {
      vm.navRoutes = states.filter(function (r) {
        return r.settings && r.settings.nav;
      }).sort(function (r1, r2) {
        return r1.settings.nav - r2.settings.nav;
      });
    }

    function isCurrent(route) {
      if (!route.title || !$state.current || !$state.current.title) {
        return '';
      }
      var menuName = route.title;
      return $state.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
    }

    function getAuthUser() {
      return dataservice.isLoggedin().then(function (data) {
        console.log("GetAuthUser");
        $rootScope.authUser = data;
        return $rootScope.authUser;
      });
    }

    function logout() {
      console.log("LogOut");
      return dataservice.logout().then(function (data) {
        $rootScope.authUser = undefined;
        return $rootScope.authUser;
      });
    }

    function setLang(langKey) {
      // You can change the language during runtime
      $translate.use(langKey);
    };
  }

})();
