angular.module('starter.concernArea', ['starter.Service', 'ionic'])

  .controller('concernAreaController', ['$scope', 'octaveService', '$ionicPopup', '$stateParams', '$ionicModal', '$location', '$timeout',
    function($scope, octaveService, $ionicPopup, $stateParams, $ionicModal, $location, $timeout) {

      $scope.getConcernAreas = function() {
        octaveService.getConcernAreas().then(function(areas) {
          $scope.areas = areas.data;
        });
      };

      $scope.getConcernAreas();

      $scope.addConcern = function() {
        $location.path('/documentArea');
      }

      

      $scope.view = function(area) {
        console.log("view", area);
        octaveService.getConsequences(area.id).then(function(consequences) {
          area.consequences = consequences.data;
        });
        $timeout(function() {
          octaveService.setDataConcern(area);
          $location.path('/documentArea');
        }, 30)

      }
    }
  ]);
