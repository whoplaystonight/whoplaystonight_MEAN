(function () {
  'use strict';

  var core = angular.module('app.core');

  core.config(toastrConfig);

  toastrConfig.$inject = ['toastr'];
  /* @ngInject */
  function toastrConfig(toastr) {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';
  }

  var config = {
    appErrorPrefix: '[Who_plays_tonight? Error] ',
    appTitle: 'Who_plays_tonight?'
  };

  core.value('config', config);

  core.config(configure);

  configure.$inject = ['$translatePartialLoaderProvider', '$translateProvider', '$logProvider',
    'routerHelperProvider', 'exceptionHandlerProvider'];
  /* @ngInject */
  function configure($translatePartialLoaderProvider, $translateProvider, $logProvider,
    routerHelperProvider, exceptionHandlerProvider) {

    $translateProvider.registerAvailableLanguageKeys(['es', 'en'], {
      'es-ES': 'ca',
      'en-US': 'en'
    });

    $translatePartialLoaderProvider.addPart('core');
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: '/i18n/{part}/{lang}.json',
      loadFailureHandler: 'MyErrorHandler'
    });
    $translateProvider.useCookieStorage();

    $translateProvider
      .determinePreferredLanguage()
      .fallbackLanguage('en')
      .useSanitizeValueStrategy(null);

    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }
    exceptionHandlerProvider.configure(config.appErrorPrefix);
    routerHelperProvider.configure({ docTitle: config.appTitle + ': ' });
  }

})();
