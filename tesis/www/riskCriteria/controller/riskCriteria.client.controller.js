angular.module('starter.riskCriteria', ['starter.Service', 'ionic'])

  .controller('riskCriteriaController', ['$scope', 'octaveService', '$ionicPopup', '$stateParams',
    '$ionicModal',
    function($scope, octaveService, $ionicPopup, $stateParams, $ionicModal) {

      $scope.update = 0;
      $scope.con = {};


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

      $scope.getImpactArea();
      $scope.getRiskCriteria();

      $scope.addNewArea = function() {
        $scope.newArea = {};
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
          $scope.con = {};
          $scope.update = 0;
          $scope.getRiskCriteria();
        });
      };

      $scope.cleanFields = function() {
        $scope.riskSelected = {};
        $scope.impactArea = {};
        $scope.bajo = "";
        $scope.moderado = "";
        $scope.alto = "";
      }

      $scope.saveRiskCriteria = function(risk) {
        var risk = {
          area: risk.impactArea,
          bajo: risk.bajo,
          moderado: risk.moderado,
          alto: risk.alto
        }

        octaveService.saveRiskCriteria(risk).then(function(response) {
          $scope.showAlert(response.data.message);
        }, function(reject) {
          $scope.showAlert(reject.data.message);
        });

        console.log(JSON.stringify(risk, null, 4));
      }

      $scope.modal2 = $ionicModal.fromTemplate(
        '<div class="modal">' +
        '<header class="bar bar-header bar-positive" style="background-color:#7BBE85 !important;' + 'border-color:#7BBE85 !important">' +
        '<h1 class="title">Nueva Medida de Riesgo</h1>' +
        '<div class="button button-clear" ng-click="closeModal(); modal2.hide()">' +
        '<span class="icon ion-close"></span></div></header>' +
        '<ion-content scroll="true">' +
        '<div id="criteriosDeMedidaDeRiesgo-markdown7" class="show-list-numbers-and-dots">' +
        '<strong><p style="color:#000000; margin-top: 10px;">Área de Impacto</p></strong>' +
        '</div>' +
        // '<ion-item class="item-icon-left" id="criteriosDeMedidaDeRiesgo-list-item15"' + 'style="width:300px; align:right;">' +
        // '<a ng-click="addNewArea()"><i class="icon ion-android-add"></i>Agregar Área de' +
        // 'Impacto</ion-item></a>' +
        '<label class="item item-select" id="criteriosDeMedidaDeRiesgo-select4">' +
        '<span class="input-label">Área de Impacto</span>' +
        '<select class="selectControl" data-ng-model="con.impactArea" ng-disabled="update"'+ 'ng-options="area.name for area  in' + ' impactAreas"></select>' +
        '</label>' +
        '<div id="criteriosDeMedidaDeRiesgo-markdown8" class="show-list-numbers-and-dots">' +
        '<strong><p style="color:#000000; margin-top: 10px; text-align:center;">Descripción nivel' + ' Bajo</p></strong>' +
        '</div>' +
        '<label class="item item-input" id="criteriosDeMedidaDeRiesgo-textarea4">' +
        '<textarea ng-model="con.bajo" placeholder=""></textarea></label>' +
        '<div id="criteriosDeMedidaDeRiesgo-markdown9" class="show-list-numbers-and-dots">' +
        '<strong><p style="color:#000000; margin-top: 10px; text-align:center">Descripción nivel' +
        ' Moderado</p></strong>' +
        '</div>' +
        '<label class="item item-input" id="criteriosDeMedidaDeRiesgo-textarea5">' +
        '<textarea ng-model="con.moderado" placeholder=""></textarea></label>' +
        '<div id="criteriosDeMedidaDeRiesgo-markdown11" class="show-list-numbers-and-dots">' +
        '<strong><p style="color:#000000; margin-top: 20px; text-align:center;">Descripción nivel Alto</p></strong>' +
        '</div>' +
        '<label class="item item-input" id="criteriosDeMedidaDeRiesgo-textarea6">' +
        '<textarea ng-model="con.alto" placeholder=""></textarea></label>' +
        '<button ng-show="!update && user.profile === 1" ng-click="saveRiskCriteria(con); modal2.hide();" class="button ' + ' button-dark button-block">Guardar</button>' +
        '<button ng-show="update && user.profile === 1" ng-click="updateRisk(con); modal2.hide();" class="button ' + 'button-dark ' + 'button-block">Actualizar</button>' +
        '</div>', {
          scope: $scope,
          animation: 'slide-in-up'
        });

      $scope.closeModal = function() {
        $scope.con = {};
        $scope.update = 0;
      }

      $scope.view = function(risk) {
        for (var i = 0; i < $scope.impactAreas.length; i++) {
          if ($scope.impactAreas[i].id === risk.area_impacto_id) {
            $scope.con.impactArea = $scope.impactAreas[i];
          }
        }
        $scope.con.bajo = risk.bajo;
        $scope.con.moderado = risk.moderado;
        $scope.con.alto = risk.alto;
        $scope.update = 1;
        $scope.modal2.show();
      }

      $scope.updateRisk = function(){
        octaveService.updateRiskCriteria($scope.con).then(function(response) {
          $scope.showAlert(response.data.message);
        });
      }

      $scope.delete = function(id){
        var confirmPopup = $ionicPopup.confirm({
          title: 'Eliminar Medida de Riesgo',
          template: 'Está seguro que desea eliminar esta medida de riesgo?',
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

            octaveService.deleteRiskCriteria(id).then(function(response) {
              $scope.showAlert(response.data.message);
            });
          } else {
            console.log("no aceptó");
          }
        });
      }



    }
  ]);
