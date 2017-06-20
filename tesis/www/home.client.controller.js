angular.module('starter.home', ['starter.Service', 'ionic'])

  .controller('homeController', ['$scope', 'octaveService', '$ionicPopup', '$stateParams', '$ionicModal', '$location', '$timeout', '$ionicPlatform', '$ionicLoading', '$rootScope','$ionicNavBarDelegate','$ionicHistory',
    function($scope, octaveService, $ionicPopup, $stateParams, $ionicModal, $location, $timeout, $ionicPlatform, $ionicLoading, $rootScope,$ionicNavBarDelegate,$ionicHistory) {

      $scope.lastView = $ionicHistory.backView()
      console.log("lastview",$scope.lastView);

      //  $ionicNavBarDelegate.showBackButton(false);
      console.log("$rootScope.user", $rootScope.user);
      if (!$rootScope.user) {
        $location.path('/login');
      }
    }
  ]);
