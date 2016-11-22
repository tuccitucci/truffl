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
  ctrl.round = round;

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
    svgStyle: null,
    from: {color: '#FFEA82'},
    to: {color: '#7FB027'},
    step: (state, bar) => {
      bar.path.setAttribute('stroke', state.color);
    }
  };

  // ------------------Controls animation of lines---------------------
  // var lineConfig = {
  //   strokeWidth: 4,
  //   easing: 'easeInOut',
  //   duration: 1400,
  //   color: '#FFEA82',
  //   trailColor: '#eee',
  //   trailWidth: 1,
  //   svgStyle: {width: '100%', height: '100%'},
  //   from: {color: '#FFEA82'},
  //   to: {color: '#ED6A5A'},
  //   step: (state, bar) => {
  //     bar.path.setAttribute('stroke', state.color);
  //   }
  // };

// ---------------$scope.$watch to update graphs---------------
  updateGraphs();

  $scope.$on('dailylist.update', function() {
    console.log("Hello am i firing?");
    updateGraphs();

  }, true);


// ----------------Sets number of circles to display---------------

  var circone = new ProgressBar.Circle(circleone, circleConfig);
  var circtwo = new ProgressBar.Circle(circletwo, circleConfig);
  var circthree = new ProgressBar.Circle(circlethree, circleConfig);
  var circfour = new ProgressBar.Circle(circlefour, circleConfig);
  var circfive = new ProgressBar.Circle(circlefive, circleConfig);

  // -----------------Sets number of lines to display----------------------
  // var barone = new ProgressBar.Line(lineone, lineConfig);
  // var bartwo = new ProgressBar.Line(linetwo, lineConfig);
  // var barthree = new ProgressBar.Line(linethree, lineConfig);
  // var barfour = new ProgressBar.Line(linefour, lineConfig);
  // var barfive = new ProgressBar.Line(linefive, lineConfig);

// ---------------Math to fill circles properly--------------------
  function updateGraphs() {
    DailyList.get().then(function() {

      ctrl.dailyFoods = DailyList.data;
      ctrl.totals = DailyList.totals;
      console.log("checking: ", ctrl.totals);
      if (ctrl.dailyFoods.length === 0) {
        ctrl.caloriePercent = 0;
        ctrl.proteinPercent = 0;
        ctrl.vcPercent = 0;
        ctrl.calciumPercent = 0;
        ctrl.ironPercent = 0;
      }  else if (ctrl.totals.Energy) {
        ctrl.caloriePercent = (ctrl.totals.Energy[0]/4.186)/calorieAllowance > 1
        ? 1 : (ctrl.totals.Energy[0]/4.186)/calorieAllowance;
        ctrl.proteinPercent = ctrl.totals.Protein[0]/proteinAllowance > 1
        ? 1 : ctrl.totals.Protein[0]/proteinAllowance;
        ctrl.vcPercent = ctrl.totals["Vitamin C, total ascorbic acid"][0]/vcAllowance > 1
        ? 1 : ctrl.totals["Vitamin C, total ascorbic acid"][0]/vcAllowance;
        ctrl.calciumPercent = ctrl.totals["Calcium, Ca"][0]/calciumAllowance > 1
        ? 1 : ctrl.totals["Calcium, Ca"][0]/calciumAllowance;
        ctrl.ironPercent = ctrl.totals["Iron, Fe"][0]/ironAllowance > 1
        ? 1 : ctrl.totals["Iron, Fe"][0]/ironAllowance;
      }


// ----------------Sets circles to value of 100% possible---------
    circone.animate(ctrl.caloriePercent);  // Number from 0.0 to 1.0
    circtwo.animate(ctrl.proteinPercent);  // Number from 0.0 to 1.0
    circthree.animate(ctrl.vcPercent);  // Number from 0.0 to 1.0
    circfour.animate(ctrl.calciumPercent);  // Number from 0.0 to 1.0
    circfive.animate(ctrl.ironPercent);  // Number from 0.0 to 1.0
  });

    //-------------Sets lines to value of 100% possible----------------
    // barone.animate(ctrl.caloriePercent);  // Number from 0.0 to 1.0
    // bartwo.animate(ctrl.proteinPercent);  // Number from 0.0 to 1.0
    // barthree.animate(ctrl.vcPercent);  // Number from 0.0 to 1.0
    // barfour.animate(ctrl.calciumPercent);  // Number from 0.0 to 1.0
    // barfive.animate(ctrl.ironPercent);  // Number from 0.0 to 1.0
  }

  function round(n) {
    return Math.ceil(n) || 0;
  }


}
