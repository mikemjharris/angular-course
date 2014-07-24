(function() {

  var app = angular.module('food', []);

  app.controller('MarketController', function(){
    this.meals = meals;
    this.selectedMeal = meals[0];
    this.tab = 1;
    this.order = 0;
    this.basket = [1,2,3];

    this.selectMeal = function(meal) {
      this.selectedMeal = meal;
      this.order = 0;
    }

    this.selectTab = function(tab) {
      this.tab = tab;
    }

    this.addMeal = function() {

      this.order++
    }
    
    this.removeMeal = function() {
      this.order = Math.max(0, this.order - 1);
    }

    this.addToBasket = function(meal) {


    }
  });



  meals = [
  {
    name: "burrito",
    price: 5,
    description:  "Meat and vegetables in a delicious wrap",
    availiable: true,
    reviews: [
      {
        stars: 4,
        comment: "Really good I go every day",
        author: "Mike"
      },
      {
        stars: 3,
        comment: "Tres bon",
        author: "Gerry"
      } 
    ]
  },
  {
    name: "burger",
    price: 6.5,
    description:  "Meat in a bun",
    availiable: true
  }
]

})();