angular.module('myApp')
  .controller("navCtrl", navController);

function navController($state) {
    var ctrl = this;

    ctrl.isCurrentRoute = function(stateName) {
      return $state.current.name === stateName;
    }
}
