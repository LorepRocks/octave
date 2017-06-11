angular.module('starter.documentArea', ['starter.Service', 'ionic'])

  .controller('documentAreaController', ['$scope', 'octaveService', '$ionicPopup', '$stateParams', '$ionicSlideBoxDelegate', '$timeout', '$ionicModal',
    function($scope, octaveService, $ionicPopup, $stateParams, $ionicSlideBoxDelegate, $timeout, $ionicModal) {
      $scope.results = [{
          "id": 1,
          "name": "Divulgación"
        },
        {
          "id": 2,
          "name": "Modificación"
        },
        {
          "id": 3,
          "name": "Destrucción"
        },
        {
          "id": 4,
          "name": "Interrupción"
        },
      ];

      $scope.probabilities = [{
          "id": 1,
          "name": "Alto"
        },
        {
          "id": 2,
          "name": "Medio"
        },
        {
          "id": 3,
          "name": "Bajo"
        }
      ];
      $scope.actions = [{
          "id": 1,
          "name": "Aceptar"
        },
        {
          "id": 2,
          "name": "Aplazar"
        },
        {
          "id": 3,
          "name": "Mitigar"
        },
        {
          "id": 4,
          "name": "Transferir"
        }
      ]
      $scope.consequencesList = [];
      $scope.description = "";
      $scope.area = "";
      $scope.impactValue = "";
      $scope.score = "";
      $scope.name = "";
      $scope.con = {};
      $scope.update = 0;
      $scope.activeSelected = {};
      var cont = 0;

      console.log("entró a controller");
      $scope.quests = [
        '',
        'Tacos',
        'Holy Grail',
        'Pizza'
      ];


      $scope.getImpactArea = function() {
        octaveService.getImpactArea().then(function(areas) {
          $scope.impactAreas = areas.data;
        });
      };

      $scope.getCriticalActive = function() {
        octaveService.getCriticalActive().then(function(critialActive) {
          $scope.actives = critialActive.data;
        });
      };


      $scope.getImpactArea();
      $scope.getCriticalActive();
      //Control functions


      $scope.next = function() {
        console.log("$scope.slide1", $scope.slide2);
        var paso = $scope.slide + 1;
        console.log("paso", paso);
        if (paso === 1) {
          if (!$scope.slide1.activeSelected || !$scope.slide1.concernArea || !$scope.slide1.actor || !$scope.slide1.medium || !$scope.slide1.motive) {
            var msg = "Verifica que todos los campos esten llenos para continuar.";
            $scope.showAlert(msg);
          } else {
            $ionicSlideBoxDelegate.next();
          }
        }
        if (paso === 2) {
          if (!$scope.slide2.result) {
            var msg = "Por favor seleccione un Resultado";
            $scope.showAlert(msg);
          } else {
            $ionicSlideBoxDelegate.next();
          }
        }
        if (paso === 3) {
          if (!$scope.slide3.requirements) {
            var msg = "Por favor ingrese los requerimientos de seguridad";
            $scope.showAlert(msg);
          } else {
            $ionicSlideBoxDelegate.next();
          }
        }
        if (paso === 4) {
          if (!$scope.slide4.probability) {
            var msg = "Por favor seleccione la probabilidad";
            $scope.showAlert(msg);
          } else {
            $ionicSlideBoxDelegate.next();
          }
        }
        if (paso === 5) {
          if ($scope.consequencesList.length === 0) {
            var msg = "Por favor ingrese almenos una consecuencia";
            $scope.showAlert(msg);
          } else {
            $ionicSlideBoxDelegate.next();
          }
        }

      }
      $scope.saveDocumentation = function() {
        if (!$scope.slide6.action) {
          var msg = "Por favor seleccione una acción";
          $scope.showAlert(msg);
        } else {
          $scope.documentation = {
            "criticalActive": $scope.slide1.activeSelected,
            "concernArea": $scope.slide1.concernArea,
            "actor": $scope.slide1.actor,
            "medium": $scope.slide1.medium,
            "motive": $scope.slide1.motive,
            "result": $scope.slide2.result,
            "requirements": $scope.slide3.requirements,
            "probability": $scope.slide4.probability,
            "consequences": $scope.consequencesList,
            "action": $scope.slide6.action
          }
          //  console.log(JSON.stringify($scope.documentation));
          octaveService.saveConcernArea($scope.documentation).then(function(response) {
            //console.log("response",response);
            $scope.showAlert(response.data.message);
            $ionicSlideBoxDelegate.slide(0);
            $scope.consequencesList = [];
            $scope.slide1 = new Slide();
            $scope.slide2 = new Slide();
            $scope.slide3 = new Slide();
            $scope.slide4 = new Slide();
            $scope.slide6 = new Slide();
          });


        }
      }
      $scope.showAlert = function(msg) {
        var alertPopup = $ionicPopup.alert({
          template: msg
        });
        alertPopup.then(function(res) {});
      };
      $scope.slideChanged = function(index) {
        console.log("slideChanged", index);
      }
      $scope.back = function() {
        $ionicSlideBoxDelegate.previous();
      }
      $scope.slide = -1;
      $scope.slides = [];
      $timeout(function() {
        $scope.$watch(function() {
          return $ionicSlideBoxDelegate.currentIndex();
        }, function(index) {

          $scope.errorMessage = "";

          //Initial state, don't validate
          if ($scope.slide < 0) {
            $scope.slide = 0;
            return;
          }
          $scope.slide = index;
        });
      }, 0);
      $scope.slide1 = new Slide();
      $scope.slide2 = new Slide();
      $scope.slide3 = new Slide();
      $scope.slide4 = new Slide();
      $scope.slide6 = new Slide();


      $scope.modal2 = $ionicModal.fromTemplate(
        '<div class="modal">' +
        '<header class="bar bar-header bar-positive" style="background-color:#7BBE85 !important; border-color:#7BBE85 !important">' +
        '<h1 class="title">Nueva Consecuencia</h1>' +
        '<div class="button button-clear" ng-click="closeModal(); modal2.hide()">' +
        '<span class="icon ion-close"></span></div></header>' +
        '<div id="page2-markdown18" class="show-list-numbers-and-dots">' +
        '<strong><p style="color:#000000; margin-top: 50px; color:#000000; text-align:' + 'center;">NOMBRE</p></strong>' +
        '<label class="item item-input" id="page2-input8">' +
        '<input ng-model="con.name" placeholder="" type="text">' +
        '</label>' +
        '</div>' +
        '<div id="page2-markdown22" class="show-list-numbers-and-dots">' +
        '<strong><p style="color:#000000; margin-top: 10px; text-align:' + 'center;">DESCRIPCIÓN</p></strong>' +
        '</div>' +

        '<label class="item item-input" id="page2-textarea12">' +
        '<textarea style="height: 80px; margin-top: 7px;" ng-model="con.description" placeholder="Escriba' + ' aqui los resultados que pueden sufrir la organización o el ' +
        'propietario de los activos de información por el incumplimiento de los ' +
        'requisitos de seguridad"></textarea>' +
        '</label>' +
        '<div id="page2-markdown22" class="show-list-numbers-and-dots">' +
        '<strong><p style="color:#000000; margin-top: 10px; text-align: center;">GRAVEDAD</p></strong>' +
        '</div>' +
        '<label style="padding: 6px !important;" class="item item-select" id="page2-select5">' +
        '<span class="input-label">Área de Impacto</span>' +
        '<select data-ng-model="con.area" ng-options="impactArea.name for impactArea in impactAreas"></select>' +
        '</label>' +
        '<div id="page2-markdown18" class="show-list-numbers-and-dots">' +
        '<strong><p style="color:#000000; margin-top: 10px; text-align: center;">Valor de ' + 'Impacto</p></strong>' +
        '</div>' +
        '<ion-item style="padding: 0;">' +
        '<ion-radio ng-model="con.impactValue" ng-value="3" style="display: inline-block; color: red;' + 'width: 132px;"' + 'value="high">Alto</ion-radio>' +
        '<ion-radio ng-model="con.impactValue" ng-value="2" style="display: inline-block; color: orange;' +
        'width: 132px;"' + 'value="medium">Medio</ion-radio>' +
        '<ion-radio ng-model="con.impactValue" ng-value="1" style="display: inline-block; color: gray;' + 'width: 115px;"' + 'value="low">Bajo</ion-radio>' +
        '</ion-item>' +
        // '<div id="page2-markdown22" class="show-list-numbers-and-dots">' +
        // '<strong><p style="color:#000000; margin-top: 23px; margin-left: 115px; text-align: center; display:' + 'inline-block;">Puntaje</p></strong>' +
        // '<input type="number" ng-model="con.score" placeholder="" style="width: 57px; display:' + 'inline-block; margin-left: 13px; border: 2px solid #dadada;"></input>' +
        // '</div>' +
        '<button ng-show="!update" ng-click="addConsequences(con);" class="button ' + 'button-dark ' + 'button-block">Guardar</button>' +
        '<button ng-show="update" ng-click="updateConsequence(con); modal2.hide();" class="button  button-dark ' + 'button-block">Actualizar</button>' +
        '</div>', {
          scope: $scope,
          animation: 'slide-in-up'
        });

      // scope.$on('$destroy', function() {
      //   scope.modal.remove();
      // });

      $scope.delete = function(indice){
        $scope.consequencesList.splice(indice,1);
      }


      $scope.addConsequences = function(consequence) {

        console.log("$scope.name", JSON.stringify(consequence));
        if (!consequence.description || !consequence.area || !consequence.impactValue || !consequence.name) {
          var msg = "Por favor verifique que todos los campos esten llenos";
          $scope.showAlert(msg);
        } else {
          $scope.description = consequence.description;
          $scope.area = consequence.area;
          $scope.impactValue = consequence.impactValue;
          $scope.score = 0;
          $scope.name = consequence.name;

          $scope.consequencesList.push({
            "name": $scope.name,
            "description": $scope.description,
            "area": $scope.area,
            "impactValue": $scope.impactValue,
            "score": $scope.score
          });
          console.log("consequencesList", JSON.stringify($scope.consequencesList));
          $scope.con = {};
          $scope.modal2.hide();
        }


      }
      $scope.closeModal = function() {
        $scope.con = {};
        $scope.update = 0;
      }

      $scope.view = function(item,index) {
        $scope.update = 1;
        $scope.index = index;
        $scope.con.name = item.name;
        $scope.con.description = item.description;
        $scope.con.area = item.area;
        $scope.con.impactValue = item.impactValue;
        $scope.con.score = item.score;

      }
      $scope.updateConsequence = function(item) {
        $scope.consequencesList.splice($scope.index,1);
        $scope.consequencesList.splice($scope.index,0,item);
        $scope.con = {};
        $scope.update = 0;
      }
    }
  ]);
var Slide = function() {
  this.validators = [];
  this.errorMessage = "Something went wrong!";
}
Slide.prototype.isValid = function() {
  return true;
}
