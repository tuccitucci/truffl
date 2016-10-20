angular.module('myApp')
  .factory("DailyList", DailyListCtrl);

function DailyListCtrl() {
    var service = this;

    service.data = [];
    service.totals = {
      calories: 0,
      vc: 0,
      calcium: 0,
      iron: 0
    };

    service.addTo = addTo;
    service.remove = remove;

    function addTo(item) {
      service.data.push(item);
      totalOutCalories(item);
    }

    function totalOutCalories(item) {
      service.totals.calories += Math.round(item.nf_calories);
      service.totals.vc += Math.round(item.nf_vitamin_c_dv);
      service.totals.calcium += Math.round(item.nf_calcium_dv);
      service.totals.iron += Math.round(item.nf_iron_dv);

    }

    function remove(item, index) {
      service.totals.calories -= Math.round(item.nf_calories);
      service.totals.vc -= Math.round(item.nf_vitamin_c_dv);
      service.totals.calcium -= Math.round(item.nf_calcium_dv);
      service.totals.iron -= Math.round(item.nf_iron_dv);
      service.data.splice(index,1);
      return;
    }

    return service;
}
