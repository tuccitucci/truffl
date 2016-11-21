// angular.module('Truffl')
//   .controller("SidebarCtrl", sidebarCtrl);
//
// sidebarCtrl.$inject = ['$scope', '$http', 'DailyList'];
//
// function sidebarCtrl($scope, $http, DailyList) {
//   var ctrl = this;
//   window.ctrl = ctrl;
//   ctrl.DailyList = DailyList;
//   ctrl.dailyFoods = DailyList.data;
//   ctrl.removeFood = DailyList.remove;
//   ctrl.totals = DailyList.totals;
//
// // ---------------Initial Value of Circles------------------
//
//   ctrl.caloriePercent = 0;
//   ctrl.proteinPercent = 0;
//   ctrl.vcPercent = 0;
//   ctrl.calciumPercent = 0;
//   ctrl.ironPercent = 0;
//
// // ---------------End Value of Circles----------------------
//
//
//   var calorieAllowance = 2000;
//   var proteinAllowance = 50;
//   var vcAllowance = 100;
//   var calciumAllowance = 100;
//   var ironAllowance = 100;
//
//
//
//   // ------------------Controls animation of lines---------------------
//   var lineConfig = {
//     strokeWidth: 4,
//     easing: 'easeInOut',
//     duration: 1400,
//     color: '#FFEA82',
//     trailColor: '#eee',
//     trailWidth: 1,
//     svgStyle: {width: '100%', height: '100%'},
//     from: {color: '#FFEA82'},
//     to: {color: '#ED6A5A'},
//     step: (state, bar) => {
//       bar.path.setAttribute('stroke', state.color);
//     }
//   };
//
// // ---------------$scope.$watch to update graphs---------------
//
//
//   $scope.$watch('ctrl.dailyFoods', function(newValue,oldValue) {
//     updateGraphs();
//   }, true);
//
//   $scope.$watch('ctrl.DailyList.data', function(newValue, oldValue){
//     ctrl.dailyFoods = newValue;
//     updateGraphs();
//   })
//
//   $scope.$watch('ctrl.DailyList.totals', function(newValue, oldValue){
//     ctrl.totals = newValue;
//     updateGraphs();
//   })
//
//   // -----------------Sets number of lines to display----------------------
//   var barone = new ProgressBar.Line(lineone, lineConfig);
//   var bartwo = new ProgressBar.Line(linetwo, lineConfig);
//   var barthree = new ProgressBar.Line(linethree, lineConfig);
//   var barfour = new ProgressBar.Line(linefour, lineConfig);
//   var barfive = new ProgressBar.Line(linefive, lineConfig);
//
// // ---------------Math to fill circles properly--------------------
//   function updateGraphs() {
//
//     ctrl.caloriePercent = ctrl.totals.calories/calorieAllowance > 1
//                           ? 1 : ctrl.totals.calories/calorieAllowance;
//     ctrl.proteinPercent = ctrl.totals.protein/proteinAllowance > 1
//                           ? 1 : ctrl.totals.protein/proteinAllowance;
//     ctrl.vcPercent = ctrl.totals.vc/vcAllowance > 1
//                           ? 1 : ctrl.totals.vc/vcAllowance;
//     ctrl.calciumPercent = ctrl.totals.calcium/calciumAllowance > 1
//                           ? 1 : ctrl.totals.calcium/calciumAllowance;
//     ctrl.ironPercent = ctrl.totals.iron/ironAllowance > 1
//                           ? 1 : ctrl.totals.iron/ironAllowance;
//
//
//
//     //-------------Sets lines to value of 100% possible----------------
//     barone.animate(ctrl.caloriePercent);  // Number from 0.0 to 1.0
//     bartwo.animate(ctrl.proteinPercent);  // Number from 0.0 to 1.0
//     barthree.animate(ctrl.vcPercent);  // Number from 0.0 to 1.0
//     barfour.animate(ctrl.calciumPercent);  // Number from 0.0 to 1.0
//     barfive.animate(ctrl.ironPercent);  // Number from 0.0 to 1.0
//   }
//
//
//
//
//
// }
