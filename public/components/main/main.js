
angular.module('myApp')
// .controller("mainCtrl", mainController);

//
// function mainController($http) {
//     var ctrl = this;
//
//     ctrl.currentNutrChoice = null;
//     ctrl.currentSuggestion = null;
//     ctrl.dailyFoods = [];
//
//     // data is put on the global scope by the database.js
//     ctrl.data = data;
//
//     ctrl.query = "";
//     ctrl.params = {
//       results:"0:01",
//       fields:"brand_name,item_name,nf_calories",
//
//       appId:"4a5a17f6",
//       appKey:"f25f0fcce93631c8ea309a564a8ede7a",
//
//       filters:{
//         "item_type":2
//       }
//     }
//
//     ctrl.getResults = function getResults() {
//       $http.get("https://api.nutritionix.com/v1_1/search/"+ctrl.query,{params:ctrl.params})
//         .then(function(response) {
//           console.log(response);
//           ctrl.results = response.data
//         });
//     };
//
//
//     ctrl.addFood = function addFood() {
//       ctrl.dailyFoods.push(ctrl.currentNutrChoice);
//       ctrl.currentNutrChoice = null;
//       updateSuggestion();
//     };
//
//     function updateSuggestion() {
//       var suggestions = [
//         "You need more calcium in your diet...Have some yogurt!",
//         "Your magnesium intake is unacceptable...organic brown rice would help!",
//         "Do you have a problem with Vitamin D? No? Good...eat some tuna!",
//         "Brussel Sprouts! No? Well figure out something else with Vitamin C to eat!",
//       ];
//
//       ctrl.currentSuggestion = suggestions[Math.floor(Math.random() * (suggestions.length-1)) + 1];
//     }
// }

.controller('Autocompleter', [
        '$http',
        '$timeout',
        function($http, $timeout) {
            var AutoCtrl = this;

            AutoCtrl.search = function(searchTerm) {
                return $http({
                    url: 'https://trackapi.nutritionix.com/v2/search/instant',
                    params: { query: searchTerm },
                    headers: {
                        "x-app-id":  "4a5a17f6",
                        "x-app-key": "f25f0fcce93631c8ea309a564a8ede7a"
                    }
                });
            };

            AutoCtrl.searchTerm;

            AutoCtrl.doSearch = function() {
                console.debug(AutoCtrl.searchTerm);

                if( AutoCtrl.searchPromise ) {
                    $timeout.cancel( AutoCtrl.searchPromise );
                }
                AutoCtrl.searchPromise = $timeout(function() {
                    AutoCtrl.search(AutoCtrl.searchTerm)
                        .then(AutoCtrl.success, AutoCtrl.error);
                }, 200);
            };

            AutoCtrl.success = function(res) {
                AutoCtrl.searchData = res.data;
            };

            AutoCtrl.error = function(error) {
                console.error('Autocomplete error', error);
            };
        }]);
