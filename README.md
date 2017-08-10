# AppRouterJS

Symfony like router for javascript. Uses bracket style slugs eg. `{blogId}`, supports default vaules for optional slugs (last one only) and addtional requirements via a regex string.

* Under 3kb minified
* No dependencies
* Works without jQuery
* Simple and easy to use

## Getting Started

Download and add `AppRouter` to your project.

```html
<script src="/scripts/AppRouter.min.js" type="text/javascript"></script>
```

Instantiate new instance of `AppRouter`. You can optionally pass in the `routes` object as the first and only argument to the constructor or add them later on after the router has been created.

```javascript
//--routes object
var _routes = {
  home: {
    pattern: '/'
    ,action: 'homePage'
  }
  ,services: {
    pattern: '/shop/{department}'
    ,action: 'shopPage'
  }
};

//--without routes passed into the constructor
var _router = new AppRouter();
//...code
_router.setRoutes(_routes);

//--with routes passed into the constructor
var _router = new AppRouter(_routes);
```

Matching a url.

```javascript
var match = _router.match('/shop/electronics');

if (match) {
  //--do something here with match object
  //--match object
  //  {
  //    action: 'shopPage'
  //    ,slugs: {
  //      arr: [
  //        'electronics'
  //      ]
  //      ,obj: {
  //        department: 'electronics'
  //      }
  //    }
  //    ,defaults: {}
  //  }
}
```

## Examples

Adding another `routes` object after one has already been set either in the constructor or by passing it into `setRoutes`.

```javascript
var _routes2 = {
  about: {
    pattern: '/about'
    ,action: 'aboutPage'
  }
  ,contact: {
    pattern: '/contact'
    ,action: 'contactPage'
  }
};

//--merges routes into route collection
_router.addRoutes(_routes2);
```

Adding a single route.

```javascript
_router.addRoute('sales', {
  pattern: '/sales'
  ,action: 'salesPage'
});
```

Adding a single route with a callback as the action.

```javascript
_router.addRoute('sales', {pattern: '/sales'}, function() {
  //--action page
});
```

Adding a route with an optional trailing slug

```javascript
_router.addRoute('shop_department_item_categories', {
  pattern: '/shop/{department}/{category}'
  ,action: 'shopDepartmentCategoriesPage'
  ,defaults: {
    category: 'list'
  }
});

//--url without optional slug
var match = _router.match('/shop/home-and-office');
if (match) {
  //--do something here with match object
  //--match object
  //  {
  //    action: 'shopDepartmentCategoriesPage'
  //    ,slugs: {
  //      arr: [
  //        'home-and-office'
  //        ,'list'
  //      ]
  //      ,obj: {
  //        department: 'home-and-office'
  //        ,category: 'list'
  //      }
  //    }
  //    ,defaults: {}
  //  }
}

//--url with optional slug
var match = _router.match('/shop/home-and-office/supplies');
if (match) {
  //--do something here with match object
  //--match object
  //  {
  //    action: 'shopDepartmentCategoriesPage'
  //    ,slugs: {
  //      arr: [
  //        'home-and-office'
  //        ,'supplies'
  //      ]
  //      ,obj: {
  //        department: 'home-and-office'
  //        ,category: 'supplies'
  //      }
  //    }
  //    ,defaults: {}
  //  }
}
```

Adding a route with additional requirements on the slug(s)

```javascript
//--requirements are standard regex strings
_router.addRoute('shop_department_item_details', {
  pattern: '/shop/{department}/{category}/{itemId}'
  ,action: 'shopDepartmentCategoriesPage'
  ,requirements: {
    department: '[a-zA-Z0-9-_]+' //--alphanumeric, hyphen and dashes only
    ,category: '[a-zA-Z0-9-_]+' //--alphanumeric, hyphen and dashes only
    ,itemId: '\\d+' //--numbers only
  }
});

//--example 1
var match = _router.match('/shop/electronics/car/437');
if (match) {
  //--do something here with match object
  //--match object
  //  {
  //    action: 'shopDepartmentItemsDetailsPage'
  //    ,slugs: {
  //      arr: [
  //        'electronics'
  //        ,'car'
  //        ,'437'
  //      ]
  //      ,obj: {
  //        department: 'electronics'
  //        ,category: 'car'
  //        ,itemId: '437'
  //      }
  //    }
  //    ,defaults: {}
  //  }
}

//--example 2
var match = _router.match('/shop/home-and-office/supplies/573');
if (match) {
  //--do something here with match object
  //--match object
  //  {
  //    action: 'shopDepartmentItemsDetailsPage'
  //    ,slugs: {
  //      arr: [
  //        'home-and-office'
  //        ,'supplies'
  //        ,'573'
  //      ]
  //      ,obj: {
  //        department: 'home-and-office'
  //        ,category: 'supplies'
  //        ,itemId: '573'
  //      }
  //    }
  //    ,defaults: {}
  //  }
}
```

## Constructor

## Route objects

## Functions

**setRoutes(_routes)** - Sets a `routes` object
  * ___routes__ - *object* - The `routes` object

**addRoute(_name, _opts, _action)** - Add a single route
  * ___name__ - *string* - The name/key of the route
  * ___opts__ - *object* - The routes configuration/options
  * ___action__ - *mixed* - Optional - A callable function or a string value function name

**addRoutes(_routes)** - Adds/merges a `routes` object into the existing collection
  * ___routes__ - *object* - The `routes` object

**match(_url)** - Attempts to match a url. On success it returns an object with the action, slugs (object and array) and any default valuees from the configuration
  * ___url__ - *string* - The url to match