angular.module('Truffl')
  .factory("DailyList", DailyListFactory);

// DailyListFactory.$inject = ['$http'];

function DailyListFactory($http, $rootScope) {
    var service = this;

    service.data = [];
    service.totals = {}

    service.add = add;
    service.remove = remove;
    service.get = get;
    service.clear = clear;

    function clear() {
      service.data = [];
      service.totals = {}
    }

    function get() {
      console.log('getting')
      service.data = [];
      service.totals = {};

      return $http.get('/api/journal').then(function(success) {
        console.log("Success getting journal: ", success.data);
        service.data = success.data.list;
        service.totals = success.data.totals;
        return service.data;
      }, function(err){
        console.warn("Error getting journal: ", err);
      });
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

    function add(item) {
      if (item) {
        return $http.post('/api/journal', {data: item}).then(function(success){
          console.log("success adding to db: ", success.data);
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
