angular.module('starter.documentArea', ['starter.Service', 'ionic'])

  .controller('documentAreaController', ['$scope', 'octaveService', '$ionicPopup', '$stateParams', '$ionicSlideBoxDelegate', '$timeout', '$ionicModal',
    function($scope, octaveService, $ionicPopup, $stateParams, $ionicSlideBoxDelegate, $timeout, $ionicModal) {
      $scope.colors = [
        'red', 'orange', 'yellow', 'green', 'blue', 'purple'
      ];
      console.log("entró a controller");
      $scope.quests = [
        '',
        'Tacos',
        'Holy Grail',
        'Pizza'
      ];
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
        '<div class="button button-clear" ng-click="modal2.hide()">' +
        '<span class="icon ion-close"></span></div></header>' +
        '<div id="page2-markdown22" class="show-list-numbers-and-dots">' +
        '<strong><p style="color:#000000; margin-top: 10px;">Consecuencias</p></strong>' +
        '</div>' +
        '<div id="page2-markdown22" class="show-list-numbers-and-dots">' +
        '<label class="item item-input" id="page2-textarea12">' +
        '<textarea style="height: 80px; margin-top: 7px;" ng-model="consequences" placeholder="Escriba' + ' aqui los resultados que pueden sufrir la organización o el ' +
        'propietario de los activos de información por el incumplimiento de los ' +
        'requisitos de seguridad"></textarea>' +
        '</label>' +
        '<div id="page2-markdown22" class="show-list-numbers-and-dots">' +
        '<strong><p style="color:#000000; margin-top: 10px; text-align: center;">GRAVEDAD</p></strong>' +
        '</div>' +
        '<label style="padding: 6px !important;" class="item item-select" id="page2-select5">' +
        '<span class="input-label">Área de Impacto</span>' +
        '<select data-ng-model="area" ng-options="active.name for active in actives"></select>' +
        '</label>' +
        '<div id="page2-markdown18" class="show-list-numbers-and-dots">' +
        '<strong><p style="color:#000000; margin-top: 10px; text-align: center;">Valor de '+ 'Impacto</p></strong>' +
        '</div>' +
        '<ion-list radio-group [(ngModel)]="imapctValue">' +
        '<ion-item style="padding-left: 28px;">' +
        '<ion-radio style="display: inline-block; color: red; width: 100px;"'+ 'value="high">Alto</ion-radio>' +
        '<ion-radio style="display: inline-block; color: orange; width: 105px;"'+ 'value="medium">Medio</ion-radio>' +
        '<ion-radio style="display: inline-block; color: yellow; width: 100px;"'+ 'value="low">Bajo</ion-radio>' +
        '</ion-item>' +
        '</ion-list>' +
        '<div id="page2-markdown22" class="show-list-numbers-and-dots">' +
        '<strong><p style="color:#000000; margin-top: 10px; margin-left: 115px; text-align: center; display:'+ 'inline-block;">Puntaje</p></strong>' +
        '<input type="number" ng-model="score" placeholder="" style="width: 37px; display:'+ 'inline-block; margin-left: 23px;"></input>'+
        '</div>' +
        '</div>', {
          scope: $scope,
          animation: 'slide-in-up'
        });




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
