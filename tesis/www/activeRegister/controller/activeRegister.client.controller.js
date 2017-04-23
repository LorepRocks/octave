angular.module('starter.activeRegister', ['starter.Service', 'ionic'])

  .controller('activeRegisterController', ['$scope', 'octaveService', '$ionicPopup', '$stateParams',
    function($scope, octaveService, $ionicPopup, $stateParams) {

      console.log(octaveService);
      $scope.desc = "";
      $scope.types = [{
          name: "físico"
        }, {
          name: "información dígital"
        }, {
          name: "inmueble"
        },
        {
          name: "Información Física"
        }, {
          name: "Mueble"
        }
      ];

      $scope.saveActive = function() {
        $scope.active = {
          name: $scope.activeName,
          description: $scope.activeDescription,
        };
        octaveService.activeRegister($scope.active).then(function(response) {
          $scope.showAlert(response.message);
        });

      };

      $scope.clean = function() {
        $scope.activeName = "";
        $scope.activeDescription = "";
      }

      $scope.showAlert = function(msg) {
        var alertPopup = $ionicPopup.alert({
          template: msg
        });
        alertPopup.then(function(res) {
          $scope.clean();
        });
      };
    }
  ]);
