Directives
==========

Directives can be included within the lesson plan anytime from midwy through day 1. 

Here we will look at the app from the end of day two.

Cleaning up our html with ng-include.
-----------

Our javascript file is still pretty small and mangeable.  There are small distinct functions for managing various parts of the site.

Angualar is supposed to make our html more expressive. While this is the case in many cases it looks quite cluttered with lots of angular expressions.  Going through the whole of the index.html page can be quite long.

Firstly we will look at ng-include.  This is similar to rendering partials in rails. 

We can split different sections of the page up into seperate modules/html files and include them in our main index.html file. This will make the main page easier to manage.For large sites and companies it means different people and teams can easily mark on each section of the site independently.

Here we will split out the form that we use to add items to the page into a seperate file.  

This is the code we will be cutting from index.html (use a different seciton of code if this lesson is being run at a different time.)

```  
    <h3>Add an item</h3>
        <aside>reviewForm is {{stallForm.$pristine}}</aside>
        <form name="stallForm" ng-submit="stallForm.$valid && addStall(new_stall)" novalidate>
          <label>Name</label>
          <input type="text" ng-model="new_stall.name" required /><br>
          <label>Price</label>
          <input type="number" ng-model="new_stall.price" min="1" max="10" required /><br>
          <label>Description</label>
          <textarea ng-model="new_stall.description"></textarea><br>
          <button>Submit</button>
        </form>
```  

In the same directory create a file called new-stall-form.html and paste in the code from the index.html.


In your index.html where the above code was put the following code:

#####important - there are single quotes inside double quotes.

```  
    <div ng-include="'new-stall-form.html'"></div>    
```  

When we refresh in the console we get an error in our javascript console.

For this to work we need to be running the code on a server.

In the terminal run a python simple server from the directory where you app is.  
```  
    python -m SimpleHTTPServer  
```  
Open up <http://0.0.0.0:8000> in chrome to see the site.

Great - we can split out as much of the page we want into standalone segments.  For a large site with many different pages the same sections of code can be used in multiple places.  


Directives
----------

Next we will look at driectives.  For now this will do pretty much the same as we did with ng-include.  It has two advantages - firstly it makes our html even more expressive.
Secondly it has much more advanced functionality.  

We will just start with the basics.

In our app.js file we are going to write our own directive.  Below the controller write the following. Don't worry about what it means for now - let's just see how it works.    
```  
    app.directive('newStallForm', function() {  
      return {  
        restrict: 'E',  
        templateUrl: 'new-stall-form.html'  
      }  
    })  
```  
In our index.html we want to use this diretive.  For now leave in the div using ng-include. Below let's use our directive:

```
  <new-stall-form></new-stall-form>    
```  

Isn't that nice and expressive!  Reload the page and check that you get two forms.  Remove the div with the ng-include.  

Directives are very flexible and can be called in many ways.  The tag can be self closing e.g. 
```
    <new-stall-form />  
```  
Will have the same functionailty. However some browers don't like this so best to stick with a closing tag.

When naming single word directives watch out you future proof it. e.g. if you create a carousel directive in a future version of html this may be an actual html element.  Best practice is to prefeame it with three letters. Avoid using ng- to avoid conflict with angular.  

*What does restrict mean?*  

Restict is how your directive is called on the page. There are three options which can be combined.

A - directive matches attribute name:
```  
    <div new-stall-form></div>
```  
E - matches element name: 
```  
    <new-stall-form></new-stall-form>  
```  
C - matches class name:  
```  
    <div class="new-stall-form"></div>
```  
Why should you use differnt ones? This is according to the angular docs:  

When should I use an attribute versus an element? Use an element when you are creating a component that is in control of the template. The common case for this is when you are creating a Domain-Specific Language for parts of your template. Use an attribute when you are decorating an existing element with new functionality.

*More info:  *
<https://docs.angularjs.org/guide/directive>  
<http://www.thinkster.io/angularjs/rep5re7gTM/angularjs-directive-restrictions>  


LAB
=========

Remake another section of the page to use a directive. 










