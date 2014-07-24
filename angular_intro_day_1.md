Angular:


What is Angular?
Angular is a front end javascript framework.

The main issue with html is that it is desgined for statically built webpages.

Angualar extends the vocabulary of html.  At the same time it is designed to be expressive and readable.

Why do you want to use it?

If you want a dynamic website where individiual pieces of the page update without a full html page comming back from the server.

**** examples are gmail,..... 

Why do we (at GA) use angular?

One of the key advantages of angular is that the layout the html and angular code looks very similair to erb. 

How:

Let's get started.

Angular is a javascript framework - we need to include a js file just like we did last week with jquery.

https://angularjs.org/

Let's create an app.  

mkdir shop_app 
cd shop_app
mkdir JS
mkdir CSS

move angualr.min.js into the js folder.

dowload to JS/angular.min.js

this is the library but we also need a js file for our code.

touch JS/app.js

touch index.html

subl .

link to angular.min.js in the head.
<script type="text/javascript" src="JS/angular.min.js"></script>
and link to our app.js in the head
<script type="text/javascript" src="JS/app.js"></script>

open the app.js file.

(function() {

  var app = angular.module('shop', []);

})();

when the js runs this sets up an angular module with the name shop.  The square brackets allow you to pass new functionality into the angualr module.  WE wont worry about this now.

We are going to write an app that lists and reviews the food availiable on leather lane.

We have now included angular, and started the app module. The only thing we need to do next is attach it to our html.  For the apps we will look at we will jsut use one angular module on a page.  Therefore to ensure that this covers out entire document we will call the angualr module called food on the html.  We could jsut constrain it to a small section of our database if we wanted.

<html ng-app="food">

Let's also add a title:

<h1>Angular Lunch App</h1>

Run, refresh and check nothing wrong in the console.

Let's use some angular.  

we can recocnise angualr in two ways - when we called it originally we had <html ng-app="stop">  - ng-  is the prefix for most of the methods in angular.

In erb we had tags such as <%=  %>   the equivalent in angualr is {{ }}

Let's check it out:

After the heading - try these one at a time:

<p>{{ 4 + 7 }}</p>
<p>{{ "hello" + " WDI" }}</p>
<p>Hello has  {{"hello".length }} letters</p>

delete that:

We can also call functions in the html:

<div>Click to add to basket</div>

<div>Your basket has {{ basket }} items in it</div>

change the first line to:
<div ng-click="basket = basket + 1">Click to add to basket</div>

We can use the basket variable anywhere within our angualar app. Angular automatically updates it whereever it sees it.  Imagine trying to do the same with jquery.  

<div>Using basket somewhere else: {{basket}}</div>

Click on div a few times to see basket in both places updating.

This is a basic example of using angular on the page - we are going to move more of the logic and build a shop ordering and review site.

Comment out everything below the header.

ng-controller ties a specific set of functions to a part of the website.  Here we are going to list a number iterms for sale, their values, description and reviews.

in the app.js file:

app.controller('ShopController', function(){
    this.meal = meal;
  });


meal = {
  name: "burrito",
  price: 5,
  description:  "Meat and vegetables in a delicious wrap",
  availiable: true
}



<div ng-controller="MarketController as market">
    
    <p>{{ market.meal.name}}

</div>


We have lots of food availiable on leather lane.  So let's add a few more options and turn out selection into an array.

 app.controller('MarketController', function(){
    this.meals = meals;
  });

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

In index.html add the following angular command - ng-repeat:

<ul>
    <h2>Selected meal details</h2>
    <li ng-repeat="meal in market.meals">
      {{ meal.name}} :  £{{meal.price}}
    </li>
  </ul>

We will just show the name and the price.  When you click on it we want to show the details in another box.

   <div ng-show="market.selectedMeal">
    <h2>Selected meal details</h2>
    <p>{{ market.selectedMeal.name }}</p>
    <p>{{ market.selectedMeal.description }}</p>
    <p>{{ market.selectedMeal.price }}</p>
  </div>


now we need a selected meal variable in our app.js. Initially we want it to be empty - however to test the view works we will set it to be the first meal. 

app.controller('MarketController', function(){
    this.meals = meals;
    this.selectedMeal = meals[0];
  });

this is working so now we when we click on a meal in the list we want to go show the description.

In jquery we needed to bind a function to a specific element.  In anguar we can jsut define this in the html:

<li ng-repeat="meal in market.meals" ng-click="market.selectMeal(meal)">

We now need to define the selectMeal(meal) function in angular.

app.controller('MarketController', function(){
    this.meals = meals;
    this.selectedMeal = meals[0];

****
    this.selectMeal = function(meal) {
      this.selectedMeal = meal;
    }
****
  });

  this function just passes in the meal object that was in the page. It includes everthing about the object including it's description - even if this wasn't on the page.


When we first come to the page we probably don't want to have any meal selected. 

so in app.js we can remove the initial this.selectedMeal
  

Check this still works when you click on things.

We probably don't want to show the header if there is no meal there.

We can use ng-show.

<div ng-show="market.selectedMeal">
    <h2>Selected meal details</h2>
  
if selectedMeal is not defined then this evaluates as false so the following div element isn't shown.

Check it out in the browser.


Let's show something else instead of the display selected meal.

Ask class how what they think the opposite of show is.  
Can either use ! symbol or ng-hide.

<div ng-hide="market.selectedMeal">
    <h2 >Leather Lane</h2>
    <p>Leather lane is an awesome market in leather lane that has a wide variety of lucnh options.  Select an option from the left to see more details.</p>
</div>

As you can see this is super quick way of navigating around the page without having to send data to the server.

***send them css link to make it look pretty***

The other thing we use jquery to do is highlight and change the style.  Think how you would highlight the selected meal - you would bind jquery event to that and add a class when selected.

Here we use some logic to set the class of the name given the span.
<span ng-class="{highlighted: meal === market.selectedMeal }">{{ meal.name}} :  £{{meal.price}}</span>

What else do you have in a single page doc?  Different tabs.  Whithin the description.
Checkout habitat:
http://www.habitat.co.uk/pws/ProductDetails.ice?ProductID=241397
http://www.futoncompany.co.uk/beds/single-stacking-bed.html

Different tabs for different products.

LAB/homework - extend what we have done today and add tabs to the right hand menu box. Details, reviews, order.  

On the order page we should be able to use buttons to order a certain amount of a certain food.  Add another box on the screen that has our basket.  When we add meals to our basket they should be listed in the basket tab along with the current total value in our basket.

























