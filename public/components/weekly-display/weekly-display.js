(function(){
  'use strict';

  var weeklyDisplay = {
    // bindings: {},
    templateUrl: 'components/weekly-display/weekly-display.html',
    controller: WeeklyDisplayController
  };

  function WeeklyDisplayController(DailyList) {
    var ctrl = this;

    ctrl.title = "Weekly Display";

    ctrl.totals = DailyList.data;
    
  }

  angular.module('Truffl')
  .component('weeklyDisplay', weeklyDisplay);
})();
