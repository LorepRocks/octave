angular.module('starter.action', ['starter.Service', 'ionic', 'ngDraggable'])

  .controller('actionController', ['$scope', 'octaveService', '$ionicPopup', '$stateParams', 'ngDraggable', '$ionicModal',
    function($scope, octaveService, $ionicPopup, $stateParams, ngDraggable, $ionicModal) {

      $scope.red = "background-color:red";
      $scope.yellow = "background-color:yellow";
      $scope.green = "background-color:green";
      $scope.getActions = function() {
        octaveService.getAction().then(function(actions) {
          $scope.actions = actions.data;
          console.log("$scope.actions", $scope.actions);
        });
      };

      $scope.set_color = function(item) {
        if (item.grupo === 'Grupo 1') {
          return {
            "background-color": "red"
          }
        } else if (item.grupo === 'Grupo 2') {
          return {
            "background-color": "yellow"
          }
        } else {
          return {
            "background-color": "green"
          }
        }
      }

      $scope.getActions();
      $scope.addControl = function() {
        $scope.newControl = {};
        // Custom popup
        var addControl = $ionicPopup.show({
          template: '<textarea style="height: 216px;" ng-model="newControl.control" />',
          title: 'Nuevo Control',
          subTitle: 'Ingrese el control seleccionado',
          scope: $scope,
          cssClass: 'control',
          buttons: [{
              text: 'Cancel'
            },
            {
              text: '<b>Guardar</b>',
              type: 'button-positive',
              onTap: function(e) {
                if (!$scope.newControl) {
                  //don't allow the user to close unless he enters model...
                  e.preventDefault();
                } else {
                  return $scope.newControl;
                }
              }
            }
          ]
        });

        addControl.then(function(res) {

          $scope.newControl.areaId = $scope.selectedArea;
          console.log("$scope.newArea", $scope.newControl);
          octaveService.saveControl($scope.newControl).then(function(response) {
            console.log(response.data.message);
            $scope.showAlert(response.data.message);
          });
        });
      };

      $scope.updateControl = function(control) {
        $scope.newControl = control;
        // Custom popup
        var addControl = $ionicPopup.show({
          template: '<textarea style="height: 216px;" ng-model="newControl.control" />',
          title: 'Nuevo Control',
          subTitle: 'Ingrese el control seleccionado',
          scope: $scope,
          cssClass: 'control',
          buttons: [{
              text: 'Cancel'
            },
            {
              text: '<b>Actualizar</b>',
              type: 'button-positive',
              onTap: function(e) {
                if (!$scope.newControl) {
                  //don't allow the user to close unless he enters model...
                  e.preventDefault();
                } else {
                  return $scope.newControl;
                }
              }
            }
          ]
        });

        addControl.then(function(res) {
          console.log("$scope.newArea", $scope.newControl);
          octaveService.updateControl($scope.newControl).then(function(response) {
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
          $scope.getControls();
        });
      };

      $scope.modal2 = $ionicModal.fromTemplate(
        '<div class="modal">' +
        '<header class="bar bar-header bar-positive" style="background-color:#7BBE85 !important;' + 'border-color:#7BBE85 !important">' +
        '<h1 class="title"><strong>CONTROLES</strong></h1>' +
        '<div class="button button-clear" ng-click="closeModal(); modal2.hide()">' +
        '<span class="icon ion-close"></span></div></header>' + '<ion-content scroll="true">' +
        //  '<ion-list>' +
        '<button ng-click="addControl()" style="margin-top:43px" class="button button-dark  button-block"><i class="icon' + 'ion-android-add"></i> Agregar Control</ion-item></button>' +

        '<div id="page2-markdown18" class="show-list-numbers-and-dots">' +

        '<strong><p style="color:#000000; margin-top: 20px; text-align:center " ng-show="controlsList.length === 0">No se han registrado controles aún</p></strong>' +
        '</div>' +

        '<div class="card" ng-repeat="item in controlsList track by item.id">' +
        '<div class="item item-divider  item-icon-left item-icon-right">' +
        '<i class="icon ion-close" style="font-size:12px;" ng-click="delete(item.id)">Eliminar</i>' +
        '<i class="icon ion-eye" style="font-size:12px;" ng-click="updateControl(item);">Ver</i>' +
        ' </div>' +
        '<div class="item item-text-wrap" style="text-align:justify">' +
        '{{item.control}}' +
        '</div></div>' +





        // '<ion-item ng-repeat="item in controlsList" class="item-icon-left item-icon-right dark' + '   item ic-selected" id="page5-list-item22" style=""' + ' data-componentid="list-item22"><i' +
        // ' class="icon ion-close"' + 'ng-click="delete($index)"></i>{{item.control}}<i class="icon' + ' ion-eye"' + 'ng-click="view(item,$index); modal2.show()"></i>' +
        // '</ion-item>' +
        // '</ion-list>' +
        '</div>', {
          scope: $scope,
          animation: 'slide-in-up'
        });

      $scope.closeModal = function() {
        $scope.con = {};
        $scope.update = 0;
      }

      $scope.delete = function(id) {

        var confirmPopup = $ionicPopup.confirm({
          title: 'Eliminar Control',
          template: 'Está seguro que desea eliminar este control?',
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
            octaveService.deleteControl(id).then(function(response) {
              $scope.showAlert(response.data.message);
            });
          } else {
            console.log("no aceptó");
          }
        });
      }

      $scope.open = function(areaId) {
        console.log("areaId", areaId);
        $scope.selectedArea = areaId;
        $scope.getControls();

      }

      $scope.getControls = function() {
        octaveService.getControls($scope.selectedArea).then(function(controls) {
          $scope.controlsList = controls.data;
          console.log($scope.controlsList);
          $scope.modal2.show();
        });
      }


    }
  ]);
