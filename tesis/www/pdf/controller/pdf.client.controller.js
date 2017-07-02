angular.module('starter.pdf', ['starter.Service', 'ionic'])

  .controller('pdfController', ['$scope', 'octaveService', '$ionicPopup', '$stateParams', '$ionicModal', '$location', '$timeout', '$ionicPlatform', '$ionicLoading',
    function($scope, octaveService, $ionicPopup, $stateParams, $ionicModal, $location, $timeout, $ionicPlatform, $ionicLoading) {


      $scope.getRiskCriteria = function() {
        octaveService.riskCriteria().then(function(response) {
          $scope.riskCriteria = response.data;
        });
      };
      $scope.getRiskCriteria();
      $scope.getCriticalActives = function() {
        octaveService.getCriticalActive().then(function(actives) {
          $scope.criticalActives = actives.data;
        });
      }
      $scope.getCriticalActives();
      $scope.getConcernAreas = function() {
        octaveService.getConcernAreasPDF().then(function(areas) {
          $scope.areas = areas.data;
        });
      };
      $scope.getConcernAreas();
      $scope.getRelativeRisk = function() {
        octaveService.getRelativeRisk().then(function(relativeRisk) {
          $scope.relativeRisk = relativeRisk.data;
        });
      };
      $scope.getRelativeRisk();
      var i, j;
      $ionicLoading.show();
      $timeout(function() {

        $scope.groups = [{
            "id": 1,
            name: "Criterios Medida de Riesgo",
            "items": []
          },
          {
            "id": 2,
            name: "Perfil Activos Críticos",
            "items": []
          },
          {
            "id": 3,
            name: "Documentación de Áreas de Preocupación",
            "items": []
          },
          {
            "id": 4,
            name: "Riesgo Relativo y Probabilidad Subjetiva",
            "items": []
          },
          {
            "id": 5,
            name: "Enfoque de Mitigación",
            "items": []
          },

        ];
        for (i = 0; i < $scope.groups.length; i++) {
          switch ($scope.groups[i].id) {
            case 1:
              for (j = 0; j < $scope.riskCriteria.length; j++) {
                $scope.groups[i].items.push($scope.riskCriteria[j]);
              }
              break;
            case 2:
              for (j = 0; j < $scope.criticalActives.length; j++) {
                $scope.groups[i].items.push($scope.criticalActives[j]);
              }
              break;
            case 3:
              for (j = 0; j < $scope.areas.length; j++) {
                $scope.groups[i].items.push($scope.areas[j]);
              }
              break;
            case 4:
              for (j = 0; j < $scope.relativeRisk.length; j++) {
                $scope.groups[i].items.push($scope.relativeRisk[j]);
              }
              break;
            case 5:
              for (j = 0; j < $scope.areas.length; j++) {
                $scope.groups[i].items.push($scope.areas[j]);
              }
              break;

          }

        }
        $ionicLoading.hide();
      }, 1000);

      $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
          $scope.shownGroup = null;
        } else {
          $scope.shownGroup = group;
        }
      };
      $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
      };

      $scope.showAlert = function(filename) {
        var alertPopup = $ionicPopup.alert({
          template: "<a style='margin-left:67px;font-size:23px;' href='#' onclick=" +
            "window.open('http://192.168.0.9:3040/" + filename + "','_system','location=yes');>VER PDF</a>",
          title: 'Generación Exitosa',
          okText: 'CERRAR'
        });
        alertPopup.then(function(res) {});
      };
      $scope.generatePDF = function(item, group) {
        console.log("item", item);
        console.log("group", group);
        $ionicLoading.show();
        switch (group.id) {
          case 1:
            octaveService.generatePdfRiskCriteria(item).then(function(filename) {
              $timeout(function() {
                $ionicLoading.hide();
                console.log("filename client", filename.data.filename);
                $scope.showAlert(filename.data.filename);
              }, 10)
            });
            break;
          case 2:
            octaveService.generatePdfCriticalActive(item).then(function(filename) {
              $timeout(function() {
                $ionicLoading.hide();
                console.log("filename client", filename.data.filename);
                $scope.showAlert(filename.data.filename);
              }, 10)
            });
            break;
          case 3:
            octaveService.getConsequencesPDF(item.id).then(function(consequences) {
              item.consequences = consequences.data;
              for (var i = 0; i < $scope.criticalActives.length; i++) {

                if ($scope.criticalActives[i].activo_id === item.activo_critico_id) {
                  item.activo = $scope.criticalActives[i].name;
                }
              }
              console.log("item client", item);
              octaveService.generatePdfAreaDocument(item).then(function(filename) {
                $timeout(function() {
                  $ionicLoading.hide();
                  console.log("filename client", filename.data.filename);
                  $scope.showAlert(filename.data.filename);
                }, 10)
              });
            });
            break;
          case 4:
            octaveService.getConsequencesPDF(item.id).then(function(consequences) {
              item.consequences = consequences.data;
              for (var i = 0; i < $scope.criticalActives.length; i++) {

                if ($scope.criticalActives[i].activo_id === item.activo_critico_id) {
                  item.activo = $scope.criticalActives[i].name;
                }
              }
              console.log("item client", item);
              octaveService.generatePDFRelative(item).then(function(filename) {
                $timeout(function() {
                  $ionicLoading.hide();
                  console.log("filename client", filename.data.filename);
                  $scope.showAlert(filename.data.filename);
                }, 10)
              });
            });
            break;

          case 5:
            octaveService.getActionPdf(item.id).then(function(action) {
              item.action = action.data;
              octaveService.getControls(item.id).then(function(controls) {
                item.controls = controls.data;
                console.log("item",item);
                octaveService.generatePdfAction(item).then(function(filename) {
                  $timeout(function() {
                    $ionicLoading.hide();
                    console.log("filename client", filename.data.filename);
                    $scope.showAlert(filename.data.filename);
                  }, 10)
                });
              });
            });
          default:

        }

      }


    }
  ]);
