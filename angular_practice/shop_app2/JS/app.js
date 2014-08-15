(function() {  
  var app = angular.module('leatherLaneMarketApp', ['ngAnimate']);  

    app.controller('MarketController', function(){  
        this.basket = 0;
         this.stalls = stalls;  
         this.selectedStall = stalls[0];

          this.selectStall = function(stall) {
      this.selectedStall = stall;
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
  }  
]  

})();

