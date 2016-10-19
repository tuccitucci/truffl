angular.module('myApp')
  .controller("mainCtrl", mainController);

  function mainController($http, DailyList) {
      var ctrl = this;
      ctrl.totalCal = 0;
      ctrl.vitC = 0;
      ctrl.currentNutrChoice = null;
      ctrl.currentSuggestion = null;
      ctrl.dailyFoods = DailyList.data;

      // data is put on the global scope by the database.js
      ctrl.data = data;

  }
