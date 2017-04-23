angular.module('starter.criticalActive', ['starter.Service', 'ionic'])

  .controller('criticalActiveController', ['$scope', 'octaveService', '$ionicPopup', '$stateParams',
    function($scope, octaveService, $ionicPopup, $stateParams) {

      $scope.loadData = function() {
        $scope.getActives();
      }
      

      $scope.getActives = function() {
        octaveService.getActives().then(function(actives) {
          $scope.actives = actives.data;
        });
      };

      $scope.saveCriticalActive = function() {
        var criticalActive = {
          active: $scope.active,
          justification: $scope.justification,
          description: $scope.description,
          confidentiality: $scope.confidentiality,
          integrity: $scope.integrity,
          availability: $scope.availability,
          requirements: $scope.requirement,
          owners: $scope.owners
        }
        octaveService.saveCriticalActive(criticalActive).then(function(response) {
          $scope.showAlert(response.data.message);
          $scope.cleanFields();
        });
      };

      $scope.cleanFields = function() {
        $scope.active = {};
        $scope.justification = "";
        $scope.description = "";
        $scope.confidentiality = "";
        $scope.integrity = "";
        $scope.availability = "";
        $scope.requirement = "";
        $scope.owners = "";
      }

      $scope.showAlert = function(msg) {
        var alertPopup = $ionicPopup.alert({
          template: msg
        });
        alertPopup.then(function(res) {
          $scope.getImpactArea();
        });
      };
    }
  ]);
