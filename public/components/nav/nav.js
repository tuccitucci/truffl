angular.module('Truffl')
  .controller("navCtrl", navController);

function navController($state, $http, DailyList) {
    var nav = this;

    nav.toggleNav = function() {
      var expanded = $('#navbar-main').attr('aria-expanded');
      if ( expanded ) {
        $('#navbar-main').collapse('toggle');
      }
    }

    nav.isAuthed = function () {
      return localStorage.getItem('auth') == 'true' ? true : false;
    }

    nav.isCurrentRoute = function(stateName) {
      return $state.current.name === stateName;
    }

    nav.logout = function() {
        $http.get('/api/logout').then(function() {
          localStorage.setItem('auth', false);
          DailyList.clear();
          $state.go('login', {}, { reload: true });
        })
    }
}
