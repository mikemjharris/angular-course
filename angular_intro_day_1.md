Angular  
===============

What is Angular?
Angular is a front end javascript framework.

The main issue with html is that it is desgined for statically built webpages.

Angualar extends the vocabulary of html.  At the same time it is designed to be expressive and readable. Unlike jquery where you have to "build" pieces of html in the js file and append them to the page, you can build your site as you wish and rely on Angular's two way data binding to populate your page.

Why do you want to use it?
---------------

If you want a dynamic website where individiual pieces of the page update without a full html page comming back from the server.

Examples are 
<www.gmail.com>
<www.diy.com>

Why do we (at GA) use angular?
-----------------

One of the key advantages of angular is that the layout of the html and angular code looks very similair to erb. 

How do to get started with angular:
===============

Let's get started.

Angular is a javascript framework - we need to include a js file just like we did in previous weeks with jquery and jquery ui.

Let's create an app.  
```
mkdir shop_app  
cd shop_app  
mkdir JS  
mkdir CSS   
```  


Now let's create the files we need.  
```
touch index.html  
touch JS/app.js  
touch CSS/app.js  
subl .  
```

In index.html HTML tab to generate template for the html.

If we go to the angular website we can get the link to angular js file.  
<https://angularjs.org/>

If you click on download there is a link to the google servers.  You can download the file and link to it:  
<https://ajax.googleapis.com/ajax/libs/angularjs/1.2.21/angular.min.js>
 
 And link to it in the header of our html. Also let's link to our app.js *after* the angular file.  
 ```
 <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.21/angular.min.js"></script>  
 <script type="text/javascript" src="JS/app.js"></script>
 ```  

In the app.js file.  
 ```
(function() {  
  var app = angular.module('market', []);  
})();
 ```  

When the js runs this sets up an angular module with the name market.  The square brackets allow you to pass new functionality into the angular module.  We wont worry about this now though!  

We are going to write an app that lists and reviews the food availiable on leather lane.  

We have now included angular, and started the app module. The only thing we need to do next is attach it to our html.  For the apps we will look at we will just use one angular module on a page.  Therefore to ensure that this covers out entire document we will call the angular module called market on the html.  We could jsut constrain it to a small section of our page if we wanted.  

```
<html ng-app="market">
```  

Let's also flesh out the Html and add a heading:  


```
  <h1>Angular Leather Lane Market App</h1>
```  


Run, refresh and check nothing wrong in the console. Type angular in the console and you should get an object back.

*Let's use some angular!*


We can recognise angular in two ways - when we called it originally we had <html ng-app="market">  - ng-  is the prefix for most of the functionaltiy in angular.  

In erb we had tags such as <%=  %>   the equivalent in angular is {{ }}  

Let's check it out:

After the heading - try these one at a time:

```
  <p>{{ 4 + 7 }}</p>  
  <p>{{ "hello" + " WDI" }}</p>  
  <p>Hello has  {{"hello".length }} letters</p>  
```  

Great - we can run some functionality right where we want it.  It's not hidden away in a js file.  We can see from the html what it should look like. It should also feel familar to erb.

Delete those lines:

We can also call functions in the html:  

```  
  <div>Click to add to basket</div>  
  <div>Your basket has {{ basket }} items in it</div>
```    
  
Note that angular is nice - basket isn't defined but it doesn't throw an error or much up the code.  Shortly we can intiate it with a value.  

Change the first line to:  
```
  <div ng-click="basket = basket + 1">Click to add to basket</div>
```   

We can use the basket variable anywhere within our angualar app. Angular automatically updates it whereever it sees it.  Imagine trying to do the same with jquery. You would have to get the variable, add something to it, and then grab an element from a page and set it's html.  Let's stick basket somewhere else just to see:  
  
```
  <div>Using basket somewhere else: {{basket}}</div>
```
  
Click on div a few times to see basket in both places updating. Great - and we have hardly written any javascript - angualar does allot of the heavy lifting for us.  
  
This is a basic example of using angular on the page. In much the same way as we have MVC framework in rails angular has something similair.   The html is the view and the curly brackets are similair to erb tags.  We are going to buld the modeling of the app into js file.  This just has to deal with modeling data and assigning it to variables.  It removes the need to play around with html in the js file.  Remember joining large parts of html together in the ajax lesson? this avoids that.  

Delete the code we added below the h1 tags.  


Leather Lane Angular App
=============

Angular has an object called a controller that is used to control the data on your page.  Let's see how we set that up.
We are going to set up some JSON data within our js file. Later on we will get data from an api or from our database.   

Our leather lane app is going to list a number of stalls, what they offer for sale, description and reviews.

In the app.js file:

```
app.controller('MarketController', function(){  
    this.stall = stall;  
  });  
```

```
stall = {  
  name: "Burrito",  
  price: 5,  
  description:  "Meat and vegetables in a delicious wrap",  
  availiable: true  
}  
```

In the index.html

```
  <div ng-controller="MarketController as market">  
    <p>{{ market.stall.name}} </p> 
  </div>
```

Great - we can pull in the name for the meal.  But there are lots of options on leather lane.  Instead of one meal let's have lots of meals.  Here we want an array of meals.  We need to change the controller and the html.

In app.js:  

```
 app.controller('MarketController', function(){  
    this.stalls = stalls;  
  });  
```

```
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
```  

In index.html add the following angular command - ng-repeat. This is a bit like doing .each in ruby. delet the p tag line we had before and replace with the following:  
```
    <h2>Leather Lane Lunch Options</h2>  
    <ul>  
    <li ng-repeat="stall in market.stalls">  
      {{ stall.name}} 
    </li>  
  </ul>  
```

Great - no need to add or append anything to the page.  The controller deals with the data.  The html page works out how to display the data.  All very rails like so far.  

When we click on a meal we want to see more details about it - description, price and later on we will add reviews.  

```
  <h2>Selected Stall details</h2>  
  <p>Name: {{ market.selectedStall.name }}</p>  
  <p>Price: {{ market.selectedStall.description }}</p>  
  <p>Description {{ market.selectedStall.price }}</p>   
```

But there's nothing there yet.  For now let's just set the selected meal to be one of the meals in our array.  

```
app.controller('MarketController', function(){  
    this.stalls = stalls;  
    this.selectedStall = stalls[0];  
  });    
```

Great - our selected stall is now showing on the page!  Let's get it so that whichever stall we click on becomes the selected stall.  

In jquery we needed to bind a function to a specific element (e.g. on click, on submit.  In angular we can jsut define this in the html:  

```
  <li ng-repeat="meal in market.meals" ng-click="market.selectMeal(meal)">
```

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

























