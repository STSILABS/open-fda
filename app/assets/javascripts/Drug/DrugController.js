app.controller("DrugController", ['$scope', '$http', '$routeParams', '$location', 
  function ($scope, $http, $routeParams, $location) {

  window.DrugControllerScope = $scope;
  $scope.selectedDrug = {}
  $scope.drug, $scope.events = null;
  $scope.selectedLabel = null;
  $scope.searchPlaceholder = "enter drug name (e.g. Lipitor)";

  // typeahead search
  $scope.searchDrugs = function(val) {
    return $http.get('/api/v1/drugs.json', {
      params: {
        q: val
      }
    }).then(function(response){
      return response.data.results.map(function(item){
        return item;
      });
    });
  };

  $scope.onSelect = function (item, model, label) {
      // $scope.selectedDrug = item;
      $scope.navigateToDrug(item.product_ndc)
  };

  // fetch details for a given drug
  $scope.getDetail = function () {
    // label data
    $http.get('/api/v1/drugs/' + $scope.selectedDrug.product_ndc , {}
    ).then(function(response){
      $scope.drug = response.data;
      return true;
    });
  }

  // navigate among drugs
  $scope.navigateToDrug = function(product_ndc) {
    return $location.path("/drug/" + product_ndc);
  }

  // if we have a drug ID via the route, use that
  if ($routeParams.product_ndc) {
    $scope.drugLoading = true;
    $scope.selectedDrug.product_ndc = $routeParams.product_ndc;
    $scope.getDetail();
  }

  // link to FDA's recall details
  $scope.url_fda_enforcement_report = function( recall ) {
    var id = recall.recall_number,
        report_date = $scope.UTIL.parseDate(recall.report_date);

    return "http://www.accessdata.fda.gov/scripts/enforcement/enforce_rpt-Product-Tabs.cfm?action=select&recall_number="+id+"&w="+report_date+"&lang=eng"

  }


}]);
