angular.module('starter.Service', [])

  .factory('octaveService', ['$http', '$q', function($http, $q) {

    var octaveService = {};
    var deferred = $q.defer();
    //var url = "http://192.168.0.48:3040";
    var url = "http://localhost:3040";
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

    octaveService.getActionPdf = function(id){
      return $http({
        url: url + '/api/getActionPdf',
        method: 'POST',
        data : {
          id
        }
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

    octaveService.deleteConcernArea = function(id){
      return $http({
        url: url + '/api/deleteConcernArea',
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

    octaveService.getConsequences = function(id) {
      return $http({
        url: url + '/api/getConsequences',
        method: 'POST',
        data: {
          id
        }
      });
    }
    octaveService.getConsequencesPDF = function(id) {
      return $http({
        url: url + '/api/getConsequencesPDF',
        method: 'POST',
        data: {
          id
        }
      });
    }
    octaveService.updateConcernArea = function(area) {
      return $http({
        url: url + '/api/updateConcernArea',
        method: 'POST',
        data: {
          area
        }
      });
    }

    octaveService.getConcernAreas = function() {
      return $http({
        url: url + '/api/getConcernAreas',
        method: 'GET'
      });
    }
    octaveService.getConcernAreasPDF = function() {
      return $http({
        url: url + '/api/getConcernAreasPDF',
        method: 'GET'
      });
    }
    var dataConcern = {};
    octaveService.setDataConcern = function(obj){
       dataConcern = obj;
    }
    octaveService.getDataConcern = function(){
      return dataConcern;
    }

    octaveService.generatePdfRiskCriteria = function(area){
      return $http({
        url: url + '/api/generatePdfRiskCriteria',
        method: 'POST',
        data:{
          area
        }
      });
    }
    octaveService.generatePdfCriticalActive = function(active){
      return $http({
        url: url + '/api/generatePdfCriticalActive',
        method: 'POST',
        data:{
          active
        }
      });
    }
    octaveService.generatePdfAreaDocument = function(area){
      return $http({
        url: url + '/api/generatePdfAreaDocument',
        method: 'POST',
        data:{
          area
        }
      });
    }
    //generatePDFRelative
    octaveService.generatePDFRelative = function(area){
      return $http({
        url: url + '/api/generatePDFRelative',
        method: 'POST',
        data:{
          area
        }
      });
    }

    octaveService.generatePdfAction = function(area){
      return $http({
        url: url + '/api/generatePdfAction',
        method: 'POST',
        data:{
          area
        }
      });
    }

    octaveService.getUser = function(user){
      return $http({
        url: url + '/api/getUser',
        method: 'POST',
        data:{
          user
        }
      });
    }

    octaveService.updateUser = function(user){
      return $http({
        url: url + '/api/updateUser',
        method: 'POST',
        data:{
          user
        }
      });
    }

    octaveService.updatePasswordUser = function(user){
      return $http({
        url: url + '/api/updatePasswordUser',
        method: 'POST',
        data:{
          user
        }
      });
    }

    octaveService.deleteUser = function(id){
      return $http({
        url: url + '/api/deleteUser',
        method: 'POST',
        data:{
          id
        }
      });
    }

    octaveService.getUsers = function(){
      return $http({
        url: url + '/api/getUsers',
        method: 'GET'
      });
    }

    octaveService.getSuggestedControls = function(){
      return $http({
        url: url + '/api/getSuggestedControls',
        method: 'GET'
      });
    }

    octaveService.saveUser = function(user){
      return $http({
        url: url + '/api/saveUser',
        method: 'POST',
        data:{
          user
        }
      });
    }

    octaveService.sessionActive = function(id){
      return $http({
        url: url + '/api/sessionActive',
        method: 'POST',
        data:{
          id
        }
      });
    }

    octaveService.logout = function(id){
      return $http({
        url: url + '/api/logout',
        method: 'POST',
        data:{
          id
        }
      });
    }

    octaveService.getSessionActive = function(id){
      return $http({
        url: url + '/api/getSessionActive',
        method: 'GET'
      });
    }

    octaveService.sendMailNewUser = function(user){
      return $http({
        url: url + '/api/sendMailNewUser',
        method: 'POST',
        data:{
          user
        }
      });
    }

    octaveService.sendMailResetPassword = function(user){
      return $http({
        url: url + '/api/sendMailResetPassword',
        method: 'POST',
        data:{
          user
        }
      });
    }




    return octaveService;

  }]);
