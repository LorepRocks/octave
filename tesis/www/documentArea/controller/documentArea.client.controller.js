angular.module('starter.documentArea', ['starter.Service', 'ionic'])

  .controller('documentAreaController', ['$scope', 'octaveService', '$ionicPopup', '$stateParams', '$ionicSlideBoxDelegate', '$timeout', '$ionicModal',
    function($scope, octaveService, $ionicPopup, $stateParams, $ionicSlideBoxDelegate, $timeout, $ionicModal) {
      $scope.colors = [
        'red', 'orange', 'yellow', 'green', 'blue', 'purple'
      ];
      $scope.consequencesList = [];
      $scope.description = "";
      $scope.area = "";
      $scope.impactValue = "";
      $scope.score = "";
      $scope.name = "";
      $scope.con = {};
      $scope.update = 0;

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
        console.log("next");
        $ionicSlideBoxDelegate.next();
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

      $scope.modal2 = $ionicModal.fromTemplate(
        '<div class="modal">' +
        '<header class="bar bar-header bar-positive">' +
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
        '<div id="page2-markdown22" class="show-list-numbers-and-dots">' +
        '<strong><p style="color:#000000; margin-top: 23px; margin-left: 115px; text-align: center; display:' + 'inline-block;">Puntaje</p></strong>' +
        '<input type="number" ng-model="con.score" placeholder="" style="width: 57px; display:' + 'inline-block; margin-left: 13px; border: 2px solid #dadada;"></input>' +
        '</div>' +
        '<button ng-show="!update" ng-click="addConsequences(con); modal2.hide();" class="button ' + 'button-dark ' + 'button-block">Guaradar</button>' +
        '<button ng-show="update" ng-click="updateConsequence(con); modal2.hide();" class="button  button-dark ' + 'button-block">Actualizar</button>' +
        '</div>', {
          scope: $scope,
          animation: 'slide-in-up'
        });

      // scope.$on('$destroy', function() {
      //   scope.modal.remove();
      // });



      $scope.addConsequences = function(consequence) {
        console.log("$scope.modal2", $scope.modal2);
        console.log("$scope.name", JSON.stringify(consequence));
        $scope.description = consequence.description;
        $scope.area = consequence.area;
        $scope.impactValue = consequence.impactValue;
        $scope.score = consequence.score;
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

      }
      $scope.closeModal = function() {
        $scope.con = {};
        $scope.update = 0;
      }

      $scope.view = function(item) {
        $scope.update = 1;
        $scope.con.name = item.name;
        $scope.con.description = item.description;
        $scope.con.area = item.area;
        $scope.con.impactValue = item.impactValue;
        $scope.con.score = item.score;

      }
      $scope.updateConsequence = function(item) {
        alert("actualizando");
        $scope.con = {};
        $scope.update = 0;
      }


      //Setup the slides
      $scope.slide1 = new Slide();
      $scope.slide1.validators.push(function() {
        return $scope.slide1.firstName && $scope.slide1.firstName.length != 0;
      });
      $scope.slide1.validators.push(function() {
        return $scope.slide1.lastName && $scope.slide1.lastName.length != 0;
      });
      $scope.slide1.errorMessage = "Please enter your name!";
      $scope.slides.push($scope.slide1);

      $scope.slide2 = new Slide();
      $scope.slide2.validators.push(function() {
        return $scope.slide2.quest && $scope.slide2.quest.length != 0;
      });
      $scope.slide2.errorMessage = "Choose a quest!";
      $scope.slides.push($scope.slide2);

      $scope.slide3 = new Slide();
      $scope.slide3.validators.push(function() {
        return $scope.slide3.color && $scope.slide3.color.length != 0;
      });
      $scope.slide3.errorMessage = "Please choose a color";
      $scope.slides.push($scope.slide3);

      $scope.slide4 = new Slide();
      $scope.slide4.validators.push(function() {
        return $scope.slide4.african || $scope.slide4.european;
      });
      $scope.slide4.errorMessage = "Choose an air speed!";
      $scope.slides.push($scope.slide4);

      $scope.slide5 = new Slide();
      $scope.slide5.validators.push(function() {
        return $scope.slide5.love > 50;
      });
      $scope.slide5.errorMessage = "You don't love kittens enough!";
      $scope.slides.push($scope.slide5);
    }
  ]);
var Slide = function() {
  this.validators = [];
  this.errorMessage = "Something went wrong!";
}
Slide.prototype.isValid = function() {
  // if(this.validators.length == 0){
  //   return true;
  // }
  // for (var i=0; i < this.validators.length; i++){
  //   if(!this.validators[i]()){
  //     return false;
  //   }
  // }
  return true;
}
