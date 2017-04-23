angular.module('starter.user', [])

  .config(function($stateProvider, $urlRouterProvider) {

    console.log($stateProvider);

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
      .state('activeRegister', {
        url: '/activeRegister',
        templateUrl: 'activeRegister/views/activeRegister.client.view.html'
      })

      .state('riskCriteria', {
        url: '/riskCriteria',
        templateUrl: 'riskCriteria/views/riskCriteria.client.view.html'
      })

      .state('criticalActive', {
        url: '/criticalActive',
        templateUrl: 'criticalActive/view/criticalActive.client.view.html'
      })

      .state('container', {
        url: '/container',
        templateUrl: 'containers/views/container.client.view.html'
      })

      .state('home', {
        url: '/home',
        templateUrl: 'home.html'
      })

      .state('containerAssociated',{
        url:'/activeContainer',
        templateUrl:'ActiveContainer/views/activeContainer.client.view.html'
      })

     $urlRouterProvider.otherwise('/home')
  });
