angular.module('myApp')
  .controller('SearchCtrl', searchCtrl);

function searchCtrl($http, $timeout, $q, $log, DailyList) {
  var search = this;

  search.querySearch   = querySearch;
  search.selectedItemChange = selectedItemChange;
  search.searchTextChange   = searchTextChange;
  // search.addFood   = addFood;
  search.selectedItems = [];
  search.totalCal = 0;
  search.vitC = 0;
  search.totalCalcium = 0;
  search.totalIron = 0;

  // window.search = search;


  // ******************************
  // Internal methods
  // ******************************

  var params = {
    results:"0:02",
    fields:"brand_name,item_name,nf_calories,nf_vitamin_c_dv,nf_calcium_dv,nf_iron_dv",

    // Jeff
    // appId:"4a5a17f6",
    // appKey:"f25f0fcce93631c8ea309a564a8ede7a",

    // Shannon
    appId:"66fa1085",
    appKey:"451cd69d6214daa71660d85ab7abaab3",

    filters:{
      "item_type":2
    }
  }

  /**
   * Search for states... use $timeout to simulate
   * Cache on/off located in app.js
   * remote dataservice call.
   */
   function querySearch (query) {
     return $http.get("https://api.nutritionix.com/v1_1/search/"+ query,{params: params})
       .then(function(response) {
         return response.data.hits;
       });
   }

  function searchTextChange(text) {
    $log.info('Text changed to ' + text);
  }

  function selectedItemChange(item) {
    $log.info('Item changed to ' + JSON.stringify(item));
  }

  // function addFood() {
  search.addFood = function() {
    DailyList.addTo(search.selectedItem.fields);
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
