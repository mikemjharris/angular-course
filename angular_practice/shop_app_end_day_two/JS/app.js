(function() {  
  var app = angular.module('leatherLaneMarketApp', ['ngAnimate']);  

    app.controller('MarketController', function($scope){  
        this.basket = 0;
         this.stalls = stalls;  
         // this.selectedStall = stalls[0];

      this.selectStall = function(stall) {
        this.selectedStall = stall;
    }


      this.addStall = function() {  
        stalls.push(this.new_stall);  
        this.new_stall = {}
        $scope.stallForm.$setPristine();
      }

      this.addToBasket = function() {
        this.basket ++
    }



  });  


stalls = [  
  {  
    name: "Burrito",  
    price: 5,  
    description:  "Meat and vegetables in a delicious wrap",  
    availiable: true  
  },  
  {  
    name: "Pizza",  
    price: 6.5,  
    description:  "Cheese and meat and veg on some dough",  
    availiable: true  
  },
  {
    name: "Burger",
    price: 8.5,
    description: "Meat in a bun",
    availiable: true
  },
  {
    name: "Fallafel",
    price: 4,
    description: "Fallafel - that's all",
    availiable: true
  }

]  

})();

