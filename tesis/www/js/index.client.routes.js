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
        templateUrl: 'activeRegister/views/activeRegister.client.view.html',
        controller: 'activeRegisterController'
      })

      .state('riskCriteria', {
        url: '/riskCriteria',
        templateUrl: 'riskCriteria/views/riskCriteria.client.view.html',
        controller: 'riskCriteriaController'
      })

      .state('criticalActive', {
        url: '/criticalActive',
        templateUrl: 'criticalActive/view/criticalActive.client.view.html',
        controller: 'criticalActiveController'
      })

      .state('container', {
        url: '/container',
        templateUrl: 'containers/views/container.client.view.html',
        controller: 'containerController'
      })

      .state('home', {
        url: '/home',
        templateUrl: 'home.html',
        controller :'homeController'
      })



      .state('login', {
        url: '/login',
        templateUrl: 'login/view/login.client.view.html',
        controller: 'loginController'
      })

      .state('containerAssociated', {
        url: '/activeContainer',
        templateUrl: 'ActiveContainer/views/activeContainer.client.view.html'
      })

      .state('impactArea', {
        url: '/prioritizeArea',
        templateUrl: 'PrioritizeImpactArea/views/prioritizeImpactArea_client_view.html'
      })
      .state('documentArea', {
        cache: false,
        url: '/documentArea',
        templateUrl: 'documentArea/views/documentArea.client.view.html',
        controller: 'documentAreaController'
      })
      .state('action', {
        url: '/action',
        templateUrl: 'Action/view/action.client.view.html',
        controller: 'actionController'
      })
      .state('concernArea', {
        cache: false,
        url: '/concernArea',
        templateUrl: 'concernArea/view/concernArea.client.view.html',
        controller: 'concernAreaController'
      })
      .state('relativeRisk', {
        url: '/relativeRisk',
        templateUrl: 'relativeRisk/view/relativeRisk.client.view.html',
        controller: 'relativeRiskController'
      })

      .state('pdf', {
        url: '/pdf',
        templateUrl: 'pdf/view/pdf.client.view.html',
        controller: 'pdfController'
      })

      .state('editMe', {
        url: '/editMe',
        templateUrl: 'users/view/editUser.client.view.html',
        controller: 'userController'
      })
      .state('usuarios', {
        url: '/usuarios',
        templateUrl: 'users/view/user.client.view.html',
        controller: 'userController'
      });

    $urlRouterProvider.otherwise('/login')
  });
