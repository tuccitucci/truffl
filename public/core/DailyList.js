angular.module('myApp')
  .factory("DailyList", DailyListCtrl);

function DailyListCtrl() {
    var service = this;

    service.data = [];

    service.addTo = addTo;
    service.remove = remove;

    function addTo(item) {
      service.data.push(item);
    }

    function remove(item, index) {
      service.data.splice(index,1);
      return;
    }

    return service;
}
