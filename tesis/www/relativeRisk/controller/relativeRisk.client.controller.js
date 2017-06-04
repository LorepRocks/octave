angular.module('starter.relativeRisk', ['starter.Service', 'ionic'])

  .controller('relativeRiskController', ['$scope', 'octaveService', '$ionicPopup', '$stateParams', '$ionicSlideBoxDelegate', '$timeout', '$ionicModal',
    function($scope, octaveService, $ionicPopup, $stateParams, $ionicSlideBoxDelegate, $timeout, $ionicModal) {

      $scope.getRelativeRisk = function() {
        octaveService.getRelativeRisk().then(function(relativeRisk) {
          $scope.relativeRisk = relativeRisk.data;
          console.log("$scope.relativeRisk",$scope.relativeRisk);
        });
      };

      $scope.getRelativeRisk();
    }]);
