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

    function remove(item) {
      //remove it
      return;
    }

    return service;
}
