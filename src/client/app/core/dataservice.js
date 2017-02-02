(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$window','$http', '$q', 'exception', 'logger'];
  /* @ngInject */
  function dataservice($window,$http, $q, exception, logger) {
    var service = {
      getEvents: getEvents,
      // getPeople: getPeople,
      // getMessageCount: getMessageCount,
      getLocation: getLocation
    };

    return service;

    // function getMessageCount() { return $q.when(72); }

    function getLocation(){
        var deferred=$q.defer();
        if(!$window.navigator.geolocation){
          deferred.reject('Geolocation is not supported by your browser ');
        }else{
          $window.navigator.geolocation.getCurrentPosition(
            function(position){
              deferred.resolve(position);
            },//end of function(position)
            function(err){
              deferred.reject(err);
            }//end of function(err)
          );//en of .getCurrentPosition
        }//end of ifelse
        return deferred.promise;
    }//end of getLocation

    // function getPeople() {
    //   return $http.get('/api/people')
    //     .then(success)
    //     .catch(fail);
    //
    //   function success(response) {
    //     return response.data;
    //   }
    //
    //   function fail(e) {
    //     return exception.catcher('XHR Failed for getPeople')(e);
    //   }
    // }//end of getPeople

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
