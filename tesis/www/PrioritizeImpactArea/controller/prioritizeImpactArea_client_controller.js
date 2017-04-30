angular.module('starter.prioritizeArea', ['starter.Service', 'ionic', 'ngDraggable'])

  .controller('prioritizeImpactAreaController', ['$scope', 'octaveService', '$ionicPopup', '$stateParams', 'ngDraggable',
    function($scope, octaveService, $ionicPopup, $stateParams, ngDraggable) {

      $scope.areas = [{
        id: 1,
        name: "Reputación y Confianza del Cliente"
      }, {
        id: 2,
        name: "Económico"
      }, {
        id: 3,
        name: "Productividad"
      }, {
        id: 4,
        name: "Seguridad y Salud"
      }, {
        id: 5,
        name: "Multas"
      }, {
        id: 6,
        name: "Sanciones Penales"
      }];

      $scope.data = {
        showDelete: false
      };

      $scope.itemButtons = [{
          text: 'Edit',
          type: 'button-assertive',
          onTap: function(item) {
            alert('Edit Item: ' + item.id);
          }
        },
        {
          text: 'Share',
          type: 'button-calm',
          onTap: function(item) {
            alert('Share Item: ' + item.id);
          }
        }
      ];

      $scope.onItemDelete = function(item) {
        $scope.items.splice($scope.items.indexOf(item), 1);
      };

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
      $scope.associatedActive = [];
      $scope.containerPersonal = [];
      $scope.active = false;
      $scope.lengthAreas = $scope.areas.length;
      $scope.lengthActiveSelected = 0;
      $scope.lengthPrioritizeArea = 0;
      $scope.prioritizeArea = [];

      $scope.onDragComplete = function(data, evt, origen, index) {
        //console.log("origen", origen);
        if (origen == 'area') {
          // var index = $scope.actives.indexOf(data);
          // if (index > -1) {
          //   $scope.actives.splice(index, 1);
          //   $scope.lengthActives=$scope.actives.length;
          // }
          console.log("index", index);
        } else if (origen == 'tecnico') {
          var index = $scope.associatedActive.indexOf(data);
          if (index > -1) {
            $scope.associatedActive.splice(index, 1);
            $scope.actives.push(data);
            $scope.lengthActives = $scope.actives.length;
            $scope.lengthActiveSelected = $scope.associatedActive.length;
          }
        } else if (origen == 'personal') {
          var index = $scope.containerPersonal.indexOf(data);
          if (index > -1) {
            $scope.containerPersonal.splice(index, 1);
          }
        }
      }

      $scope.onDropComplete = function(data, evt, origen, index) {

        if (origen === 'area') {
          // var index = $scope.prioritizeArea.indexOf(data);
          // if (index == -1) {
          //   console.log("ENTRÓ");
          //   $scope.prioritizeArea.push(data);


        } else if (origen == 'tecnico') {
          var index = $scope.associatedActive.indexOf(data);
          if (index == -1) {
            $scope.associatedActive.push(data);
            $scope.lengthActiveSelected = $scope.associatedActive.length;

          }
        } else if (origen == 'personal') {
          var index = $scope.containerPersonal.indexOf(data);
          if (index == -1) {
            $scope.containerPersonal.push(data);
          }

        }
      }

      $scope.onDropCompleteInput = function(data, evt) {
        //  console.log("drop on input success, data:", data);
        $scope.input = data;
      }

      $scope.onDropCompleteRemove = function(data, evt) {
        //console.log("drop success - remove, data:", data);
        var index = $scope.droppedObjects.indexOf(data);
        if (index != -1)
          $scope.droppedObjects.splice(index);
      }

      var onDraggableEvent = function(evt, data) {
        //  console.log("128", "onDraggableEvent", evt, data);
      }
      $scope.$on('draggable:start', onDraggableEvent);
      //$scope.$on('draggable:move', onDraggableEvent);
      $scope.$on('draggable:end', onDraggableEvent);

      $scope.getContainerByType = function() {
        console.log("getContainerByType", $scope.containerType);
        var typeId = {
          typeId: $scope.containerType.id
        };
        octaveService.getContainerByType(typeId).then(function(containers) {
          $scope.containers = containers.data;
        });
      }

      $scope.getActives = function() {
        $scope.active = true;
        octaveService.getActivesExcludeContainer($scope.containerSelected.id).then(function(actives) {
          if (actives) {
            $scope.lengthActives = actives.data.length;
          }

          $scope.actives = actives.data;
        });
      };

      $scope.saveAssoaciatedActives = function() {
        console.log("Activos asociados", JSON.stringify($scope.associatedActive));
        var promises = [];
        octaveService.saveActiveContainer($scope.associatedActive, $scope.containerSelected).then(function(response) {
          $scope.showAlert(response.data.message);
        });

        $scope.showAlert = function(msg) {
          var alertPopup = $ionicPopup.alert({
            template: msg
          });
          alertPopup.then(function(res) {
            $scope.clean();
          });
        };

        $scope.clean = function() {
          $scope.associatedActive = [];
          $scope.containers = [];
          $scope.actives = [];
          $scope.containerType = [];
          $scope.lengthActives = 0;
          $scope.lengthActiveSelected = 0;
        }


      }
    }
  ]);
