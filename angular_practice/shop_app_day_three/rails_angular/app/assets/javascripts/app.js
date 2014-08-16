(function() {  
  var app = angular.module('leatherLaneMarketApp', ['ngAnimate']);  

    app.controller('MarketController', function($http, $scope){  
        $scope.basket = 0;
        $scope.stalls = [];  
         // $scope.selectedStall = stalls[0];
        
      $http.get('http://localhost:3000/stalls.json').success(function(data){
          $scope.stalls = data
        })  

      $scope.selectStall = function(stall) {
        $scope.selectedStall = stall;
    }


      $scope.addStall = function() {  
        $scope.stalls.push($scope.new_stall);  
    
        $http.post('/stalls', { stall: $scope.new_stall });  
     
        $scope.new_stall = {}
        $scope.stallForm.$setPristine();
      }

      $scope.addToBasket = function() {
        $scope.basket ++
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


