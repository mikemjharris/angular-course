Angualar with Rails
===========

We have a great app but we aren't linking to a database. None of our food items are getting stored. We will include rails and use it as an api for our data.  

This is ideal for using rails scaffold.



Link into angualar.

```  
    rails new rails_angular
    cd rails_angular
    rails g scaffold Stall name:text price:float description:text 
    rails g controller Static
    rake db:migrate
```  

We now have a working api!  Hurrah. Input a few stalls to show it works and visit stalls.json to see the output. This should look pretty similair to what we expect out stalls data to be. Checkout the controllers to see how this is done.  It responds to the json format.

We will want the angular app to be the route of the application.  We have set up a static controller. Let's add an empty index method in our static_controller.rb

```  
  def index
  end
```   

This will take us to the static views and render the index.html.erb.

Create that file.  Copy everything inside the body of our old app into this file.

Finally in routes.rb we want to root to this page.

```
  root to: "static#index" 
```  

Delete the index.html file from the public folder.

Now we want to add angular to our app. Add this to gem file.

```  
gem 'angularjs-rails'  
``` 

bundle to install the gem.  

Then in our application.js file we need to require angular.  
```  
//= require angular   
```  

Create a file within the javascript folder called app.js and copy our code across from the previous app. This will get compiled and inlcuded in our files so we don't need to add angular in the header of our app.  However we do need to add ng-app to the html at the top of the application.html.erb

```  
    <html ng-app="leatherLaneMarketApp">
```  
Finally let's copy the css from our old app and put it in the stalls.css.scss file.

Now we just need to set up the rest of the view page. 

* If we have creeated directives we need to move these.*
You can just place them in the public folder - perhaps on a folder called templates. 

This works - however it doesn't take very long to go the rails way.

Create a folder called templates inside app -> assets and move your file there.

Rename your app.js to app.js.erb. At the top of the file referrence the template you are going to use.
```  
  #= depend_on_asset "new-stall-form.html"  
``` 
 Then change your templateUrl to use the asset path for the template
```  
  templateUrl: "<%= asset_path('new-stall-form.html') %>"
```  

Great - let's run the server.  We can go to /stalls and we should get the exact same looking file as  before. 

ngAnimate isn't included in rails - so we alse need to include the nganimate file in the header. Just use the ajax link - it is possible to download the file but it can run into problems with the rails asset compilation




Interacting with the server
----------

So - we have a nice app but it's not working with our server - they are two different things at the moment.  

The controller needs additonal functionality.  The module we want is called $http.  To include it in the controller we do the following. 

```  
app.controller('StallController', function($http, $scope){
```

When we first go to the app we want stalls to be set to an empty array until we receive data from the database.  

```   
$scope.stalls = [];
```  

When the page is loaded we want to do a json request to stalls.json and save the returning data in our $scope.meals. Place the following inside the controller under the $scope.stalls = []

```  
    $http.get('http://localhost:3000/stalls.json').success(function(data){
          $scope.stalls = data
        })  
```


When we referesh the page we should see the data we input in the database.  We can go to the rails console and add more data.  However this can be a real pain. Let's see how we can add a stall to the database.

In stread of geting from the database we want to post to the database.  Remember our routes!
Add the following line to the $scope.addStall function:

```  
    $http.post('/stalls', { stall: $scope.newStall });  
```

That should be it! Let's check it out.  In our app let's add some data to the database. Hit refresh and see if they appear.

Remember how much of a pain it was to set up the ajax calls in jquery?  not only that but we didn't have to amend anything on the page - the view just automatically updated.

Our add stall function should look like this:
```   
    $scope.addStall = function() {  
        $scope.stalls.push($scope.newStall);  
        $http.post('/stalls.json', { stall: $scope.newStall });  
        $scope.newStall = false
        $scope.stallForm.$setPristine();
      }
```

However - what happens if the form database submission isn't succesful?  Also we are jsut adding the stall that we input from the page into the array.  We want to input the actual stall from the database which has an id.

```  
    $scope.addStall = function() {  
        $http.post('/stalls.json', { stall: $scope.newStall }).success(function(data){  
          $scope.stalls.push(data)  
          $scope.newStall = false
          $scope.stallForm.$setPristine();  
        });  
      }  
```  
This looks much better - even though we validate the form on the client side we need to validate it on the server side.  If the addition is succesful then we add the stall to the client side.


Great - we can create and read. We now need to update and destroy.

Let's create the function in our app.js first.  Then we can work out where we want to call that functionality from the page.

```   
     $scope.deleteStall = function(stall) {
          $http.delete('/stalls/' + stall.id +'.json').success(function(data) {   
        })
      }      
```  

That looks like it should delete the relevant stall from the server side.  However we also need to remove the stall from our server side.  How should we remove an element from an array in javascript?

```  
    $scope.stalls.splice( $scope.stalls.indexOf(stall), 1 );  
```  

Great - now we need to add a delete button onto the client side.
We could add a button next to every item on the list on the left.  However let's add a button on section where we show the details.

```  
    <button ng-click="deleteStall(selectedStall)">Delete Stall</button>
```  

The stall get's deleted from the left menu - but is still in view as the selected stall. Inside the delete success callback let's set the selectedStall to false.

```  
  $scope.selectedStall = false
```  

Now when the stall is deleted view changes too.

Finally we need to update an item.

There are a number of options - we are going to make a form appear in the same place that we show our stall.

We will define an editStall variable.  When this is set we want to show input fields and hide the selected ones.  By using ng-model this will fill in values in the inputboxes. It will also link the data to the editStall object so it will be easy to work with this when we send data to the database.

```  
    <table>
        <tr> 
          <td>Name:</td>
          <td ng-hide="editStall">{{ selectedStall.name }}</td>
          <td ng-show="editStall"><input ng-model="editStall.name" /></td>
        </tr>
        <tr>
          <td>Price:</td>
          <td ng-hide="editStall"> {{ selectedStall.price}}</td>  
          <td ng-show="editStall"><input ng-model="editStall.price" /></td>  
        </tr>
        <tr>
          <td>Description:</td>
          <td ng-hide="editStall"> {{ selectedStall.description}}</td>
          <td ng-show="editStall"><textarea ng-model="editStall.description"></textarea></td>
        </tr>
      </table> 
```

Now we need a button at the bottom that will set the editStall to be the current stall. Below the delete button add this button.

```
    <button ng-click="setEditStall(selectedStall)">Edit stall</button>  
```  

In app.js create a new funciton within our controller:

```  
    $scope.setEditStall = function(stall) {  
      $scope.editStall = stall  
    }  
```  

Go back to the app and check that when you click on the edit stall button you get the new form.

When we are editing the form we want a new button to show which will call a function which will update our database.  We also want to hid our edit button.  Here's what the three buttons at the bottom fo the table should look like:  

```  
    <button ng-click="deleteStall(selectedStall)">Delete Stall</button>  
    <button ng-hide="editStall" ng-click="setEditStall(selectedStall)">Edit Stall</button>  
    <button ng-show="editStall" ng-click="updateStall(editStall)">Update Stall</button>  
```

Now move to the app.js file - we need to define the updateStall function.  If we look at our routes we need to 'put' to stalls/:id

```  
    $scope.updateStall = function(stall) {
      $http.put('/stalls/' + stall.id + '.json', { stall: stall}).success(function(data) {
        })
    }
```  

Run this and we get a 500 server error in the console.  IF we check out our rails console we see that we can't mass assign created_at and updated-at.

There are a number of ways around this - we are going to delete the keys from the stall object we are sending to the database.  Also on success we want to set the $scope.editStall variable to false so that the edit form disappears.

The updateStall function should look like this:  
```  
    $scope.updateStall = function(stall) {  
      delete stall["created_at"]  
      delete stall["updated_at"]  
      $http.put('/stalls/' + stall.id + '.json', { stall: stall}).success(function(data) {  
        $scope.editStall = false  
      })  
    }  
```  

We now have a fully working create, read, update and delete functionality!


Heroku
-------

What if we want to get our app up on heroku? There are a couple of tweaks we need to do.

As angular talks to the server with javascript it is open to cross site forgery equests.  When we run the code locally we can see in the rails server when a request comes in that there is an issue. This is fine in development but in production the site refuses to work.

Read more here:
<http://en.wikipedia.org/wiki/Cross-site_request_forgery>

To make rails aware that it is our angular app talking to it we can include a csrf token in the headr and can check for it in the rails side.

In the application controller paste the following code:  
```  
    protect_from_forgery  
    after_filter :set_csrf_cookie_for_ng  
    def set_csrf_cookie_for_ng  
      cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
    end  
    protected  
      def verified_request?  
        super || form_authenticity_token == request.headers['X-XSRF-TOKEN']  
      end  
```

Great.  We also need to change our databases to postgresql in the database.yml:
```  
    development:
      adapter: postgresql
      encoding: unicode
      database: rails_angular_development
      pool: 5
      
    test:
      adapter: postgresql
      encoding: unicode
      database: rails_angular_test
      pool: 5

    production:
      adapter: postgresql
      encoding: unicode
      database: rails_angular_production
      pool: 5
```  

In the application.rb
```
    config.assets.initialize_on_precompile = false
```

We have to make one change in our angular file.  When rails compiles the assets it doesnt do a good job of working out the dependancy injection for angular.

For the app controller we need to define the $http and $scope.  Make sure to close the square bracket at the end of the controller.

```  
  app.controller('MarketController', ['$http' , '$scope', function($http, $scope){  
```  

























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







