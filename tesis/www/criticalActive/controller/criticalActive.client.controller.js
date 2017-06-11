angular.module('starter.criticalActive', ['starter.Service', 'ionic'])

  .controller('criticalActiveController', ['$scope', 'octaveService', '$ionicPopup', '$stateParams', '$ionicModal',
    function($scope, octaveService, $ionicPopup, $stateParams, $ionicModal) {

      $scope.update = 0;
      $scope.con = {};
      $scope.getActives = function() {
        octaveService.getActives().then(function(actives) {
          $scope.actives = actives.data;
        });
      };

      $scope.getCriticalActives = function() {
        octaveService.getCriticalActive().then(function(actives) {
          console.log("actives", actives);
          $scope.criticalActives = actives.data;
        });
      }
      $scope.getActives();
      $scope.getCriticalActives();

      $scope.saveCriticalActive = function(active) {
        var criticalActive = {
          active: active.active,
          justification: active.justification,
          description: active.description,
          confidentiality: active.confidentiality,
          integrity: active.integrity,
          availability: active.availability,
          requirements: active.requirement,
          owners: active.owner
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
          $scope.con = {};
          $scope.getCriticalActives();
          $scope.update = 0;
        });
      };

      $scope.modal2 = $ionicModal.fromTemplate(
        '<div class="modal">' +
        '<header class="bar bar-header bar-positive" style="background-color:#7BBE85 !important; border-color:#7BBE85 !important">' +
        '<h1 class="title">Nuevo Activo Crítico</h1>' +
        '<div class="button button-clear" ng-click="closeModal(); modal2.hide()">' +
        '<span class="icon ion-close"></span></div></header>' +
        '<ion-content scroll="true">' +
        '<label class="item item-select" style="margin-top:50px" id="page2-select5">' +
        '<span class="input-label">Activo</span>' +
        '<select data-ng-model="con.active" ng-disabled="update" ng-options="active.name for active in actives"></select>' +
        '</label>' +
        '<div id="page2-markdown14" class="show-list-numbers-and-dots">' +
        '<strong><p style="color:#000000;  margin-top: 10px;' + 'text-align:center">Justificación</p></strong>' +
        '</div>' +
        '<label class="item item-input" id="page2-textarea7">' +
        '<textarea ng-model="con.justification" placeholder="Por qué el ' +
        'activo  es crítico"></textarea></label>' +
        '<div id="page2-markdown16" class="show-list-numbers-and-dots">' +
        '<strong><p style="color:#000000; margin-top: 10px;' + 'text-align:center">Descripción</p></strong>' +
        '</div>' +
        '<label class="item item-input" id="page2-textarea8">' +
        '<textarea ng-model="con.description" placeholder="Escriba la descripción del' +
        ' Activo"></textarea></label>' +
        '<div id="page2-markdown18" class="show-list-numbers-and-dots">' +
        '<strong><p style="color:#000000; margin-top: 10px; text-align:center">Propietario del' + 'Activo</p></strong>' +
        '</div>' +
        '<label class="item item-input" id="page2-input8">' +
        '<input ng-model="con.owner" placeholder="Ej: Carlos Gomez" type="text">' +
        '</label>' +
        '<div id="page2-markdown19" class="show-list-numbers-and-dots">' +
        '<strong><p style="color:#000000; margin-top:' +
        '10px;text-align:center">Confidencialidad</p></strong>' +
        '</div>' +
        '<label class="item item-input" id="page2-textarea9">' +
        '<textarea ng-model="con.confidentiality" placeholder="Si aplica, escriba como se ve afectada la' +
        ' condifencialidad del activo"></textarea></label>' +
        '<div id="page2-markdown20" class="show-list-numbers-and-dots">' +
        '<strong><p style="color:#000000; margin-top: 10px;' +
        'text-align:center">Integridad</p></strong>' +
        '</div>' +
        '<label class="item item-input" id="page2-textarea10">' +
        '<textarea ng-model="con.integrity" placeholder="Si aplica, escriba como se ve afectada la' +
        ' integridad del activo"></textarea></label>' +
        '<div id="page2-markdown21" class="show-list-numbers-and-dots">' +
        '<strong><p style="color:#000000; margin-top: 10px;' +
        'text-align:center">Disponibilidad</p></strong>' +
        '</div>' +
        '<label class="item item-input" id="page2-textarea11">' +
        '<textarea ng-model="con.availability" placeholder="Si aplica, escriba como se ve afectada la' +
        ' disponibilidad del activo"></textarea></label>' +
        '<div id="page2-markdown22" class="show-list-numbers-and-dots">' +
        '<strong><p style="color:#000000; margin-top: 10px; text-align:center">Requisitos de ' + 'Seguridad</p></strong>' +
        '</div>' +
        '<label class="item item-input" id="page2-textarea12">' +
        '<textarea ng-model="con.requirements" style="height:60px" placeholder="Señale cuál de los requisitos' +
        '(confidencialidad,' +
        'integridad, disponibilidad y otros) es el más importante para el activo.' +
        '"></textarea></label>' +
        '<button ng-show="!update" ng-click="saveCriticalActive(con); modal2.hide();" class="button ' + 'button-dark ' + 'button-block">Guardar</button>' +
        '<button ng-show="update" ng-click="updateActive(con); modal2.hide();" class="button  button-dark ' + 'button-block">Actualizar</button>' +
        '</div>', {
          scope: $scope,
          animation: 'slide-in-up'
        });

      $scope.closeModal = function() {
        $scope.con = {};
        $scope.update = 0;
      }

      $scope.view = function(active) {
        for (var i = 0; i < $scope.actives.length; i++) {
          if ($scope.actives[i].id === active.activo_id) {
            $scope.con.active = $scope.actives[i];
          }
        }
        $scope.con.id= active.id;
        $scope.con.justification = active.justificacion;
        $scope.con.description = active.descripcion;
        $scope.con.confidentiality = active.confidencialidad;
        $scope.con.integrity = active.integridad;
        $scope.con.availability = active.disponibilidad;
        $scope.con.requirements = active.requisitos_importantes;
        $scope.con.owner = active.propietarios;
        $scope.update = 1;
        $scope.modal2.show();
      }

      $scope.updateActive = function(active){

        octaveService.updateCriticalActive($scope.con).then(function(response) {
          $scope.showAlert(response.data.message);
        });
      }
    }
  ]);
