angular.module('myApp', ['ui.router'])
    .config(myRouter)
    .controller("navCtrl", navController)
    .controller("secondCtrl", secondController);

function myRouter($stateProvider, $urlRouterProvider) {
    $stateProvider.state('main', {
            url: '/',
            templateUrl: 'components/main/main.html',
            controller: 'Autocompleter as ctrl'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'components/signup/signup.html',
            controller: 'secondCtrl as sCtrl'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'components/about/about.html'
        });

        $urlRouterProvider.otherwise('/');
}

function secondController() {
    var sCtrl = this;
    sCtrl.greeting = "Second";
}

function navController($state) {
    var nCtrl = this;

    nCtrl.isCurrentRoute = function(stateName) {
      return $state.current.name === stateName;
    }
}
