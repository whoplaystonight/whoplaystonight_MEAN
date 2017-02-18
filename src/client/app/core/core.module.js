(function () {
  'use strict';

  angular
    .module('app.core', [
      'ngAnimate', 'ngSanitize',
      'blocks.exception', 'blocks.logger', 'blocks.router',
      'ui.router', 'ngplus', 'LocalStorageModule',
      'pascalprecht.translate', 'ngCookies'
    ])
    .factory('MyErrorHandler', function ($q, $log) {
      return function (part, lang, response) {
        $log.error('The "' + part + '/' + lang + '" part was not loaded. ' + response);
        return $q.when({});
      };
    })
    .run(function ($rootScope, $translate) {
      $rootScope.$on('$translatePartialLoaderStructureChanged', function () {
        console.log('TRANSLATE REFRESH');
        $translate.refresh();
      });
    });
})();
