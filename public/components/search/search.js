angular.module('myApp')
  .controller('searchCtrl', searchCtrl);

function searchCtrl($http, $timeout, $q, $log, DailyList) {
  var self = this;

  self.querySearch   = querySearch;
  self.selectedItemChange = selectedItemChange;
  self.searchTextChange   = searchTextChange;
  //self.addFood   = addFood;
  self.selectedItems = [];
  self.totalCal = 0;
  self.vitC = 0;

  window.self = self;


  // ******************************
  // Internal methods
  // ******************************

  var params = {
    results:"0:02",
    fields:"brand_name,item_name,nf_calories,nf_vitamin_c_dv",

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
   * remote dataservice call.
   */
   function querySearch (query) {
     return $http.get("https://api.nutritionix.com/v1_1/search/"+ query,{params: params})
       .then(function(response) {
        //  console.log(response.data.hits);
         return response.data.hits;
       });
   }

  function searchTextChange(text) {
    $log.info('Text changed to ' + text);
  }

  function selectedItemChange(item) {
    $log.info('Item changed to ' + JSON.stringify(item));
  }

  //function addFood() {
  self.addFood = function() {
    DailyList.addTo(self.selectedItem.fields);
    console.log(self.selectedItem.fields.nf_calories)
    self.totalCal = self.totalCal + self.selectedItem.fields.nf_calories;
    self.vitC = self.vitC + self.selectedItem.fields.nf_vitamin_c_dv;
    console.log(self.totalCal)
    self.selectedItem = null;
    updateSuggestion();
  };
// test function for calculating column total values

  //  function getTotal() {
  //    var calc = this;
  //    var total = 0;
  //    for (var i = 0; i < calc.ctrl.dailyFoods.length; i++) {
  //      var result = calc.ctrl.dailyFoods[i];
  //      total += (result.nf_calories[i++])
  //    }
  //    return total;
  //  }

  function updateSuggestion() {
    var suggestions = [
      "You need more calcium in your diet...Have some yogurt!",
      "Your magnesium intake is unacceptable...organic brown rice would help!",
      "Do you have a problem with Vitamin D? No? Good...eat some tuna!",
      "Brussel Sprouts! No? Well figure out something else with Vitamin C to eat!",
    ];
    self.currentSuggestion = suggestions[Math.floor(Math.random() * (suggestions.length-1)) + 1];
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
