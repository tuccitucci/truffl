
angular.module('myApp').controller("mainCtrl", mainController);

function mainController($http) {
    var ctrl = this;

    ctrl.currentNutrChoice = null;
    ctrl.currentSuggestion = null;
    ctrl.dailyFoods = [];

    // data is put on the global scope by the database.js
    ctrl.data = data;

    ctrl.query = "";
    ctrl.params = {
      results:"0:20",
      fields:"item_name,brand_name,item_id,nf_calories",
      appId:"4a5a17f6",
      appKey:"f25f0fcce93631c8ea309a564a8ede7a",
    }

    ctrl.getResults = function getResults() {
      $http.get("https://api.nutritionix.com/v1_1/search/"+ctrl.query,{params:ctrl.params})
        .then(function(response) {
          console.log(response);
          ctrl.results = response.data
        });
    };


    ctrl.addFood = function addFood() {
      ctrl.dailyFoods.push(ctrl.currentNutrChoice);
      ctrl.currentNutrChoice = null;
      updateSuggestion();
    };

    function updateSuggestion() {
      var suggestions = [
        "You need more calcium in your diet...Have some yogurt!",
        "Your magnesium intake is unacceptable...organic brown rice would help!",
        "Do you have a problem with Vitamin D? No? Good...eat some tuna!",
        "Brussel Sprouts! No? Well figure out something else with Vitamin C to eat!",
      ];

      ctrl.currentSuggestion = suggestions[Math.floor(Math.random() * (suggestions.length-1)) + 1];
    }
}
