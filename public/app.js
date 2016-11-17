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
        .state('home', {
            url: '/home',
            templateUrl: 'views/home/home.html'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'views/about/about.html'
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard/dashboard.html',
            resolve: {
              journal: function(DailyList) {
                return DailyList.get();
              }
            }
        })
        .state('tryitout', {
            url: '/tryitout',
            templateUrl: 'views/tryitout/tryitout.html'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/auth/auth.html'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/auth/auth.html'
        });

    $urlRouterProvider.otherwise('/home');

}
