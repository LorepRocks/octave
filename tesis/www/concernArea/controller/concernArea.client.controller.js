angular.module('starter.concernArea', ['starter.Service', 'ionic'])

  .controller('concernAreaController', ['$scope', 'octaveService', '$ionicPopup', '$stateParams', '$ionicModal', '$location', '$timeout','$ionicPlatform',
    function($scope, octaveService, $ionicPopup, $stateParams, $ionicModal, $location, $timeout,$ionicPlatform) {

      $scope.getConcernAreas = function() {
        octaveService.getConcernAreas().then(function(areas) {
          for(var i=0; i<areas.data.length;i++){
            areas.data[i].size = areas.data[i].name.length;
          }
          console.log("areas.data",areas.data);
          $scope.areas = areas.data;
        });
      };

      $ionicPlatform.registerBackButtonAction(function() {

        $location.path('/home')
      });

      $scope.addConcern = function() {

        $timeout(function() {
          octaveService.setDataConcern({});
          $location.path('/documentArea');
        }, 30)
      }

      $scope.load = function(){
        $scope.getConcernAreas();
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

      $scope.showAlert = function(msg) {
        var alertPopup = $ionicPopup.alert({
          template: msg
        });
        alertPopup.then(function(res) {
          $scope.con = {};
          $scope.getConcernAreas();
          $scope.update = 0;
        });
      };

      $scope.delete = function(id){
        var confirmPopup = $ionicPopup.confirm({
          title: 'Eliminar Área de Preocupación',
          template: 'Está seguro que desea eliminar esta área de Preocupación?',
          buttons: [{
            text: 'Cancelar',
            type: 'button-block button-outline button-stable',
            scope: null,
            onTap: function(e) {
            }
          }, {
            text: 'Aceptar',
            type: 'button-block button-outline button-stable',
            onTap: function(e) {
              return true;
            }
          }]
        });
        confirmPopup.then(function(res) {
          if (res) {
            console.log("aceptó",id);
            octaveService.deleteConcernArea(id).then(function(response) {
              $scope.showAlert(response.data.message);
            });
          } else {
            console.log("no aceptó");
          }
        });
      }
    }
  ]);
