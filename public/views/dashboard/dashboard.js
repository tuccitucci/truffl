angular.module('Truffl')
  .controller("DashboardCtrl", dashboardCtrl);

dashboardCtrl.$inject = ['$scope', '$http', 'DailyList'];

function dashboardCtrl($scope, $http, DailyList) {
  var ctrl = this;
  window.ctrl = ctrl;
  ctrl.DailyList = DailyList;
  ctrl.dailyFoods = DailyList.data;
  ctrl.removeFood = DailyList.remove;
  ctrl.totals = DailyList.totals;

// ---------------Initial Value of Circles------------------

  ctrl.caloriePercent = 0;
  ctrl.proteinPercent = 0;
  ctrl.vcPercent = 0;
  ctrl.calciumPercent = 0;
  ctrl.ironPercent = 0;

// ---------------End Value of Circles----------------------


  var calorieAllowance = 2000;
  var proteinAllowance = 50;
  var vcAllowance = 100;
  var calciumAllowance = 100;
  var ironAllowance = 100;

// ---------------Controls animation of circles---------------

  var circleConfig = {
    strokeWidth: 10,
    easing: 'easeInOut',
    duration: 1400,
    color: '#7FB027',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: null
  };

// ---------------$scope.$watch to update graphs---------------


  $scope.$watch('ctrl.dailyFoods', function(newValue,oldValue) {
    updateGraphs();
  }, true);

  $scope.$watch('ctrl.DailyList.data', function(newValue, oldValue){
    ctrl.dailyFoods = newValue;
    updateGraphs();
  })

  $scope.$watch('ctrl.DailyList.totals', function(newValue, oldValue){
    ctrl.totals = newValue;
    updateGraphs();
  })

// ----------------Sets number of circles to display---------------

  var barone = new ProgressBar.Circle(circleone, circleConfig);
  var bartwo = new ProgressBar.Circle(circletwo, circleConfig);
  var barthree = new ProgressBar.Circle(circlethree, circleConfig);
  var barfour = new ProgressBar.Circle(circlefour, circleConfig);
  var barfive = new ProgressBar.Circle(circlefive, circleConfig);

// ---------------Math to fill circles properly--------------------
  function updateGraphs() {

    ctrl.caloriePercent = ctrl.totals.calories/calorieAllowance > 1
                          ? 1 : ctrl.totals.calories/calorieAllowance;
    ctrl.proteinPercent = ctrl.totals.protein/proteinAllowance > 1
                          ? 1 : ctrl.totals.protein/proteinAllowance;
    ctrl.vcPercent = ctrl.totals.vc/vcAllowance > 1
                          ? 1 : ctrl.totals.vc/vcAllowance;
    ctrl.calciumPercent = ctrl.totals.calcium/calciumAllowance > 1
                          ? 1 : ctrl.totals.calcium/calciumAllowance;
    ctrl.ironPercent = ctrl.totals.iron/ironAllowance > 1
                          ? 1 : ctrl.totals.iron/ironAllowance;

// ----------------Sets circles to value of 100% possible---------
    barone.animate(ctrl.caloriePercent);  // Number from 0.0 to 1.0
    bartwo.animate(ctrl.proteinPercent);  // Number from 0.0 to 1.0
    barthree.animate(ctrl.vcPercent);  // Number from 0.0 to 1.0
    barfour.animate(ctrl.calciumPercent);  // Number from 0.0 to 1.0
    barfive.animate(ctrl.ironPercent);  // Number from 0.0 to 1.0
  }





}
