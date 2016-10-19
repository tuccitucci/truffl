angular.module('myApp')
  .controller("navCtrl", navController);

function navController($state) {
    var ctrl = this;

    ctrl.toggleNav = function() {
      var expanded = $('#navbar-main').attr('aria-expanded');
      if ( expanded ) {
        $('#navbar-main').collapse('toggle');
      }

    }

    ctrl.isCurrentRoute = function(stateName) {
      return $state.current.name === stateName;
    }
}
