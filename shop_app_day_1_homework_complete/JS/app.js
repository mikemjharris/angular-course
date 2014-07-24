(function() {

  var app = angular.module('food', []);

  app.controller('MarketController', function(){
    this.meals = meals;
    this.selectedMeal = meals[0];
    this.tab = 2;

    this.selectMeal = function(meal) {
      this.selectedMeal = meal;
    }

    this.selectTab = function(tab) {
      this.tab = tab
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