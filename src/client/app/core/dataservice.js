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
            SignIn: SignIn
        };

        return service;

        function sendemail(data) {
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

        function SignIn(data) {
            return $http.post('/api/signin',data)
                    .then(success)
                    .catch(fail);
            
            function success(response) {
                return response;
            }
            
            function fail() {
                return false; 
           }
        }

        function checkLoggedin() {
            return $http.get('/api/loggedin')
                .then(success)
                .catch(fail);

            function success(responseUser) {
                console.log('success:');
                console.log(responseUser);
                if (responseUser.data === '0') {
                    $rootScope.authUser = false;
                    $state.go('loginpage');
                    //  $state.go('login');
                } else {
                    console.log('else:');
                    console.log(responseUser.data);
                    $rootScope.authUser = responseUser.data;
                }
            }
            function fail(e) {
                console.log('fail:');
                console.log(e);
                return exception.catcher('XHR Failed for /api/loggedin')(e);
            }
        }

        function isLoggedin() {
            return $http.get('/api/loggedin')
                .then(success)
                .catch(fail);

            function success(responseUser) {
                if (responseUser.data === '0') {
                    $rootScope.authUser = false;
                    return false;
                } else {
                    $rootScope.authUser = responseUser.data;
                    return responseUser.data;
                }
            }

            function fail(e) {
                return exception.catcher('XHR Failed for /api/loggedin')(e);
            }
        }
    }

})();
