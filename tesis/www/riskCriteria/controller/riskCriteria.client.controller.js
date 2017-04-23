angular.module('starter.riskCriteria', ['starter.Service', 'ionic'])

  .controller('riskCriteriaController', ['$scope', 'octaveService', '$ionicPopup', '$stateParams',
    function($scope, octaveService, $ionicPopup, $stateParams) {


      $scope.loadData = function() {
        $scope.getImpactArea();
        $scope.getRiskCriteria();
      }

      $scope.getRiskCriteria = function() {
        octaveService.riskCriteria().then(function(response) {
          $scope.riskCriteria = response.data;
        });
      };

      $scope.getImpactArea = function() {
        octaveService.getImpactArea().then(function(areas) {
          $scope.impactAreas = areas.data;
        });
      };


      $scope.addNewArea = function() {
        $scope.newArea ={};
        // Custom popup
        var addArea = $ionicPopup.show({
          template: '<input type = "text" ng-model="newArea.name">',
          title: 'Nueva Área de Impacto',
          subTitle: 'Ingresa el nombre de la nueva área de impacto',
          scope: $scope,
          buttons: [{
              text: 'Cancel'
            },
            {
              text: '<b>Save</b>',
              type: 'button-positive',
              onTap: function(e) {
                if (!$scope.newArea.name) {
                  //don't allow the user to close unless he enters model...
                  e.preventDefault();
                } else {
                  return $scope.newArea.name;
                }
              }
            }
          ]
        });

        addArea.then(function(res) {
          octaveService.saveImpactArea($scope.newArea).then(function(response) {
            console.log(response.data.message);
            $scope.showAlert(response.data.message);
          });
        });
      };

      $scope.showAlert = function(msg) {
        var alertPopup = $ionicPopup.alert({
          template: msg
        });
        alertPopup.then(function(res) {
          $scope.getImpactArea();
        });
      };

      $scope.cleanFields = function(){
         $scope.riskSelected = {};
         $scope.impactArea={};
         $scope.bajo = "";
         $scope.moderado="";
         $scope.alto="";
      }

      $scope.saveRiskCriteria = function(){
        var risk = {
          criteria: $scope.riskSelected,
          area: $scope.impactArea,
          bajo: $scope.bajo,
          moderado:$scope.moderado,
          alto:$scope.alto
        }

        octaveService.saveRiskCriteria(risk).then(function(response) {
          $scope.showAlert(response.data.message);
          $scope.cleanFields();
        });

        console.log(JSON.stringify(risk,null,4));
      }



    }
  ]);
