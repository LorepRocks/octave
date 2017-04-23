angular.module('starter.container', ['starter.Service', 'ionic'])

  .controller('containerController', ['$scope', 'octaveService', '$ionicPopup', '$stateParams',
    function($scope, octaveService, $ionicPopup, $stateParams) {

      $scope.loadData = function() {

        $scope.containerType = {name:"",type:0};
        $scope.internalTitle = "";
        $scope.internalDescriptionTitle = "";
        $scope.internalOwnerTitle = "";
        $scope.externalTitle = "";
        $scope.externalDescriptionTitle = "";
        $scope.externalOwnerTitle = "";
        $scope.containers = [{
            name: "Contenedor Técnico",
            type: 1
          },
          {
            name: "Contenedor Físico",
            type: 2
          },
          {
            name: "Contenedor Personas",
            type: 3
          }
        ];

      }

      $scope.selectContainerType = function() {
        console.log($scope.containerType);
        if ($scope.containerType.type == 1 || $scope.containerType.type == 2) {
          $scope.internalTitle = "INTERNO";
          $scope.internalDescriptionTitle = "Descripción del Contenedor";
          $scope.internalOwnerTitle = "Propietarios";
          $scope.externalTitle = "EXTERNO";
          $scope.externalDescriptionTitle = "Descripción del Contenedor";
          $scope.externalOwnerTitle = "Propietarios";
        } else if ($scope.containerType.type == 3) {
          $scope.internalTitle = "PERSONAL INTERNO"
          $scope.internalDescriptionTitle = "Nombre o Rol/Responsabilidad";
          $scope.internalOwnerTitle = "Área/Departamento";
          $scope.externalTitle = "PERSONAL EXTERNO";
          $scope.externalDescriptionTitle = "Contratista, Proveedor";
          $scope.externalOwnerTitle = "Organización";

        }
      }

      $scope.saveContainer = function(){
        var container ={
          name:$scope.name,
          internalDescription:$scope.internalDescription,
          internalOwner:$scope.internalOwner,
          externalDescription:$scope.externalDescription,
          externalOwner:$scope.externalOwner,
          containerType:$scope.containerType.type
        };
        console.log(container);
        console.log($scope.nameContainer);
        octaveService.saveContainer(container).then(function(response) {
          $scope.showAlert(response.data.message);
          $scope.cleanFields();
        });
      }

      $scope.cleanFields = function() {
        $scope.name = "";
        $scope.internalDescription = "";
        $scope.internalOwner = "";
        $scope.externalDescription = "";
        $scope.externalOwner = "";
        $scope.containerType = {name:"",type:0};
        $scope.internalTitle = "";
        $scope.internalDescriptionTitle = "";
        $scope.internalOwnerTitle = "";
        $scope.externalTitle = "";
        $scope.externalDescriptionTitle = "";
        $scope.externalOwnerTitle = "";
      }

      $scope.showAlert = function(msg) {
        var alertPopup = $ionicPopup.alert({
          template: msg
        });
        alertPopup.then(function(res) {
        });
      };

    }
  ]);
