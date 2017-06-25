angular.module('starter.usuario', ['starter.Service', 'ionic'])

  .controller('userController', ['$scope', 'octaveService', '$ionicPopup', '$stateParams', '$ionicModal', '$location', '$timeout', '$ionicPlatform', '$ionicLoading', '$rootScope', '$ionicSideMenuDelegate', '$ionicHistory',
    function($scope, octaveService, $ionicPopup, $stateParams, $ionicModal, $location, $timeout, $ionicPlatform, $ionicLoading, $rootScope, $ionicSideMenuDelegate, $ionicHistory) {

      $scope.con = {};
      $scope.update = 0;
      console.log("location",$location.$$path);
      if($location.$$path === '/editMe'){
        $scope.con.id = $rootScope.user.id;
        $scope.con.name = $rootScope.user.name;
        $scope.con.lastname = $rootScope.user.lastname;
        $scope.con.email = $rootScope.user.username;
        if($rootScope.user.profile === 1){
          $scope.con.admin = true;
        }else{
          $scope.con.admin = false;
        }
      }

      $scope.getUsers = function() {
        octaveService.getUsers().then(function(response) {
          $scope.users = response.data;
        });
      };

      $scope.getUsers();

      $scope.modal2 = $ionicModal.fromTemplate(
        '<div class="modal">' +
        '<header class="bar bar-header bar-positive" style="background-color:#7BBE85 !important; border-color:#7BBE85 !important">' +
        '<h1 class="title">Nuevo Usuario</h1>' +
        '<div class="button button-clear" ng-click="closeModal(); modal2.hide()">' +
        '<span class="icon ion-close"></span></div></header>' +
        '<div id="registrarActivo-markdown2" class="show-list-numbers-and-dots">' +
        '<p style="color:#000000; margin-top: 50px;text-align:center"><strong>Nombre</strong></p>' +
        '  </div>' +
        '<label class="item item-input" style="margin:10px;padding:6px;">' +
        '<input placeholder="" ng-model="con.name" type="text">' +
        '</label>' +
        '<div id="registrarActivo-markdown2" class="show-list-numbers-and-dots">' +
        '<p style="color:#000000; margin-top: 12px;text-align:center"><strong>Apellido</strong></p>' +
        '  </div>' +
        '<label class="item item-input" style="margin:10px;padding:6px;">' +
        '<input placeholder="" ng-model="con.lastname" type="text">' +
        '</label>' +
        '<div id="registrarActivo-markdown2" class="show-list-numbers-and-dots">' +
        '<p style="color:#000000; margin-top: 12px;text-align:center"><strong>Email</strong></p>' +
        '  </div>' +
        '<label class="item item-input" style="margin:10px;padding:6px;">' +
        '<input placeholder="" type="email" ng-model="con.email" type="text">' +
        '</label>' +
        '<ion-toggle toggle-class="toggle-positive" ng-model="con.admin">Administrador</ion-toggle>' +
        '<ion-toggle ng-show ="update" toggle-class="toggle-positive" ng-model="con.reset">'+
        'Generar nueva contraseña</ion-toggle>' +
        '<button ng-show="!update" ng-click="saveUser(con);" class="button ' + 'button-dark ' + 'button-block">Guardar</button>' +
        '<button ng-show="update" ng-click="updateUser(con);" class="button  button-dark ' + 'button-block">Actualizar</button>' +
        '</div>', {
          scope: $scope,
          animation: 'slide-in-up'
        });

      $scope.closeModal = function() {
        $scope.con = {};
        $scope.update = 0;
      }

      $scope.saveUser = function(con) {

        if (!con) {
          $scope.showAlert("Por favor llene todos los datos");
        } else if (!con.email) {
          $scope.showAlert("Ingrese un email válido");
        } else if (!con.name || !con.lastname) {
          $scope.showAlert("Verfique que haya ingresado nombre y apellido del usuario");
        } else {
          $scope.modal2.hide();
          var profile = 1;
          if (!con.admin) {
            profile = 2;
          }
          var user = {
            "name": con.name,
            "lastname": con.lastname,
            "profile": profile,
            "username": con.email,
            "password":CryptoJS.MD5($scope.makePass()).toString()
          }
          octaveService.saveUser(user).then(function(response) {
            console.log("response",response);
            $scope.showAlert(response.data.message);
          });
        }
      }

      $scope.showAlert = function(msg) {
        var alertPopup = $ionicPopup.alert({
          template: msg
        });
        alertPopup.then(function(res) {

          $scope.con = {};
          $scope.update = 0;
          $scope.getUsers();
        });
      };

      $scope.showAlert2 = function(msg) {
        var alertPopup = $ionicPopup.alert({
          template: msg
        });
        alertPopup.then(function(res) {

          $location.path("/home");

        });
      };

      $scope.updateUser = function(con){

        if (!con) {
          $scope.showAlert("Por favor llene todos los datos");
        } else if (!con.email) {
          $scope.showAlert("Ingrese un email válido");
        } else if (!con.name || !con.lastname) {
          $scope.showAlert("Verfique que haya ingresado nombre y apellido del usuario");
        } else {
          $scope.modal2.hide();
          var profile = 1;
          if (!con.admin) {
            profile = 2;
          }
          var user = {
            "id": con.id,
            "name": con.name,
            "lastname": con.lastname,
            "profile": profile,
            "username": con.email
          }
          octaveService.updateUser(user).then(function(response) {
            console.log("response",response);
            $scope.showAlert(response.data.message);
          });
          if(con.reset){
            console.log("Reset password");
            var user = {
              "password":CryptoJS.MD5($scope.makePass()).toString(),
              "id":con.id
            }
            octaveService.updatePasswordUser(user).then(function(response) {
              console.log("response",response);
              $scope.showAlert(response.data.message);
            });
          }
        }
      }

      $scope.updateMe = function(con){

        if (!con) {
          $scope.showAlert("Por favor llene todos los datos");
        } else if (!con.email) {
          $scope.showAlert("Ingrese un email válido");
        } else if (!con.name || !con.lastname) {
          $scope.showAlert("Verfique que haya ingresado nombre y apellido del usuario");
        } else {
          var user = {
            "id": $scope.con.id,
            "name": con.name,
            "lastname": con.lastname,
            "profile": $rootScope.user.profile,
            "username": con.email
          }
          octaveService.updateUser(user).then(function(response) {
            console.log("response",response);
            $scope.showAlert2(response.data.message);
          });
          if(con.password){
            console.log("Reset password");
            var user = {
              "password":CryptoJS.MD5(con.password).toString(),
              "id":con.id
            }
            octaveService.updatePasswordUser(user).then(function(response) {
              console.log("response",response);
              $scope.showAlert2(response.data.message);
            });
          }
        }
      }

      $scope.view = function(user){
        $scope.update = 1;
        $scope.con.name = user.name;
        $scope.con.lastname = user.lastname;
        $scope.con.email = user.username;
        if(user.profileId === 1){
          $scope.con.admin = true;
        }else{
          $scope.con.admin = false;
        }
        $scope.con.id = user.id;
        $scope.modal2.show();
      }


      $scope.makePass = function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        console.log("contraseña creada",text);
        return text;
      }

      $scope.delete = function(id){
        var confirmPopup = $ionicPopup.confirm({
          title: 'Eliminar Usuario',
          template: 'Está seguro que desea eliminar este usuario?',
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
            octaveService.deleteUser(id).then(function(response) {
              $scope.showAlert(response.data.message);
            });
          } else {
            console.log("no aceptó");
          }
        });
      }

      $scope.cancel = function(){
        $location.path("/home");
      }



    }
  ]);
