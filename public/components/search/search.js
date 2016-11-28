angular.module('Truffl')
  .controller('SearchCtrl', searchCtrl);

function searchCtrl($scope, $http, $timeout, $q, $log, DailyList, $stateParams) {
  var search = this;

  search.nutrientTotals = [];

  search.querySearch   = querySearch;
  search.selectedItemChange = selectedItemChange;
  search.searchTextChange   = searchTextChange;
  search.addFood = addFood;

  search.selectedFoodMeasures = [
    {
      label: '100g',
      customQty: '1'
    }
  ];

  search.selectedMeasure = search.selectedFoodMeasures;

  search.selectedItems = [];

  // ******************************
  // Internal methods
  // ******************************

  // DOCS: https://ndb.nal.usda.gov/ndb/doc/apilist/API-LIST.md

  var params = {
    format: 'json',
    max: '10',
    ds: 'Standard Reference',
    offset: '0',
    api_key: 'rylOA6sKtXOLBEMUbJmvsSv7LtGfuZkEFcYOi0jd'
  };

  /**
   * Search for states... use $timeout to simulate
   * Cache on/off located in app.js
   * remote dataservice call.
   */
   function querySearch (query) {
     params.q = query;

     return $http.get("http://api.nal.usda.gov/ndb/search/", { params: params })
       .then(function(response) {
         if (_.has(response.data.list, 'item')) {
           return response.data.list.item;
         }
         return [];
       });
   }

  function searchTextChange(text) {
    search.selectedFoodReport = undefined;
  }

  function totalNutrients(f) {
    search.selectedFoodReport = f || search.selectedFoodReport || {};
    search.selectedFoodReport.totals = {};
    if (search.selectedFoodReport.nutrients) {

      search.selectedFoodReport.nutrients.forEach(function(nutrient,index) {
        if (!search.selectedFoodReport.totals[nutrient.name]) {
          search.selectedFoodReport.totals[nutrient.name] = {total:0}
        }

        search.selectedFoodReport.totals[nutrient.name].total += nutrient.value;
        search.selectedFoodReport.totals[nutrient.name].unit = nutrient.unit;
        search.selectedFoodReport.totals[nutrient.name].measures = nutrient.measures[0].label;

        if (search.selectedMeasure && search.selectedMeasure.customQty) {
          var singleServingAmount = nutrient.value;
          search.selectedFoodReport.totals[nutrient.name].total = Math.ceil(singleServingAmount*search.selectedMeasure.customQty);
        }

      });
    }
  }

  $scope.$on('dailylist.update', function() {
    search.selectedFoodReport = undefined;
  });

  $scope.$watch('search.selectedMeasure', function(n, o) {
    if (n) { totalNutrients(); }
  }, true);

  function getMeasures(food) {
    return _(food)
      .reduce(function(res, item) {
        if (!_.find(res, {label: item.measures[0].label})) {
          res.push(item.measures[0]);
        }
        return res;
      }, [])
  }

  function selectedItemChange(item) {
    if (item) {
      params.type = 'f';
      params.ndbno = item.ndbno;
      $http.get("http://api.nal.usda.gov/ndb/reports/", { params: params })
      .then(function(response) {
        // search.selectedFoodMeasures = getMeasures(response.data.report.food.nutrients);
        totalNutrients(response.data.report.food);
        return response.data.report.food;
      });
    }
  }

  function addFood() {
    var date = moment($stateParams.date).toDate();
    DailyList.add(search.selectedItem, date, search.selectedMeasure.customQty);
    search.selectedItem = null;
    updateSuggestion();
  };

  function updateSuggestion() {
    var suggestions = [
      "You need more calcium in your diet...Have some yogurt!",
      "Your magnesium intake is unacceptable...organic brown rice would help!",
      "Do you have a problem with Vitamin D? No? Good...eat some tuna!",
      "Brussel Sprouts! No? Well figure out something else with Vitamin C to eat!",
    ];
    search.currentSuggestion = suggestions[Math.floor(Math.random() * (suggestions.length-1)) + 1];
  }

  /**
   * Create filter function for a query string
   */
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);

    return function filterFn(state) {
      return (state.value.indexOf(lowercaseQuery) === 0);
    };

  }
}
