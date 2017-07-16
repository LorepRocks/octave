angular.module('starter.relativeRisk', ['starter.Service', 'ionic'])

  .controller('relativeRiskController', ['$scope', 'octaveService', '$ionicPopup', '$stateParams', '$ionicSlideBoxDelegate', '$timeout', '$ionicModal',
    function($scope, octaveService, $ionicPopup, $stateParams, $ionicSlideBoxDelegate, $timeout, $ionicModal) {

      $scope.getRelativeRisk = function() {
        octaveService.getRelativeRisk().then(function(relativeRisk) {
          $scope.relativeRisk = relativeRisk.data;
          for(var i=0; i<relativeRisk.data.length;i++ ){
            relativeRisk.data[i].size = relativeRisk.data[i].name.length;
          }
          console.log("$scope.relativeRisk",$scope.relativeRisk);
        });
      };

      $scope.getRelativeRisk();
    }]);
