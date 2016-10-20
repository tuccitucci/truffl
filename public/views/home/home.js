angular.module('myApp')
  .controller("HomeCtrl", homeCtrl);

function homeCtrl($scope, $http, DailyList) {
  var ctrl = this;

  ctrl.dailyFoods = DailyList.data;
  ctrl.removeFood = DailyList.remove;
  ctrl.totals = DailyList.totals;
  ctrl.caloriePercent = 0;

  var calorieAllowance = 2000;

  var circleConfig = {
    strokeWidth: 6,
    easing: 'easeInOut',
    duration: 1400,
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: null
  };

  $scope.$watch('ctrl.dailyFoods', function(newValue,oldValue) {
    updateGraphs();
  }, true);

  var barone = new ProgressBar.Circle(circleone, circleConfig);
  var bartwo = new ProgressBar.Circle(circletwo, circleConfig);
  var barthree = new ProgressBar.Circle(circlethree, circleConfig);
  var barfour = new ProgressBar.Circle(circlefour, circleConfig);

  function updateGraphs() {
    // Need to cut this number at two decimal places
    // Google it
    ctrl.caloriePercent = ctrl.totals.calories/ calorieAllowance;

    barone.animate(ctrl.caloriePercent);  // Number from 0.0 to 1.0
    bartwo.animate(0.8);  // Number from 0.0 to 1.0
    barthree.animate(0.8);  // Number from 0.0 to 1.0
    barfour.animate(0.8);  // Number from 0.0 to 1.0
  }

}



  // progressbar.js@1.0.0 version is used
// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/

// ProgressBar = function() {
// var bar = new ProgressBar.Circle(container, {
// color: '#aaa',
// // This has to be the same size as the maximum width to
// // prevent clipping
// strokeWidth: 4,
// trailWidth: 1,
// easing: 'easeInOut',
// duration: 1400,
// text: {
// autoStyleContainer: false
// },
// from: { color: '#aaa', width: 1 },
// to: { color: '#333', width: 4 },
// // Set default step function for all animate calls
// step: function(state, circle) {
// circle.path.setAttribute('stroke', state.color);
// circle.path.setAttribute('stroke-width', state.width);
//
// var value = Math.round(circle.value() * 100);
// if (value === 0) {
//   circle.setText('');
// } else {
//   circle.setText(value);
// }
//
// }
// });
// bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
// bar.text.style.fontSize = '2rem';
//
// bar.animate(1.0);  // Number from 0.0 to 1.0x
// }
