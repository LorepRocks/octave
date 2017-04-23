
angular.module('starter.user',[])

.controller('userController',['$scope', '$stateParams',
function($scope,$stateParams) {


  $scope.tasks = [
    { title: 'Collect coins' },
    { title: 'Eat mushrooms' },
    { title: 'Get high enough to grab the flag' },
    { title: 'Find the Princess' }
  ];

  $scope.login= function(){
    console.log($scope.username);
    console.log($scope.password);
    
  }
}])
