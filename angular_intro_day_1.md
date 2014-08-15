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

One of the key advantages of angular is that the layout of the html and angular code looks very similair to erb. In addition it is curretnly the most popular framework for new projects.

How do to get started with Angular:
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

If you click on download there is a link to the google servers.  You can download the file or get a link to it hosted on google sites:  
<https://ajax.googleapis.com/ajax/libs/angularjs/1.2.21/angular.min.js>
 
 And link to it in the header of our html. Also let's link to our app.js *after* the angular file.  
 ```
 <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.21/angular.min.js"></script>  
 <script type="text/javascript" src="JS/app.js"></script>
 ```  

Let's first of all play around with Angular on the page.  To get angular to run we neet to add the following to the html tag at the top of our page. ng- is the tag that denotes some sort of angular functionality. Where ever you see that it is part of angular.  We will see this in more detail shortly.

```
<html ng-app="">
```  
In erb we had tags such as <%=  %>   the equivalent in angular is {{ }}  

*Let's use some angular!*

After the heading - try these one at a time:

```
  <p>{{ 4 + 7 }}</p>  
  <p>{{ "hello" + " WDI" }}</p>  
  <p>Hello has  {{"hello".length }} letters</p>  
```  

The code withing the curly brackets gets run. Great - we can run some functionality right where we want it.  It's not hidden away in a js file.  We can see from the html what it should look like. It should also feel familar to erb.

Delete those lines:

We can also call functions in the html:  

```  
  <button ng-click="basket = basket + 1">Click to add to basket</button>    
  <div>Your basket has {{ basket }} items in it</div>
```    

We can use the basket variable anywhere within our angular app. Angular automatically updates it whereever it sees it.  Imagine trying to do the same with jquery. You would have to get the variable, add something to it, and then grab an element from a page and set that element's html.  

Let's stick basket somewhere else just to see:  
  
```
  <div>Using basket somewhere else: {{basket}}</div>
```
  
Click on the button a few times to see basket in both places updating. Great - and we have hardly written any javascript - angular does allot of the heavy lifting for us. The two way data binding is one of the most powerful aspects of Angualar.

 This is a basic example of using angular on the page. 

 In much the same way as we have MVC framework in rails and other frameworks there is a similair philosophy around Angular.

The html is the view and the curly brackets are similair to erb tags. Currently we have functions, which deal with other aspects of the app, written in the html.  We will move this functionality into a seperate file that deals with the modelling/contolling of the app - very similair to how we seperate out concerns in rails.

In the app.js file.  
 ```
(function() {  
  var app = angular.module('leatherLaneMarket', []);  
})();
 ```  

When the js runs this sets up an angular module with the name market.  The square brackets allow you to pass new functionality into the angular module.  We wont worry about this now though!  

We are going to write an app that lists and reviews the food availiable on leather lane.  

We have now included angular, and started the app module. The only thing we need to do next is attach it to our html.  For the apps we will look at we will just use one angular module on a page.  Therefore to ensure that this covers out entire document we will call the angular module called market on the html.  At the html tag put the name of the app inside the quotes so that we end up with:

```
<html ng-app="leatherLaneMarketApp">
```  


This runs the app - if we want to control any data on the page we set up an angular controller.

In the app.js file within the angular app add the following:

```
app.controller('MarketController', function(){  
    this.basket = 0;  
  });  
```

This will initialise the basket element within the market controller to be 0.

We need to attach this controller to the part of the page we want to control.  Wrap the button we had before with a div and link to the controller we just set up.

```
  <div ng-controller="MarketController as market"> 
```  

To make the button variable reference the one initiliased in the app we need to refer to the controller.  We have "nicknamed" the controller as "market" so we update what we had before to "market.basket".  Here is what the code should look like:

```  
  <div ng-controller="MarketController as market"> 
    <button ng-click="market.basket = market.basket + 1">Click to add to basket</button>
    <div>Your basket has {{ market.basket }} items in it</div>
    <p>{{ basket}}</p>
  </div>
```

Great it is initilaising with the value 0 when we reload the page.  It still changes when we click the button.  Next we want to move the function within ng-click into our javascript.

Inside the market controller in teh app.js:

```  
    this.addToBasket = function() {
        this.basket ++
    }
```
And then change the html to call that function:  
``` 
    <button ng-click="market.addToBasket()">Click to add to basket</button>
```

Congratulations!  We have a basic app up and working.

Leather Lane Angular App
=============

Let's start fleshing out our Leather lane market app. Let's give it a heading.

```
  <h1>Angular Leather Lane Market App</h1>
```  

We can use the add to basket functionality later - but first we want to list the various stalls and food options availiable on leather lane. For now let's comment out the section inside the marketController div.  We want to keep the div as we still want to use the market controller we set up in our js file.


We are going to set up some JSON data within our js file. Later on we will get data from an api or from our database. 

In the app.js file:

```
app.controller('MarketController', function(){  
    this.stall = stall;  
  });  
```

add the following line inside the app:

```
stall = {  
  name: "Burrito",  
  price: 5,  
  description:  "Meat and vegetables in a delicious wrap",  
  availiable: true  
}  
```

In the index.html. 

```
    <div ng-controller="MarketController as market">
      <ul>
        <li>{{ market.stall.name}}</li>
      <ul>
    </div>
```

Great - we can pull in the name of what the stall offers.  But there are lots of options on leather lane.  Instead of one meal let's have lots of stalls.  Here we want an array of stalls.  We need to change the controller and the html.

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
    name: "Pizza",  
    price: 6.5,  
    description:  "Cheese and meat and veg on some dough",  
    availiable: true  
  }  
]  
```  

In index.html we want to cycle through the different stalls and list them.  In ruby we did .each.  In angular to iterate through an array we use the ng-repeat command.  We are also going to use this to navigate so we will add nav tags and add a h2 element to label this section.

Let's see how that looks.  
```
    <div ng-controller="MarketController as market">
      <h2>Stalls</h2>
      <nav>
        <ul>
          <li ng-repeat="stall in market.stalls">{{ stall.name}}</li>
        </ul>
      </nav>
    </div> 
```

As we did in ruby we define a placeholder name as we go through the array. There was no need to add or append anything to the page.  The controller deals with the data.  The html page works out how to display the data.  All very rails like so far. 



See a stall in more detail
-----------------------

When we click on a meal we want to see more details about it - description, price and later on we will add reviews. This is within the market controller on the page - jsut below the list items we had before. 

```  
    <section>
      <h2>Selected Stall details</h2> 
      <table>
        <tr> 
          <td>Name:</td><td>{{ market.selectedStall.name }}</td>
        </tr>
        <tr>
          <td>Price:</td><td> {{ market.selectedStall.price}}</td>  
        </tr>
        <tr>
          <td>Description:</td><td> {{ market.selectedStall.description}}</td>
        </tr>
      </table>
    </section>
```

But there's nothing there yet.  For now let's just set the selected meal to be one of the meals in our array.  We will make this dynamic later.

```
app.controller('MarketController', function(){  
    this.stalls = stalls;  
    this.selectedStall = stalls[0];  
  });    
```

Great - our selected stall is now showing on the page!  But we want it to change to whatever meal we click at in our list.

In jquery we needed to bind a function to a specific element (e.g. on click, on submit. In angular we can just define this in the html:  

```
  <li ng-repeat="stall in market.stalls" ng-click="market.selectStall(stall)">
```

We now need to define the selectMeal(meal) function in angular.

```   
    this.selectStall = function(stall) {
      this.selectedStall = stall;
    }
```  
  
This function just passes in the meal object that was in the page. It includes everthing about the object including it's description - even if this wasn't displayed on the page.

The amazing thing about this is we didn't have to amend or apend any html.  In jquery we would have had to get all the data off the page, create some html and apend it to the page.  Angualar we just have to up date the variable

**** Can we see how much easier this is than using jquery?

Things like search are super easy to implement with angular.  Let's check it out.

Above the <ul>  let's put an input box:

```   
    <input ng-model="search" placeholder="search" />
```
Let's also amend the ng-repeat.  We want to pipe in the search term.
``` 
    ng-repeat="stall in market.stalls | filter : search"
```   
That section of html should read:
```
    <div ng-controller="MarketController as market">
    <nav>
      <h2>Stalls</h2>
      <input ng-model="search" placeholder="search" />
    <ul>

      <li ng-repeat="stall in market.stalls | filter : {name: search}" ng-click="market.selectStall(stall)">
        {{ stall.name}}
      </li>
    </ul>
```

This filets by the name. If you want to search for any attribute within any part of the object you can do:

```  
  ng-repeat="stall in market.stalls | filter : search"
``` 


When we first navigate to the page we probably don't want to have any meal selected. 

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

























