angular.module('Truffl')
  .factory("DailyList", DailyListFactory);

// DailyListFactory.$inject = ['$http'];

function DailyListFactory($http, $rootScope, FoodJournal) {
    var service = this;

    service.data = [];

    service.add = add;
    service.remove = remove;
    service.getDay = getDay;
    service.clear = clear;

    function clear() {
      service.data = [];
      service.totals = {}
    }

    function getDay(start, end) {
      service.data = [];
      service.totals = {};

      return FoodJournal.get({
        startDate: moment(start).startOf('day').toDate(),
        endDate: moment(end).startOf('day').toDate()
      })
      .then(function(resp) {
        service.data = resp.list;
        service.totals = resp.totals;
        $rootScope.$broadcast('dailylist.newDay');
      })

    }

    function normalize(item, name) {
      var map = {
        nf_calories: "calories",
        nf_protein: "protein",
        nf_vitamin_c_dv: "vitc",
        nf_calcium_dv: "calcium",
        nf_iron_dv: "iron"
      };

      return item[name] || item[map[name]] || 0;
    }

    function add(item, date, customQty) {
      if (item) {
        date = date || moment().toDate();
        var data = _.extend(item, {date: date}, {customQty: customQty});
        return $http.post('/api/journal', {data: data}).then(function(success){
          console.warn("Added Item: ", success.data);
          item._id = success.data._id;
          service.data.push(success.data);
          $rootScope.$broadcast('dailylist.update');
        }, function(err){
          console.log("error adding to db: ", err);
        });
      }
    }

    function remove(item, index) {
      $http.post('/api/journal/delete', item).then(function(success) {
        service.data.splice(index,1);
        $rootScope.$broadcast('dailylist.update');
        console.warn('Successfully removed item', success);
      },function(err) {
        console.warn(err);
      });
    }

    return service;
}
