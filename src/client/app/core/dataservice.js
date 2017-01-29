(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$q', 'exception', 'logger'];
  /* @ngInject */
  function dataservice($http, $q, exception, logger) {
    var service = {
      getEvents: getEvents,
      getPeople: getPeople,
      getMessageCount: getMessageCount
    };

    return service;

    function getMessageCount() { return $q.when(72); }

    function getPeople() {
      return $http.get('/api/people')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getPeople')(e);
      }
    }//end of getPeople

    function getEvents() {
      // console.log('Estic al getEvents del dataservice');
      return $http.get('/api/events')
        .then(success)
        .catch(fail);

      function success(response) {
        // console.log(response.data);
        return response.data;

      }

      function fail(e) {
        return exception.catcher('XHR Failed for getEvents')(e);
      }
    }//end of getPeople
  }//End of dataservice function

})();//end of clousure
