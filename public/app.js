angular.module('myApp', ['ui.router'])
    .config(myRouter)
    .controller("navCtrl", navController)
    .controller("secondCtrl", secondController);

function myRouter($stateProvider, $urlRouterProvider) {
    $stateProvider.state('main', {
            url: '/',
            templateUrl: 'components/main/main.html',
            controller: 'mainCtrl as ctrl'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'components/signup/signup.html',
            controller: 'secondCtrl as sCtrl'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'components/about/about.html'
        });

        $urlRouterProvider.otherwise('/');
}

function secondController() {
    var sCtrl = this;
    sCtrl.greeting = "Second";
}

function navController($state) {
    var nCtrl = this;

    nCtrl.isCurrentRoute = function(stateName) {
      return $state.current.name === stateName;
    }
}

// Nutritional Data test database
//
// var egg = new Nutrition("egg", 78, 5, 187, 6, 5, 10, 0, 11, 2, 3, 1);
// var bacon = new Nutrition("bacon", 43, 3.3, 9, 3, 0, 1, 0, 0, 0, 0, 0);
// var potato = new Nutrition("potato", 163, 0.2, 0, 4.3, 0, 0, 70, 0, 2, 9, 12);
// var cheese = new Nutrition("cheese", 113, 9, 29, 7, 5, 3, 0, 1, 20, 1, 2);
//
//
// class Nutrition {
//     constructor(name, calories, fat, cholestorol, protein, vitaminA, vitaminB,
//     vitaminC, vitaminD, calcium, iron, magnesium) {
//
//         this.name = name;
//         this.calories = calories;
//         this.fat = fat;
//         this.cholestorol = cholestorol;
//         this.protein = protein;
//         this.vitaminA = vitaminA;
//         this.vitaminB = vitaminB;
//         this.vitaminC = vitaminC;
//         this.vitaminD = vitaminD;
//         this.calcium = calcium;
//         this.iron = iron;
//         this.magnesium = magnesium;
//
//     }
//
//     caloriesCount() {
//       console.log("A(n) " + this.name + " has " + this.calories + " calories");
//     }
//     fatCount() {
//       console.log("A(n) " + this.name + " has " + this.fat + " grams of fat");
//     }
//     cholestorolCount() {
//       console.log("A(n) " + this.name + " has " + this.cholestorol + " milligrams of cholestorol");
//     }
//     proteinCount() {
//       console.log("A(n) " + this.name + " has " + this.protein + " grams of protein");
//     }
//     vitaminACount() {
//       console.log("A(n) " + this.name + " has " + this.vitaminA + " percent of daily Vitamin A");
//     }
//     vitaminBCount() {
//       console.log("A(n) " + this.name + " has " + this.vitaminB + " percent of daily Vitamin B");
//     }
//     vitaminCCount() {
//       console.log("A(n) " + this.name + " has " + this.vitaminC + " percent of daily Vitamin C");
//     }
//     vitaminDCount() {
//       console.log("A(n) " + this.name + " has " + this.vitaminD + " percent of daily Vitamin D");
//     }
//     calciumCount() {
//       console.log("A(n) " + this.name + " has " + this.calcium + " percent of daily calcium");
//     }
//     ironCount() {
//       console.log("A(n) " + this.name + " has " + this.iron + " percent of daily iron");
//     }
//     magnesiumCount() {
//       console.log("A(n) " + this.name + " has " + this.magnesium + " percent of daily magnesium");
//     }
//
// }
//
// function pullData(Nutrition) {
//   var x = document.getElementById("mySelect");
//
//     document.getElementById("test").Nutrition();
// }

// function pullNutrition() {
//     document.getElementById("myDropdown").classList.toggle("show");
// }
//
// window.onclick = function(event) {
//   if (!event.target.matches('.dropbtn')) {
//
//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// }
