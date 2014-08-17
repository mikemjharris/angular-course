(function() {  
  var app = angular.module('leatherLaneMarketApp', ['ngAnimate']);  

    app.controller('MarketController', function($http, $scope){  
        $scope.stalls = [];  
        
      $http.get('http://localhost:3000/stalls.json').success(function(data){
          $scope.stalls = data
        })  

      $scope.selectStall = function(stall) {
        $scope.selectedStall = stall;
    }

      $scope.addStall = function() {  
        $http.post('/stalls.json', { stall: $scope.newStall }).success(function(data){
          $scope.newStall = false
          $scope.stalls.push(data)
          $scope.stallForm.$setPristine();
        });  
      }


      $scope.deleteStall = function(stall) {
        $http.delete('/stalls/' + stall.id +'.json').success(function(data) { 
          $scope.stalls.splice( $scope.stalls.indexOf(stall), 1 );  
          $scope.selectedStall = false
        })
      }

      
    $scope.setEditStall = function(stall) {
      $scope.editStall = stall
    }

    $scope.updateStall = function(stall) {
      delete stall["created_at"]
      delete stall["updated_at"]
      $http.put('/stalls/' + stall.id + '.json', { stall: stall}).success(function(data) {
        $scope.editStall = false
      })

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


