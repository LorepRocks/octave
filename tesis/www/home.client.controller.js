angular.module('starter.home', ['starter.Service', 'ionic'])

  .controller('homeController', ['$scope', 'octaveService', '$ionicPopup', '$stateParams', '$ionicModal', '$location', '$timeout', '$ionicPlatform', '$ionicLoading', '$rootScope', '$ionicNavBarDelegate', '$ionicHistory', '$rootScope',
    function($scope, octaveService, $ionicPopup, $stateParams, $ionicModal, $location, $timeout, $ionicPlatform, $ionicLoading, $rootScope, $ionicNavBarDelegate, $ionicHistory, $rootScope) {

      $scope.lastView = $ionicHistory.backView()
      console.log("lastview", $scope.lastView);

      $ionicPlatform.registerBackButtonAction(function(event) {
        console.log("entro atrás");
        if ($location.$$path == "/home") {
          //navigator.app.exitApp(); //<-- remove this line to disable the exit
          console.log("false");
          return false;

        } else {
          navigator.app.backHistory();
        }
      }, 100);

      //  $ionicNavBarDelegate.showBackButton(false);

      $scope.getSeession = function() {
        $timeout(function() {
          octaveService.getSessionActive().then(function(response) {
            console.log(response);
            if (response.data.message) {
              $location.path('/login');

              //$location.path('/home');
            } else {
              $scope.userlogged = response.data;
              $rootScope.user = $scope.userlogged[0];
              if ($rootScope.user.profile == 1) {
                $scope.groups = [{
                  "id": 1,
                  name: "Administración de Usuarios",
                  "items": [{
                      "id": 1,
                      "name": "Actualizar Datos",
                      "class": "icon ion-android-person"
                    },
                    {
                      "id": 2,
                      "name": "Administrar Usuarios",
                      "class": "icon ion-android-person-add"
                    },
                    {
                      "id": 3,
                      "name": "Cerrar Sesión",
                      "class": "icon ion-android-exit"
                    }
                  ]
                }];
              } else {
                $scope.groups = [{
                  "id": 1,
                  name: "Administración de Usuarios",
                  "items": [{
                      "id": 1,
                      "name": "Actualizar Datos",
                      "class": "icon ion-android-person"
                    },
                    {
                      "id": 3,
                      "name": "Cerrar Sesión",
                      "class": "icon ion-android-exit"
                    }
                  ]
                }];
              }
            }
          });





        }, 10)
      }

      $scope.getSeession();

      $scope.redirection = function(id) {
        console.log("id", id);
        if (id === 1) {
          $location.path("/editMe");
        } else if (id === 2) {
          $location.path("/usuarios");
        } else if (id === 3) {
          $scope.logout();
        }
      }

      $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
          $scope.shownGroup = null;
        } else {
          $scope.shownGroup = group;
        }
      };
      $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
      };

      $scope.logout = function() {

        var confirmPopup = $ionicPopup.confirm({
          title: 'Cerrar Sessión',
          template: 'Está seguro que desea salir?',
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
            octaveService.logout($rootScope.user.id).then(function(response) {
              //$scope.showAlert(response.data.message);
              $location.path("/login");
            });
          } else {
            console.log("no aceptó");
          }
        });
      }
    }
  ]);
