// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require angular
//= require jquery
//= require jquery_ujs
//= require_tree .



(function() {

  var app = angular.module('food', []);

  app.controller('MarketController', ['$http', function($http){
    var market = this

    this.meals = [];
    $http.get('http://localhost:3000/meals.json').success(function(data){
        market.meals = data
    })

    

    this.selectMeal = function(meal) {
      this.selectedMeal = meal;
    }

    this.addMeal = function() {
      
      $http.post('/meals.json', { meal: this.new_meal }).success(function(data){
        market.meals.push(market.new_meal)
        market.new_meal = {}  
      });
      
    }
  }]);


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