(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$window', '$http', '$q', 'exception', 'logger'];
    /* @ngInject */
    function dataservice($window, $http, $q, exception, logger) {

        var service = {
            sendemail: sendemail,
            getEvents: getEvents,
            // getPeople: getPeople,
            // getMessageCount: getMessageCount,
            getLocation: getLocation,
            SignUp: SignUp,
        };

        return service;

        function sendemail(data) {
            console.log(data + 'hi');
            return $http.post('/api/sendemail', data)
                .then(success)
                .catch(fail);

            function success() {
                return true;
            }

            function fail() {
                return false;
            }
        }


        function getLocation() {
            var deferred = $q.defer();
            if (!$window.navigator.geolocation) {
                deferred.reject('Geolocation is not supported by your browser ');
            } else {
                $window.navigator.geolocation.getCurrentPosition(
                    function (position) {
                        deferred.resolve(position);
                    },//end of function(position)
                    function (err) {
                        deferred.reject(err);
                    }//end of function(err)
                );//en of .getCurrentPosition
            }//end of ifelse
            return deferred.promise;
        }//end of getLocation


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
        }//end of getEvents

        // function getMessageCount() { return $q.when(72); }
        //
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

        function SignUp(data) {
            console.log(data);
            return $http.post('/api/signup', data)
                .then(success)
                .catch(fail);

            function success() {
                return true;
            }

            function fail() {
                return false;
            }
        }


    // function getEvent(){
    //
    //   return $http.get('/api/events/:event_id')
    //     .then(success)
    //     .catch(fail);
    //
    //     function success(response){
    //       return response.data;
    //     }
    //
    //     function fail(e){
    //       return exception.catcher('XHR Failed for getEvent')(e);
    //     }
    //
    // }//end of getEvent

    // function getMessageCount() { return $q.when(72); }
    //
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

  }//End of dataservice function

})();//end of clousure
