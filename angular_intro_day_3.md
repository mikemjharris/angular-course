Link angualr into a database.

Need to do rails scaffold and build simple api.

Do we build an app with the class quickly or provide a seed app?  Should be pretty quick but need to practice.

Link into angualar.


rails new rails_angular
cd rails_angular
rails g scaffold Meal name:text price:float description:text 

rake db:migrate

we now have a working api!  Hurrah. Input a few meals to show it works and visit meals.json.

Add this to gem file.
gem 'angularjs-rails'

//= require angular  

in application.js

We need to copy and paster our app.js into applicaion js (or save in file to be precompiled)

We also need to create a view - we should put data inside the meals route.

Let's see how we can interact with the server.

The controllers need additonal functionality from the angular database.  The module we want is called $http.  To inlclude it in the controller we do the following. 

 
app.controller('MarketController', ['$http', function($http){
....

we also need to add a square bracket at the end:
 }]);

when we first go to the app we want meals to be set to an empty array until we receive data from the database.

this.meals = [];

We also need to define "this" as it will change within the get request.

var market = this

$http.get('http://localhost3000/meals.json').success(function(data){
  market.meals = data
})


this will adding data to the meals.  WE should have access to the data we saved in the database.


what happens if we want to add a meal to the database?

$http.get('http://localhost3000/meals.json').success(function(data){
  market.meals = data
})


Now we want to post to the database:
      market.meals.push(market.new_meal)
      $http.post('/meals.json', { meal: this.new_meal });
      market.new_meal = {}

This means we can now post and update the database. 
this.addMeal = function() {
      market.meals.push(market.new_meal)
      $http.post('/meals.json', { meal: this.new_meal });
      market.new_meal = {}
    }

maybe we want to check if the submissions was successful or not:
 
      $http.post('/meals.json', { meal: this.new_meal }).success(function(data){
        market.meals.push(market.new_meal)
        market.new_meal = {}  
      });

LAB:  Add delete and edit using angular. 

Again highight that you can navigate around the page and that there is minimal update. 






