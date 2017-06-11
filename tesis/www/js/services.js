angular.module('starter.Service', [])

  .factory('octaveService', ['$http', '$q', function($http, $q) {

    var octaveService = {};
    var deferred = $q.defer();
    var url = "http://192.168.0.9:3040";
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

    octaveService.getAction = function(){
      return $http({
        url: url + '/api/getAction',
        method: 'GET'
      });
    }

    octaveService.getControls = function(id){
      return $http({
        url: url + '/api/getControls',
        method: 'POST',
        data:{id}
      });
    }

    octaveService.saveControl = function(control){
      return $http({
        url: url + '/api/saveControl',
        method: 'POST',
        data: {
          control
        }
      });
    }

    octaveService.updateControl = function(control){
      return $http({
        url: url + '/api/updateControl',
        method: 'POST',
        data: {
          control
        }
      });
    }

    octaveService.deleteControl = function(id){
      return $http({
        url: url + '/api/deleteControl',
        method: 'POST',
        data: {
          id
        }
      });
    }

    octaveService.updateActive = function(active){
      return $http({
        url: url + '/api/updateActive',
        method: 'POST',
        data: {
          active
        }
      });
    }

    octaveService.deleteActive = function(id){
      return $http({
        url: url + '/api/deleteActive',
        method: 'POST',
        data: {
          id
        }
      });
    }
    octaveService.updateCriticalActive = function(active){
      return $http({
        url: url + '/api/updateCriticalActive',
        method: 'POST',
        data: {
          active
        }
      });
    }

    octaveService.deleteCriticalActive = function(id){
      return $http({
        url: url + '/api/deleteCriticalActive',
        method: 'POST',
        data: {
          id
        }
      });
    }

    octaveService.updateRiskCriteria = function(risk){
      return $http({
        url: url + '/api/updateRiskCriteria',
        method: 'POST',
        data: {
          risk
        }
      });
    }

    octaveService.deleteRiskCriteria = function(id){
      return $http({
        url: url + '/api/deleteRiskCriteria',
        method: 'POST',
        data: {
          id
        }
      });
    }
    octaveService.getContainers = function(){
      return $http({
        url: url + '/api/getContainers',
        method: 'GET'
      });
    }
    octaveService.updateContainer = function(container){
      return $http({
        url: url + '/api/updateContainer',
        method: 'POST',
        data: {
          container
        }
      });
    }

    octaveService.deleteContainer = function(id){
      return $http({
        url: url + '/api/deleteContainer',
        method: 'POST',
        data: {
          id
        }
      });
    }

    octaveService.getActivesInContainer = function(containerId) {
      return $http({
        url: url + '/api/getActivesInContainer',
        method: 'POST',
        data: {
          containerId
        }
      });
    }

    return octaveService;

  }]);
