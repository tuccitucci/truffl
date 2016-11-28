(function(){
  'use strict';

  var foodList = {
    // bindings: {},
    templateUrl: 'components/food-list/food-list.html',
    controller: FoodListController,
    controllerAs: 'ctrl'
  };

  function FoodListController(DailyList, $rootScope, $stateParams) {
    var ctrl = this;
    ctrl.removeFood = DailyList.remove;

    init();

    $rootScope.$on('dailylist.newDay', function() {
        ctrl.list = DailyList.data;
    });

    function init() {
      setCurrentDate();
      DailyList.getDay(ctrl.currentDate, ctrl.currentDate)
      .then(function() {
        ctrl.list = DailyList.data;
      });
    }

    function setCurrentDate() {
      ctrl.currentDate = moment($stateParams.date).toDate();
    }
  }

  angular.module('Truffl')
  .component('foodList', foodList);
})();
