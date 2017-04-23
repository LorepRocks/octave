angular.module('starter.activeContainer', ['starter.Service', 'ionic', 'ngDraggable'])

  .controller('activeContainerController', ['$scope', 'octaveService', '$ionicPopup', '$stateParams', 'ngDraggable',
    function($scope, octaveService, $ionicPopup, $stateParams, ngDraggable) {

      $scope.containersTypes = [{
        id: 1,
        name: "Container Técnico"
      }, {
        id: 2,
        name: "Container Físico"
      }, {
        id: 3,
        name: "Container Personas"
      }];

      $scope.listItems = [{
        name: "some name",
        title: "title1"
      }, {
        name: "some name2",
        title: "title2"
      }, {
        name: "some name3",
        title: "title3"
      }, ];

      $scope.droppedObjects = [];
      $scope.input = {};
      $scope.containerFisico = [];
      $scope.containerTecnico = [];
      $scope.containerPersonal = [];

      $scope.onDragComplete = function(data, evt, origen) {
        console.log("origen", origen);
        if (origen == 'fisico') {
          var index = $scope.containerFisico.indexOf(data);
          if (index > -1) {
            $scope.containerFisico.splice(index, 1);
          }
        } else if (origen == 'tecnico') {
          var index = $scope.containerTecnico.indexOf(data);
          if (index > -1) {
            $scope.containerTecnico.splice(index, 1);
          }
        } else if (origen == 'personal') {
          var index = $scope.containerPersonal.indexOf(data);
          if (index > -1) {
            $scope.containerPersonal.splice(index, 1);
          }
        }
      }

      $scope.onDropComplete = function(data, evt, origen) {
        console.log("origen", origen);
        console.log("drop success, data:", data);
        if (origen === 'fisico') {
          var index = $scope.containerFisico.indexOf(data);
          if (index == -1) {
            console.log("ENTRÓ");
            $scope.containerFisico.push(data);
          }
        } else if (origen == 'tecnico') {
          var index = $scope.containerTecnico.indexOf(data);
          if (index == -1) {
            $scope.containerTecnico.push(data);
          }
        } else if (origen == 'personal') {
          var index = $scope.containerPersonal.indexOf(data);
          if (index == -1) {
            $scope.containerPersonal.push(data);
          }
        }
      }

      $scope.onDropCompleteInput = function(data, evt) {
        console.log("drop on input success, data:", data);
        $scope.input = data;
      }

      $scope.onDropCompleteRemove = function(data, evt) {
        console.log("drop success - remove, data:", data);
        var index = $scope.droppedObjects.indexOf(data);
        if (index != -1)
          $scope.droppedObjects.splice(index);
      }

      var onDraggableEvent = function(evt, data) {
        console.log("128", "onDraggableEvent", evt, data);
      }
      $scope.$on('draggable:start', onDraggableEvent);
      //$scope.$on('draggable:move', onDraggableEvent);
      $scope.$on('draggable:end', onDraggableEvent);

      $scope.getContainerByType = function() {
        console.log("getContainerByType", $scope.containerType);
        var typeId = {typeId : $scope.containerType.id};
        octaveService.getContainerByType(typeId).then(function(containers) {
          $scope.containers = containers.data;
        });
      }

      $scope.getActives = function() {
        console.log("getActives");
        octaveService.getActives().then(function(actives) {
          $scope.actives = actives.data;
        });
      };
    }
  ]);
