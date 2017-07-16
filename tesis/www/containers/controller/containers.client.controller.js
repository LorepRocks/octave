angular.module('starter.container', ['starter.Service', 'ionic'])

  .controller('containerController', ['$scope', 'octaveService', '$ionicPopup', '$stateParams', '$ionicModal',
    function($scope, octaveService, $ionicPopup, $stateParams, $ionicModal) {


      $scope.con = {};
      $scope.update = 0;
      $scope.con.containerType = {
        name: "",
        type: 0
      };
      $scope.con.internalTitle = "";
      $scope.con.internalDescriptionTitle = "";
      $scope.con.internalOwnerTitle = "";
      $scope.con.externalTitle = "";
      $scope.con.externalDescriptionTitle = "";
      $scope.con.externalOwnerTitle = "";
      $scope.containers = [{
          name: "Contenedor Técnico",
          type: 1
        },
        {
          name: "Contenedor Físico",
          type: 2
        },
        {
          name: "Contenedor Personas",
          type: 3
        }
      ];



      $scope.getContainers = function() {
        octaveService.getContainers().then(function(response) {
          $scope.containersList = response.data;
        });
      };

      $scope.getContainers();
      $scope.selectContainerType = function(container) {
        console.log(container.containerType);
        if (container.containerType.type == 1 || container.containerType.type == 2) {
          $scope.con.internalTitle = "INTERNO";
          $scope.con.internalDescriptionTitle = "Descripción del Contenedor";
          $scope.con.internalOwnerTitle = "Propietarios";
          $scope.con.externalTitle = "EXTERNO";
          $scope.con.externalDescriptionTitle = "Descripción del Contenedor";
          $scope.con.externalOwnerTitle = "Propietarios";
        } else if (container.containerType.type == 3) {
          $scope.con.internalTitle = "PERSONAL INTERNO"
          $scope.con.internalDescriptionTitle = "Nombre o Rol/Responsabilidad";
          $scope.con.internalOwnerTitle = "Área/Departamento";
          $scope.con.externalTitle = "PERSONAL EXTERNO";
          $scope.con.externalDescriptionTitle = "Contratista, Proveedor";
          $scope.con.externalOwnerTitle = "Organización";

        }
      }

      $scope.saveContainer = function(container) {
        var contain = {
          name: container.name,
          internalDescription: container.internalDescription,
          internalOwner: container.internalOwner,
          externalDescription: container.externalDescription,
          externalOwner: container.externalOwner,
          containerType: container.containerType.type
        };
        console.log(container);
        console.log($scope.nameContainer);
        octaveService.saveContainer(contain).then(function(response) {
          $scope.showAlert(response.data.message);

        });
      }

      $scope.cleanFields = function() {
        $scope.con.name = "";
        $scope.con.internalDescription = "";
        $scope.con.internalOwner = "";
        $scope.con.externalDescription = "";
        $scope.con.externalOwner = "";
        $scope.con.containerType = {
          name: "",
          type: 0
        };
        $scope.con.internalTitle = "";
        $scope.con.internalDescriptionTitle = "";
        $scope.con.internalOwnerTitle = "";
        $scope.con.externalTitle = "";
        $scope.con.externalDescriptionTitle = "";
        $scope.con.externalOwnerTitle = "";
      }

      $scope.showAlert = function(msg) {
        var alertPopup = $ionicPopup.alert({
          template: msg
        });
        alertPopup.then(function(res) {
          $scope.cleanFields();
          $scope.update = 0;
          $scope.getContainers();
        });
      };

      $scope.modal2 = $ionicModal.fromTemplate(
        '<div class="modal modalSmall">' +
        '<header class="bar bar-header bar-positive" style="background-color:#7BBE85 !important; border-color:#7BBE85 !important">' +
        '<h1 class="title">Nuevo Contenedor</h1>' +
        '<div class="button button-clear" ng-click="closeModal(); modal2.hide()">' +
        '<span class="icon ion-close"></span></div></header>' +
        '<ion-content overflow-scroll="true">' +
        '<label class="item item-select" style="margin-top:50px;" id="contenedores-select6">' +
        '<span class="input-label">Tipo Contenedor</span>' +
        '<select ng-model="con.containerType" ng-options="container.name for container in containers"' +
        'ng-change="selectContainerType(con)"></select>' +
        '</label>' +
        '<div id="page2-markdown18" class="show-list-numbers-and-dots"'+ '    ng-show="con.containerType.type!=' +
        '0">' +
        '<p style="color:#000000; margin-top: 10px; text-align:center;"><strong>Nombre</strong></p>' +
        '<label class="item item-input" id="page2-input8">' +
        '<input data-ng-model="con.name" type="text" ng-show="con.containerType.type != 0">' +
        '</label>' +
        '</div>' +
        '<div id="contenedores-markdown12" style="text-align:center;"' +
        'class="show-list-numbers-and-dots">' +
        '<strong><p style="color:#000000; margin-top: 10px;">{{con.internalTitle}}</p></strong>' +
        '</div>' +
        '<div id="contenedores-markdown13" class="show-list-numbers-and-dots">' +
        '<p style="color:#000000; text-align:center;">{{con.internalDescriptionTitle}}</p>' +
        '</div>' +
        '<label class="item item-input" id="contenedores-textarea13" ng-show="con.containerType.type !=' + ' 0">' +
        '<textarea placeholder="" ng-model="con.internalDescription"></textarea></label>' +
        '<div id="contenedores-markdown15" class="show-list-numbers-and-dots">' +
        '<p style="color:#000000; margin-top: 10px;text-align:center;">{{con.internalOwnerTitle}}</p>' +
        '</div>' +
        '<label class="item item-input" id="contenedores-textarea14" ng-show="con.containerType.type ' + '!= 0">' +
        '<textarea placeholder="" ng-model="con.internalOwner"></textarea></label>' +
        '<div id="contenedores-markdown17" style="text-align:center;"' +
        'class="show-list-numbers-and-dots">' +
        '<strong><p style="color:#000000; margin-top: 10px;">{{con.externalTitle}}</p></strong>' +
        '</div>' +
        '<div id="contenedores-markdown23" class="show-list-numbers-and-dots">' +
        '<p style="margin-top: 10px;text-align:center;">{{con.externalDescriptionTitle}}</p>' +
        '</div>' +
        '<label class="item item-input" ng-show="con.containerType.type != 0">' +
        '<textarea placeholder="" ng-model="con.externalDescription"></textarea></label>' +
        '<div id="contenedores-markdown25" class="show-list-numbers-and-dots">' +
        '<p style="margin-top: 10px;text-align:center;">{{con.externalOwnerTitle}}</p>' +
        '</div>' +
        '<label class="item item-input"  ng-show="con.containerType.type !=' + '0">' +
        '<textarea placeholder="" ng-model="con.externalOwner"></textarea></label>' +
        '<button ng-show="!update && user.profile === 1 && con.containerType.type != 0"'+ 'ng-click="saveContainer(con); modal2.hide();" class="button ' + 'button-dark ' + 'button-block" >Guardar</button>' +
        '<button ng-show="update && user.profile === 1" ng-click="updateActive(con); modal2.hide();" class="button ' + 'button-dark ' + 'button-block" ng-show="con.containerType.type != 0">Actualizar</button>' +
        '</div>', {
          scope: $scope,
          animation: 'slide-in-up'
        });

      $scope.closeModal = function() {
        $scope.con = {};
        $scope.con.containerType = {};
        $scope.con.containerType.type = 0;
        $scope.update = 0;
      }

      $scope.view = function(container) {
        for (var i = 0; i < $scope.containers.length; i++) {
          if ($scope.containers[i].type === container.type_container) {
            $scope.con.containerType = $scope.containers[i];
          }
        }
        $scope.selectContainerType($scope.con);
        $scope.con.id = container.id;
        $scope.con.name= container.name;
        $scope.con.internalDescription = container.descripcion_interno;
        $scope.con.internalOwner = container.propietario_interno;
        $scope.con.externalDescription = container.descripcion_externo;
        $scope.con.externalOwner = container.propietario_externo;
        $scope.update = 1;
        $scope.modal2.show();
      }

      $scope.updateActive = function(active){

        octaveService.updateContainer($scope.con).then(function(response) {
          $scope.showAlert(response.data.message);
        });
      }

      $scope.delete = function(id){
        var confirmPopup = $ionicPopup.confirm({
          title: 'Eliminar Contenedor',
          template: 'Está seguro que desea eliminar el contenedor?',
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
            octaveService.deleteContainer(id).then(function(response) {
              $scope.showAlert(response.data.message);
            });
          } else {
            console.log("no aceptó");
          }
        });
      }

    }
  ]);
