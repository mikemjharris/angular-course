(function() {

  var app = angular.module('food', []);

  app.controller('MarketController', function(){
    this.meals = meals;

    this.selectMeal = function(meal) {
      this.selectedMeal = meal;
    }
  });



  meals = [
  {
    name: "burrito",
    price: 5,
    description:  "Meat and vegetables in a delicious wrap",
    availiable: true
  },
  {
    name: "burger",
    price: 6.5,
    description:  "Meat in a bun",
    availiable: true
  }
]

})();