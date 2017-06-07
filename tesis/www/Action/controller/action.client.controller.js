angular.module('starter.action', ['starter.Service', 'ionic', 'ngDraggable'])

  .controller('actionController', ['$scope', 'octaveService', '$ionicPopup', '$stateParams', 'ngDraggable',
    function($scope, octaveService, $ionicPopup, $stateParams, ngDraggable) {

      $scope.red = "background-color:red";
      $scope.yellow = "background-color:yellow";
      $scope.green = "background-color:green";
      $scope.getActions = function() {
        octaveService.getAction().then(function(actions) {
          $scope.actions = actions.data;
          console.log("$scope.actions",$scope.actions);
        });
      };

      $scope.set_color = function(item){
        if(item.grupo === 'Grupo 1'){
          return {"background-color":"red"}
        }else if(item.grupo === 'Grupo 2'){
          return {"background-color":"yellow"}
        }else{
          return {"background-color":"green"}
        }
      }

      $scope.getActions();
    }]);
