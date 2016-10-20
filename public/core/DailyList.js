angular.module('myApp')
  .factory("DailyList", DailyListCtrl);

function DailyListCtrl() {
    var service = this;

    service.data = [];
    service.totals = {
      calories: 0,
      vc: 0,
      vd: 0,
      ve: 0
    };

    service.addTo = addTo;
    service.remove = remove;

    function addTo(item) {
      service.data.push(item);
      totalOutCalories(item);
    }

    function totalOutCalories(item) {
      service.totals.calories += item.nf_calories;
      service.vc += item.nf_vitamin_c_dv;
    }

    function remove(item, index) {
      service.data.splice(index,1);
      return;
    }

    return service;
}
