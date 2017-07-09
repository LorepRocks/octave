angular.module('starter.activeRegister', ['starter.Service', 'ionic'])

  .controller('activeRegisterController', ['$scope', 'octaveService', '$ionicPopup', '$stateParams','$ionicModal',
    function($scope, octaveService, $ionicPopup, $stateParams,$ionicModal) {


      $scope.desc = "";
      $scope.update = 0;
      $scope.con = {};
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

      $scope.getActives = function() {
        octaveService.getActives().then(function(actives) {
          console.log("response", actives);
          $scope.actives = actives.data;
        });
      };

      $scope.getActives();
      $scope.saveActive = function(active) {
        $scope.active = {
          name: active.activeName,
          description: active.activeDescription,
        };
        octaveService.activeRegister($scope.active).then(function(response) {
          console.log("response", response);
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
          $scope.con = {};
          $scope.update = 0;
          $scope.getActives();
        });
      };


      $scope.modal2 = $ionicModal.fromTemplate(
        '<div class="modal">' +
        '<header class="bar bar-header bar-positive" style="background-color:#7BBE85 !important; border-color:#7BBE85 !important">' +
        '<h1 class="title">Nuevo Activo</h1>' +
        '<div class="button button-clear" ng-click="closeModal(); modal2.hide()">' +
        '<span class="icon ion-close"></span></div></header>' +
        '<div id="registrarActivo-markdown2" class="show-list-numbers-and-dots">' +
        '<p style="color:#000000; margin-top: 50px;text-align:center"><strong>Nombre</strong></p>'+
        '  </div>'+
        '<label class="item item-input" id="registrarActivo-input11">'+
        '<input placeholder="" ng-model="con.activeName" type="text">'+
        '</label>'+
        '<div class="show-list-numbers-and-dots">'+
        '<p style="color:#000000;margin-top:'+ '10px;text-align:center;"><strong>Descripción</strong></p>'+
        '</div>'+
        '<label class="item item-input">'+
        '<textarea class="textAreaFormulario" ng-model="con.activeDescription" placeholder="Escriba una '+ 'descripción del '+
        'activo"></textarea></label>'+
        '<button ng-show="!update && user.profile === 1" ng-click="saveActive(con); modal2.hide();" class="button ' + 'button-dark ' + 'button-block">Guardar</button>' +
        '<button ng-show="update && user.profile === 1" ng-click="updateActive(con); modal2.hide();" class="button  button-dark ' + 'button-block">Actualizar</button>' +
        '</div>', {
          scope: $scope,
          animation: 'slide-in-up'
        });

        $scope.closeModal = function() {
          $scope.con = {};
          $scope.update = 0;
        }

        $scope.view = function(active){
          $scope.update = 1;
          $scope.con.activeName = active.name;
          $scope.con.activeDescription = active.description;
          $scope.con.id = active.id;
          console.log($scope.con);
          $scope.modal2.show();
        }

        $scope.updateActive = function(active){
          console.log("active update",active);
          octaveService.updateActive(active).then(function(response) {
            console.log("response", response.data.message);
            $scope.showAlert(response.data.message);

          });
        }

        $scope.delete = function(id){
          var confirmPopup = $ionicPopup.confirm({
            title: 'Eliminar Activo',
            template: 'Está seguro que desea eliminar este activo?',
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
              octaveService.deleteActive(id).then(function(response) {
                $scope.showAlert(response.data.message);
              });
            } else {
              console.log("no aceptó");
            }
          });
        }
    }
  ]);
