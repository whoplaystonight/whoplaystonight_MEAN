(function(){
  'use stric';

  angular
    .module('app.widgets')
    .factory('modalFactory',modalFactory)
    .controller('modalController',modalController)
    .controller('modalInstanceCtrl', modalInstanceCtrl);


    modalFactory.$inject=['$uiModal'];

    function modalFactory($uibModal){
        return{
          open:function(size, template, params){
            return $uibModal.open({
              animation:true,
              templateUrl:template || 'modalContent.html',
              controller: 'ModalResultInstanceCtrl',
              size:size,
              resolve:{
                params: function(){
                  return params;
                }//end of params function
              }//end of resolve
            });//enf of $uibModal.open
          }//nd of open
        };//end of return
    }//en of modalFactory

    modalController.$inject=['$rootScope', '$scope', '$log','$uiModal'];

    function modalController($rootScope, $scope, $log, $uibModal){
      $scope.open=function(size,template){
        var modalInstance=$uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl:template || 'myModalContent.html',
          controller: 'modalInstanceCtrl',
          size:size
        });//end of modalInstance
      };//end of $scope.open

      $scope.toggleAnimation= function(){
        $scope.animationEnabld=!$scope.animationEnabled;
      };

    }//end of modalController

    modalInstanceCtrl.$inject=['$scope', '$uibModalInstance','modalFactory'];

    function modalInstanceCtrl($scope, $uibModalInstance,modalFactory){

    }





})();//end of clousure
