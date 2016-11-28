angular.module('Truffl')
  .filter('toMoment', function() {

  return function(input, optional1, optional2) {
    return moment(input).format('MMM Do, YYYY');
  }

});
