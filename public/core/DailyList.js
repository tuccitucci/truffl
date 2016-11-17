angular.module('Truffl')
  .factory("DailyList", DailyListFactory);

// DailyListFactory.$inject = ['$http'];

function DailyListFactory($http) {
    var service = this;

    service.data = [];
    service.totals = {
      calories: 0,
      protein: 0,
      vc: 0,
      calcium: 0,
      iron: 0
    };

    service.addTo = addTo;
    service.remove = remove;
    service.get = get;
    service.clear = clear;

    function clear() {
      console.log('clearing')
      service.data = [];
      service.totals = {
        calories: 0,
        protein: 0,
        vc: 0,
        calcium: 0,
        iron: 0
      };
    }

    function get() {

      console.log("WE ARE GETTING THE LIST OF FOOD!!!");

      service.data = [];
      service.totals = {
        calories: 0,
        protein: 0,
        vc: 0,
        calcium: 0,
        iron: 0
      };

      $http.get('/api/journal').then(function(success){
        console.log("Success getting journal: ", success.data);
        service.data = success.data;
        _.each(service.data, totalOutCalories);
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

    function addTo(item) {
      var dataToPass = {
        food : item.item_name,
        calories : item.nf_calories,
        protein : item.nf_protein,
        vitc : item.nf_vitamin_c_dv,
        calcium : item.nf_calcium_dv,
        iron : item.nf_iron_dv
      }

      $http.post('/api/journal', dataToPass).then(function(success){
        console.log("success adding to db: ", success);
        item._id = success.data._id;
        service.data.push(success.data);
        totalOutCalories(item);
      }, function(err){
         console.log("error adding to db: ", err);
      });
    }

    function totalOutCalories(item) {
      service.totals.calories += Math.round(normalize(item, 'nf_calories'));
      service.totals.protein += Math.round(normalize(item, 'nf_protein'));
      service.totals.vc += Math.round(normalize(item, 'nf_vitamin_c_dv'));
      service.totals.calcium += Math.round(normalize(item, 'nf_calcium_dv'));
      service.totals.iron += Math.round(normalize(item, 'nf_iron_dv'));
    }

    function subOutCalories(item) {
      service.totals.calories -= Math.round(normalize(item, 'nf_calories'));
      service.totals.protein -= Math.round(normalize(item, 'nf_protein'));
      service.totals.vc -= Math.round(normalize(item, 'nf_vitamin_c_dv'));
      service.totals.calcium -= Math.round(normalize(item, 'nf_calcium_dv'));
      service.totals.iron -= Math.round(normalize(item, 'nf_iron_dv'));
    }

    function remove(item, index) {
      $http.post('/api/journal/delete', item).then(function(success) {
        subOutCalories(item);
        service.data.splice(index,1);
        console.warn('Successfully removed item', success);
      },function(err) {
        console.warn(err);
      });
    }

    return service;
}
