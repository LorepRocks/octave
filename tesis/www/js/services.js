angular.module('starter.Service', [])

  .factory('octaveService', ['$http', '$q', function($http, $q) {

    var octaveService = {};
    var deferred = $q.defer();
    var url = "http://192.168.0.45:3040";
    //var url = "http://localhost:3040";
    octaveService.activeRegister = function(active) {
      $http({
        url: url + '/api/activeRegistry',
        method: 'POST',
        data: active
      }).success(function(response, status, headers, config) {
        console.log("RES", response);
        deferred.resolve(response);
      }).error(function(err, status, headers, config) {
        console.log("RES ERR", err);
        deferred.reject(err);
      });
      return deferred.promise;
    }

    octaveService.riskCriteria = function() {
      return $http({
        url: url + '/api/getRiskCriteria',
        method: 'GET'
      });
    }

    octaveService.getImpactArea = function() {
      return $http({
        url: url + '/api/getImpactArea',
        method: 'GET'
      });
    }

    octaveService.getActives = function() {
      return $http({
        url: url + '/api/getActives',
        method: 'GET'
      });
    }

    octaveService.saveImpactArea = function(area) {
      return $http({
        url: url + '/api/saveImpactArea',
        method: 'POST',
        data: area
      });
    };

    octaveService.saveCriticalActive = function(criticalActive) {
      return $http({
        url: url + '/api/saveCriticalActive',
        method: 'POST',
        data: criticalActive
      });
    }

    octaveService.getCriticalActive = function() {
      return $http({
        url: url + '/api/getCriticalActive',
        method: 'GET',
      });
    }

    octaveService.saveRiskCriteria = function(risk) {
      return $http({
        url: url + '/api/saveRiskCriteria',
        method: 'POST',
        data: risk
      });
    }

    octaveService.saveContainer = function(container) {
      return $http({
        url: url + '/api/saveContainer',
        method: 'POST',
        data: container
      });
    }

    octaveService.getContainerByType = function(typeId) {
      return $http({
        url: url + '/api/getContainerByType',
        method: 'POST',
        data: typeId
      });
    }

    octaveService.saveActiveContainer = function(active, container) {
      return $http({
        url: url + '/api/saveActiveContainer',
        method: 'POST',
        data: {
          active,
          container
        }
      });
    }

    octaveService.getActivesExcludeContainer = function(containerId) {
      return $http({
        url: url + '/api/getActivesExcludeContainer',
        method: 'POST',
        data: {
          containerId
        }
      });
    }

    octaveService.updateIndiceImpactArea = function(area) {
      return $http({
        url: url + '/api/updateIndiceImpactArea',
        method: 'POST',
        data: {
          area
        }
      });
    }
    octaveService.saveConcernArea = function(area){
      return $http({
        url: url + '/api/saveConcernArea',
        method: 'POST',
        data: {
          area
        }
      });
    }

    octaveService.getRelativeRisk = function(){
      return $http({
        url: url + '/api/getRelativeRisk',
        method: 'GET'
      });
    }

    return octaveService;

  }]);
