
Angular Lunch App Continued: Day two  
=============

Adding data with a form
-----------------------


We have our app but let's say we want to add items to our list. We will want to have a form.  Due to angular's two way data binding adding the data from the form to the page becomes almost trivial compared to using Jquery.  

Inside the nav element but below the ul put the following code:

```  
    <h3>Add an item</h3>
      <form>
        <label>Name</label>
        <input type="text" /><br>
        <label>Price</label>
        <input type="number" /><br>
        <label>Description</label>
        <textarea></textarea><br>
        <button>Submit</button>
      </form>
```

Great we have a form.  And we can type in the boxes. Not that even if I have text in the boxes I can still click on other parts of the page and the text does not disappear. This is why email etc. are single page web apps and why using a tool like angular is important.  



In angualar we can model something by using ng-model. We briefly saw this before with the search filter. We shall go into more detail here.  We are going model the stalls so need to have fields for each of the keys.

***TODO  -  do we need to set up a new controller??  ***
```   
    <h3>Add an item</h3>
    <form>
      <label>Name</label>
      <input type="text" ng-model="market.newStall.name"/><br>
      <label>Price</label>
      <input type="number" ng-model="market.newStall.price" /><br>
      <label>Description</label>
      <textarea ng-model="market.newStall.description"></textarea><br>
      <button>Submit</button>
    </form>
```   



With angular we get two way data binding.  Let's show how this works. In the list of items let's copy the li elements but change the name inside to newStall.  Get rid of ng-repeat and instead use ng-show. We've also added a class of .new_item just 

```  
    <li class="new_item" ng-show="market.newStall" ng-click="market.selectStall(market.newStall)" ng-class="{highlighted: market.newStall === market.selectedStall }">
          {{ market.newStall.name}}
    </li>
```  

Now as we enter values into our text box they are dispalyed in the list. This highlights angular's two way data binding.  It is constantly looking out for changes in any variable. 

Now this is all well and good but we can only add one element to the list and it is linked to what is in the form box. We want to add this to our stalls array. 

We want to be able to add this to the list of elements in our array in out app.

On our form let's run a function when it is submitted.  We can use angurlar's ng-submit:

```   
    <form ng-submit="market.addStall()">  
```

And in our app.js we need to define the addStall function

```  
    this.addStall = function() {  
        stalls.push(this.newStall);    
        this.newStall = {}  
      }  
```  
This adds the new-stall to the stalls array.  It also clears out the form ready for the stall.  Have a play around! 

This isn't getting saved in our app - we will need to linkinto the database at a later stage. For now we will work on user validations and highlighting errors using angualar.  

Form Validations
_________________

In rails we would have to check once the form was submitted and do validations on the model side and send back an error.  Angular allows us to notify the user as they fill in the form on some of the validations making it a much easier 

HTML 5 also provides some validation - input a word into the price box and we can see the html validation.   However we want to provide out own validation. 

We add a novalidate term to the end of our form.  We also give it a name

```  
    <form name="stallForm" ng-submit="market.addStall(newStall)" novalidate>  
```  

This turns off the html validation.

We then require some fields - in this case name and price. We add required at the end of the html input element.

``` 
    <input type="text" ng-model="market.new_meal.name" required><br>
    <input type="number" ng-model="market.new_meal.price" required><br>
```

Above the form let's add a message:

```
  <aside>reviewForm is {{stallForm.$valid}}</aside>
```  

Try filling in the form - as we add fields the form becomes valid.  We have turned off the html validation which only worked when the form was submitted.  However using angular's data binding we are constantly checking whether the form is valid. Doesn't is annoy when you hit submit on a form and you get errors?  Here we can flag when the form is valid.  Lot's of options such as highlighting boxes etc....

Now we only want to run the addStall function when the form is valid.

```  
  <form name="stallForm" ng-submit="stallForm.$valid && market.addStall(newStall)" novalidate>
```  

Test it out - input true data and see it getting added.  Try not entering a price and see how nothing gets added.

It's great that our form isn't submitting - but unless we provide feedback to the user this can get pretty annoying. 

Open up web inspector and check out the form and each input box.  Look at how the classes on the boxes change as we change data within them.  The main classes are:

ng-clean  ng-valid
ng-dirty ng-invalid
ng-dirty ng-valid


we can set these as styles in our css:

```
    .ng-valid.ng-dirty {
      border: 2px solid green;
    }
    .ng-invalid.ng-dirty {
      border: 2px solid #ff7373;
    }
```  

The classes also show which of the validations is failing.  For example on price we can set min="1" max="10"

```  
    <input type="number" ng-model="market.newStall.price" min="1" max="10" required /><br>
```  
if the max is invalid the ng-invalid-max.  

However when we subtmit the form it is still "dirty". We want a clean, pristine form after we have submitted.

$scope
--------

We are going to bring in a slightly more advanced feature which will allow us to clean up the form.It will also help us tidy up the code.  

It felt a bit clumsy in our code to alway have market.  infront of every variable.  We had defined this section of code as the MarketController so using market repeatedly doesn't feel very DRY.

In this case we are going to use $scope.  In our app.js for the controller line let's inlcude $scope. Like this:  

```
    app.controller('MarketController', function($scope){  
```

Now do a find and replace for this.  in your controller.  Replace with $scope.

Now if we refresh our browser nothing is working.  We need to get market.  from infront of all our variables.  Find and replace market.  with a blank character.

Check to see the app is working.  Yes the code is DRYer.  But we get extra access to elements on the page especially from within functions in our controller.

Now let's clean that form.  Add this line within the addStall  function:  
```
    $scope.stallForm.$setPristine();
```   

Now when we click on the form and submit - afterwards the form "cleans" itself.



***More on validations here***


Afternoon: directives


Homework:
Add a review tag to each element.
Build the review form to submit to the review.
We want to store the review within the meals as an array of hashes.
**need to think about this depending on rails api we build later**
Add one validation
Improve on the form validation.
Bonus marks for using directives.














