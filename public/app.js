angular.module('myApp', ['ui.router', 'ngMaterial'])
    .config(appConfig);

function appConfig($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.defaults.cache = true;

    $stateProvider.state('main', {
            url: '/',
            templateUrl: 'components/main/main.html',

        })
        .state('about', {
            url: '/about',
            templateUrl: 'components/about/about.html'
        })
        .state('tryitout', {
            url: '/tryitout',
            templateUrl: 'components/tryitout/tryitout.html',

        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'components/signup/signup.html',
      
        });

    $urlRouterProvider.otherwise('/');

}
