angular.module('starter.login', ['starter.Service', 'ionic'])

  .controller('loginController', ['$scope', 'octaveService', '$ionicPopup', '$stateParams', '$ionicModal', '$location', '$timeout', '$ionicPlatform', '$ionicLoading', '$rootScope', '$ionicSideMenuDelegate', '$ionicHistory',
    function($scope, octaveService, $ionicPopup, $stateParams, $ionicModal, $location, $timeout, $ionicPlatform, $ionicLoading, $rootScope, $ionicSideMenuDelegate, $ionicHistory) {




      $ionicPlatform.registerBackButtonAction(function(event) {
        if ($location.$$path == "/login") {
          //navigator.app.exitApp(); //<-- remove this line to disable the exit
          console.log("false");
          return false;

        } else {
          navigator.app.backHistory();
        }
      }, 100);

      $scope.getSession = function() {
        $timeout(function(){
          octaveService.getSessionActive().then(function(response) {
            console.log(response);
            if (!response.data.message) {
              $scope.userlogged = response.data;
              $rootScope.user = $scope.userlogged[0];
              $location.path('/home');
            }
          });
        },10)
      }

      $scope.load = function(){
        $ionicSideMenuDelegate.canDragContent(false);

        $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
        });
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        $ionicSideMenuDelegate.toggleLeft();
        $scope.user = "";
        $scope.password = "";
        $scope.getSession();
      }



      $scope.login = function() {
        var user = {
          "username": $scope.user.toLowerCase(),
          "password": CryptoJS.MD5($scope.password).toString()
        }
        octaveService.getUser(user).then(function(login) {
          $scope.userlogged = login.data;
          console.log("login", $scope.userlogged);
          if ($scope.userlogged.message) {
            $scope.showAlert($scope.userlogged.message);
          } else {
            $rootScope.user = $scope.userlogged[0];
            $scope.user = "";
            $scope.password = "";
            octaveService.sessionActive($scope.userlogged[0].id).then(function(response) {
              console.log(response);
              $location.path('/home');
            });

          }
        });
      }

      $scope.showAlert = function(msg) {
        var alertPopup = $ionicPopup.alert({
          template: '<div style="text-align:center">' + msg + '</div>'
        });
        alertPopup.then(function(res) {

          $scope.password = "";
        });
      };
    }
  ]);
