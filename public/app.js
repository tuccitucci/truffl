angular.module('Truffl', ['ui.router', 'ngMaterial'])
    .config(appConfig)
    .run(run);

function run($rootScope) {
  var $body = document.querySelector("body");

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
      if (toState) {
          $body.classList = toState.name;
      }
  });
}

function appConfig(
  $stateProvider,
  $urlRouterProvider,
  $httpProvider,
  $locationProvider
) {
    // if(prod) {
      // $httpProvider.defaults.cache = true;
    // }
    // $locationProvider.html5Mode(true);

    $stateProvider
        .state('layout', {
            templateUrl: 'views/layout/layout.html'
        })
        .state('splash', {
            templateUrl: 'views/landing/landing.html'
        })
        .state('home', {
            url: '/',
            parent: 'splash',
            templateUrl: 'views/home/home.html'
        })
        .state('about', {
            url: '/about',
            parent: 'splash',
            templateUrl: 'views/about/about.html'
        })
        .state('dashboard', {
            url: '/dashboard',
            parent:'layout',
            templateUrl: 'views/dashboard/dashboard.html'
        })
        .state('dashboard.date', {
            url: '/:date',
            templateUrl: 'views/dashboard/dashboard.html'
        })
        .state('tryitout', {
            url: '/tryitout',
            parent:'splash',
            templateUrl: 'views/tryitout/tryitout.html'
        })
        .state('login', {
            url: '/login',
            parent:'splash',
            templateUrl: 'views/auth/auth.html'
        })
        .state('register', {
            url: '/register',
            parent:'splash',
            templateUrl: 'views/auth/auth.html'
        });

    $urlRouterProvider.otherwise('/');

}
