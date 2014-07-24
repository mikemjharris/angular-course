Day two: using forms for validation.  Have split out connecting to a database into day three but I reckon it would fit in at the end of day 1.


Next day using forms
Add a review to each store. 
Show two way data binding.

We have our app but let's say we want to add food to our list we want to have a form.  Today we will look at forms,  adding items using the form and also form validation.

Within the lunch section let's add a form.

  <h3>Add an item</h3>
    <form>
      Name<input type="text" /><br>
      Price<input type="number" /><br>
      Description<textarea></textarea><br>
      <button>Submit</button>
    </form>

Great we have a form.  And we can type in the boxes.

HIGHLIGHT to students:
Also note tha even if you have text in a box you can still move around the page!

in angualar we can model something by using ng-model.  Let's show how it is used. We use the same keys as we use for the original meal.

***TODO  -  do we need to set up a new controller??  ***

<form>
      Name<input type="text" ng-model="market.new_meal.name"><br>
      Price<input type="number" ng-model="market.new_meal.price"><br>
      Description<textarea ng-model="market.new_meal.description"></textarea><br>
      <button>Submit</button>
    </form>

With angualar we get two way data binding.  Let's show how this works. In the list of items let's copy the li elemtents but change the name inside to new_meal.  Get rid of ng-repeat and instead use ng-show.

<li ng-show="new_meal" ng-click="market.selectMeal(new_meal)">
      <span ng-class="{highlighted: market.new_meal === market.selectedMeal }">{{ new_meal.name}} :  £{{new_meal.price}}</span>
</li>

Now as we enter values into our text box they are dispalyed in the list. this highlights angular's two way data binding.  It is constantly looking out for changes in any variable.

Now this is all well and good but we can only add one element to the list and it is linked to what is in the form box.  

We want to be able to add this to the list of elements in our array in out app.

<form ng-submit="market.addMeal()">


and in our app.js:
  
  this.addMeal = function() {
      meals.push(this.new_meal);
    }

Try this out.  Slightly annoying the new_meal is still there. How could we fix this?  

in addMeal function let's set it to an empty hash:
  
   this.addMeal = function() {
      meals.push(this.new_meal);
      this.new_meal = {};
    }

You could imagine maybe setting a status message somewhere on the screen.
** this.message = "Meal added" ** (need to add to page)

This isn't getting saved in our app - we will need to linkinto the database later on today/tomorrow.

But first let's check user inputs on the form.  In rails we would have to check once the form was submitted.  We have seen some validations in javascript but angular provides some tools for this.

HTML 5 also provides some validation - input a word into the price box and we can see the html validation.   However we want to provide out own validation.  So we  

<form name="mealForm" ng-submit="market.addMeal(new_meal)" novalidate>

This turns off the html validation.

We then require some fields - in this case name and price.

Name<input type="text" ng-model="market.new_meal.name" required><br>
Price<input type="number" ng-model="market.new_meal.price" required><br>


<div>reviewForm is {{mealForm.$valid}}</div>

SO we have turned off the html validation which only worked when the form was submitted.  However using angualr's data binding we are constantly checking whether the form is valid. Doesn't is annoy when you hit submit on a form and you get errorrs?  Here we can flag when the form is valid.  Lot's of options such as highlighting boxes etc....

Nos we only want to run the addMeal function when the form is valid.

<form name="mealForm" ng-submit="mealForm.$valid && market.addMeal(new_meal)" novalidate>

Awesome - our form isn't submitting.  But that's pretty annoying.  Let's at least provide readback to the client as we go along.

Open up web inspector and check out the form and each input box.  The classes are:

ng-clean  ng-valid
ng-dirty ng-invalid
ng-dirty ng-valid

we can set these as styles in our css:
.ng-valid.ng-dirty {
  border: 1px solid green;
}
.ng-invalid.ng-dirty {
  border: 1px solid red;
}

the classes also show which of the validations is failing.  For example on price we can set min="1" max="10"

Price<input type="number" ng-model="market.new_meal.price" min="1" max="10" required /><br>

if the max is invalid the ng-invalid-max


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














