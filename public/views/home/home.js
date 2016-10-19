angular.module('myApp')
  .controller("mainCtrl", mainController);

  function mainController($http, DailyList) {
      var ctrl = this;
      var data = {};
      ctrl.dailyFoods = DailyList.data;
      ctrl.removeFood = DailyList.remove;
      ctrl.totalCal = 0;
      ctrl.vitC = 0;
      ctrl.currentNutrChoice = null;
      ctrl.currentSuggestion = null;
      ctrl.dailyFoods = DailyList.data;

      // data is put on the global scope by the database.js
      ctrl.data = data;


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
