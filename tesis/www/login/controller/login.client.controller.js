angular.module('starter.login', ['starter.Service', 'ionic'])

  .controller('loginController', ['$scope', 'octaveService', '$ionicPopup', '$stateParams', '$ionicModal', '$location', '$timeout', '$ionicPlatform', '$ionicLoading', '$rootScope', '$ionicSideMenuDelegate','$ionicHistory',
    function($scope, octaveService, $ionicPopup, $stateParams, $ionicModal, $location, $timeout, $ionicPlatform, $ionicLoading, $rootScope, $ionicSideMenuDelegate,$ionicHistory) {

      $ionicSideMenuDelegate.canDragContent(false);


      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });

      $scope.login = function() {
        var user = {
          "username": $scope.user,
          "password": $scope.password
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
            $location.path('/home');
          }
        });
      }

      $scope.showAlert = function(msg) {
        var alertPopup = $ionicPopup.alert({
          template: '<div style="text-align:center">' + msg + '</div>'
        });
        alertPopup.then(function(res) {
          $scope.user = "";
          $scope.password = "";
        });
      };
    }
  ]);
