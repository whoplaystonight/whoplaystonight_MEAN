(function(){
  'use strict';

  angular
    .module('app.widgets')
    .controller('ModalController', ModalController)
    .controller('ModalInstanceCtrl',ModalInstanceCtrl);

    ModalController.$inject=['$uibModal'];

    function ModalController($uibModal,$log){
      var vm=this;
      vm.animationsEnabled=true;
      vm.open=function(size){
        var modalInstance=$uibModal.open({
          animation:vm.animationsEnabled,
          templateUrl:'details.hmtl',
          controller:'ModalInstanceCtrl',
          size:size,
          resolve:{
            items:function(){
              return vm.items;
            }//end items
          }//end resolve
        });//end ModalInstance
        modalInstance.result.then(function(selectedItem){
          vm.selected=selectedItem;
        },function(){
          $log.info('Modal dismisses at: ' +new Date());
        });
      };//end open

      vm.toggleAnimation = function(){
        vm.animationsEnabled=!vm.animationsEnabled;
      };
    }//end of ModalController

    function ModalInstanceCtrl($scope,$modalInstance,items){
      $scope.ok=function(){
        $modalInstance.close($scope.selected.item);
      };

      $scope.cancel=function(){
        $modalInstance.dismiss('cancel');
      };
    }

})();
