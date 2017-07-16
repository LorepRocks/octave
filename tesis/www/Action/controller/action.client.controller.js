angular.module('starter.action', ['starter.Service', 'ionic', 'ngDraggable'])

  .controller('actionController', ['$scope', 'octaveService', '$ionicPopup', '$stateParams', 'ngDraggable', '$ionicModal',
    function($scope, octaveService, $ionicPopup, $stateParams, ngDraggable, $ionicModal) {

      $scope.red = "background-color:red";
      $scope.yellow = "background-color:yellow";
      $scope.green = "background-color:green";
      $scope.getSuggestedControls = function() {
        octaveService.getSuggestedControls().then(function(suggested) {
          $scope.suggested = suggested.data;
          console.log("$scope,suggested", $scope.suggested);

        });
      };
      $scope.getSuggestedControls();
      $scope.getActions = function() {
        octaveService.getAction().then(function(actions) {
          $scope.actions = actions.data;

        });
      };

      $scope.test = [{
        "id": 1,
        "name": 1
      }, {
        "id": 2,
        "name": 2
      }];

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
      $scope.getDescription = function(item) {
        console.log("item getDescription", $scope.newControl.suggested);
        $scope.newControl.control = $scope.newControl.suggested.description;
      }
      $scope.addControl = function() {
        $scope.newControl = {};
        // Custom popup
        var addControl = $ionicPopup.show({
          template: '<label class="item item-select labelControl">' +
            '<span class="input-label">Control</span>' +
            '<select ng-model="newControl.suggested" class="selectControl"  ng-options="item.name for item in' +
            ' suggested" ng-change="getDescription();"><option value="-1">Ninguno</option></select>' +
            '</label> <h5 class="popup-sub-title ng-binding">Modifique la descripción del control' + ' seleccionado o escriba una nueva</h5>' +
            '<textarea style="height: 216px; margin-top:10px" ng-model="newControl.control" />',
          title: 'Nuevo Control',
          subTitle: 'Puede seleccionar uno de los controles sugeridos o escribir uno nuevo',
          scope: $scope,
          cssClass: 'control',
          buttons: [{
              text: 'Cancel',
              onTap: function(e) {
                $scope.cancel = true;

              }
            },
            {
              text: '<b>Guardar</b>',
              type: 'button-positive',
              onTap: function(e) {
                if (!$scope.newControl) {
                  //don't allow the user to close unless he enters model...
                  e.preventDefault();
                } else {
                  $scope.cancel = false;
                  return $scope.newControl;
                }
              }
            }
          ]
        });

        addControl.then(function(res) {
          if (!$scope.cancel) {
            $scope.newControl.areaId = $scope.selectedArea;
            console.log("$scope.newArea", $scope.newControl);
            octaveService.saveControl($scope.newControl).then(function(response) {
              console.log(response.data.message);
              $scope.showAlert(response.data.message);
            });
          }
        });
      };

      $scope.updateControl = function(control) {
        $scope.newControl = control;
        // Custom popup
        var addControl = $ionicPopup.show({
          template: '<label class="item item-select labelControl">' +
            '<span class="input-label">Control</span>' +
            '<select ng-model="newControl.suggested" class="selectControl"  ng-options="item.name for item in' +
            ' suggested" ng-change="getDescription();"><option value="-1">Ninguno</option></select>' +
            '</label> <h5 class="popup-sub-title ng-binding">Modifique la descripción del control' + ' seleccionado o escriba una nueva</h5>' +
            '<textarea style="height: 216px; margin-top:10px" ng-model="newControl.control" />',
          title: 'Actualizar Control',
          subTitle: 'Puede seleccionar uno de los controles sugeridos o escribir uno nuevo',
          scope: $scope,
          cssClass: 'control',
          buttons: [{
              text: 'Cancel',
              onTap: function(e) {
                $scope.cancel = true;

              }
            },
            {
              text: '<b>Actualizar</b>',
              type: 'button-positive',
              onTap: function(e) {
                if (!$scope.newControl) {
                  //don't allow the user to close unless he enters model...
                  e.preventDefault();
                } else {
                  $scope.cancel = false;
                  return $scope.newControl;
                }
              }
            }
          ]
        });

        addControl.then(function(res) {
          console.log("$scope.cancel", $scope.cancel);
          if (!$scope.cancel) {
            octaveService.updateControl($scope.newControl).then(function(response) {
              console.log(response.data.message);
              $scope.showAlert(response.data.message);
            });
          }

        });

        //close the popup after 3 seconds for some reason

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
        '<div class="modal modalSmall">' +
        '<header class="bar bar-header bar-positive" style="background-color:#7BBE85 !important;' + 'border-color:#7BBE85 !important">' +
        '<h1 class="title"><strong>CONTROLES</strong></h1>' +
        '<div class="button button-clear" ng-click="closeModal(); modal2.hide()">' +
        '<span class="icon ion-close"></span></div></header>' + '<ion-content overflow-scroll="true">' +
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
            onTap: function(e) {}
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
            console.log("aceptó", id);
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
          for (var i = 0; i < $scope.controlsList.length; i++) {
            for (var j = 0; j < $scope.suggested.length; j++) {
              if ($scope.suggested[j].id === $scope.controlsList[i].suggested_control_id) {
                $scope.controlsList[i].suggested = $scope.suggested[j];
              }
            }
          }
          console.log($scope.controlsList);
          $scope.modal2.show();
        });
      }


    }
  ]);
