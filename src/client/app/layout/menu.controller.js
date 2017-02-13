(function () {
  'use strict';

  angular
    .module('app.layout')
    .controller('MenuController', MenuController);

  MenuController.$inject = ['$state', 'routerHelper', '$rootScope', 'dataservice'];
  /* @ngInject */
  function MenuController($state, routerHelper, $rootScope, dataservice) {
    var vm = this;
    var states = routerHelper.getStates();
    vm.isCurrent = isCurrent;
    vm.logout = logout;
    activate();

    function activate() { getNavRoutes(); }

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

    function logout() {
      console.log("LogOut");
      return dataservice.logout().then(function (data) {
        $rootScope.authUser = undefined;
        return $rootScope.authUser;
      });
    }

  }

})();
