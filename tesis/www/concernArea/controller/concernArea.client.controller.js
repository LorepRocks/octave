angular.module('starter.concernArea', ['starter.Service', 'ionic'])

  .controller('concernAreaController', ['$scope', 'octaveService', '$ionicPopup', '$stateParams', '$ionicModal','$location',
    function($scope, octaveService, $ionicPopup, $stateParams, $ionicModal,$location) {

      $scope.getConcernAreas = function() {
        octaveService.getConcernAreas().then(function(areas) {
          $scope.areas = areas.data;
        });
      };

      $scope.getConcernAreas();

      $scope.addConcern = function(){
        $location.path('/documentArea');
      }

      $scope.view = function(area){
        octaveService.getConsequences(area.id).then(function(consequences) {
          area.consequences = consequences.data;
        });
        octaveService.setDataConcern(area);
        $location.path('/documentArea');
      }
    }]);
