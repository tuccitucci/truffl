angular.module('Truffl')
  .factory("FoodJournal", FoodJournalFactory);

function FoodJournalFactory($http) {
    var service = this;

    service.get = get;

    function get(params) {

      return $http.get('/api/journal', {params: params})
        .then(function(resp) {
          console.warn('Success getting Journal:', params, resp.data);
          return resp.data;
        })
        .catch(function(error) {
          console.warn('Error getting Journal:', error);
        });
    }


    return service;
}
