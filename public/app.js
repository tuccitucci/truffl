angular.module('myApp', ['ui.router', 'ngMaterial'])
    .config(appConfig);

function appConfig($stateProvider, $urlRouterProvider, $httpProvider) {
    // $httpProvider.defaults.cache = true;

    $stateProvider.state('home', {
            url: '/',
            templateUrl: 'views/home/home.html'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'views/about/about.html'
        })
        .state('tryitout', {
            url: '/tryitout',
            templateUrl: 'views/tryitout/tryitout.html'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'views/signup/signup.html'
        });

    $urlRouterProvider.otherwise('/');

}
