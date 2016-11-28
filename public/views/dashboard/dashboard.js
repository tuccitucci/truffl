angular.module('Truffl')
  .controller("DashboardCtrl", dashboardCtrl);

// dashboardCtrl.$inject = ['$scope', '$http', 'DailyList'];

function dashboardCtrl($scope, $http, DailyList, FoodJournal, $stateParams, $state) {
  var ctrl = this;
  window.ctrl = ctrl;
  ctrl.DailyList = DailyList;
  ctrl.dailyFoods = DailyList.data;
  ctrl.totals = DailyList.totals;
  ctrl.round = round;
  ctrl.updateGraphs = updateGraphs;
  ctrl.circles = {};
  ctrl.previousDay = previousDay;
  ctrl.nextDay = nextDay;

  function init() {
    setCurrentDate();

    DailyList.getDay(ctrl.currentDate, ctrl.currentDate)
    .then(updateGraphs);
  }

  function setCurrentDate() {
    ctrl.currentDate = moment($stateParams.date).toDate();
  }

  function previousDay() {
    var date = moment(ctrl.currentDate).subtract(1, 'days');
    $state.go('dashboard.date', {date: date.format('YYYYMMDD')})
  }

  function nextDay() {
    var date = moment(ctrl.currentDate).add(1, 'days');
    $state.go('dashboard.date', {date: date.format('YYYYMMDD')})
  }

  // ---------------$scope.$watch to update graphs---------------
    $scope.$on('dailylist.update', function() {
      init();
    }, true);

    $scope.$on('$stateChangeSuccess', init);

// ---------------Controls animation of circles---------------

  var circleConfig = {
    strokeWidth: 10,
    easing: 'easeInOut',
    duration: 1400,
    color: '#7FB027',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: null,
    from: {color: '#FFEA82'},
    to: {color: '#7FB027'},
    step: (state, bar) => {
      bar.path.setAttribute('stroke', state.color);
    }
  };

// ---------------Math to fill circles properly--------------------
  var nutrientsToGraph = [
    'Energy',
    'Protein',
    'Fat',
    'Carbohydrate',
    'Water',
    'Caffeine'
  ].map(_.camelCase);

  ctrl.nutrientsToGraph = nutrientsToGraph;

  var allowances = _.mapKeys({
    'Energy': 2000,
    'Protein': 60,
    'Fat': 65,
    'Carbohydrate': 210,
    'Water': 600,
    'Caffeine': 210
  }, function(v, k) { return _.camelCase(k) });

  function updateGraphs() {
    ctrl.totals = DailyList.totals;
    ctrl.totals = _.mapKeys(ctrl.totals, function(v, k) { return _.camelCase(k) });
    ctrl.dailyFoods = DailyList.data;
    ctrl.percents = {};

      _.forIn(nutrientsToGraph, function(n) {
        ctrl.percents[n] = 0;

        if (ctrl.totals.energy) {
          if (n === 'Energy') { ctrl.totals[n][0] = ctrl.totals[n][0]/4.186 }
          ctrl.percents[n] = ctrl.totals[n][0]/allowances[n] > 1 ? 1 :  ctrl.totals[n][0]/allowances[n];
        }

        if (!ctrl.circles[n]) { ctrl.circles[n] = new ProgressBar.Circle('#'+n, circleConfig); }
        ctrl.circles[n].animate(ctrl.percents[n]);
      });
  }

  function round(n) {
    return Math.ceil(n) || 0;
  }
}
