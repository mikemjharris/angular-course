(function() {  
  var app = angular.module('market', []);  

 app.controller('MarketController', function(){
    this.stalls = stalls;
    this.selectedStall = stalls[1];
  });


  stalls = [
  {
    name: "Burrito",
    price: 5,
    description:  "Meat and vegetables in a delicious wrap",
    availiable: true
  },
  {
    name: "Burger",
    price: 6.5,
    description:  "Meat in a bun",
    availiable: true
  }
]

})();