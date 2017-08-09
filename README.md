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
		action: 'shopPage'
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
	//  	action: 'shopPage'
	//  	,slugs: {
	//  		department: 'electronics'
	//  	}
	//  	,defaults: {}
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

Adding one single route.

```javascript
_router.addRoute('sales', {
	pattern: '/sales'
	,action: 'salesPage'
});
```

Adding one single route with a callback as the action.

```javascript
_router.addRoute('sales', {pattern: '/sales'}, function() {
	//--action page
});
```

Adding a route with a optional trailing slug

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
	//  	action: 'shopDepartmentCategoriesPage'
	//  	,slugs: {
	//  		department: 'home-and-office'
	//  		,category: 'list'
	//  	}
	//  	,defaults: {}
	//  }
}

//--url with optional slug
var match = _router.match('/shop/home-and-office/supplies');
if (match) {
	//--do something here with match object
	//--match object
	//  {
	//  	action: 'shopDepartmentCategoriesPage'
	//  	,slugs: {
	//  		department: 'home-and-office'
	//  		,category: 'supplies'
	//  	}
	//  	,defaults: {}
	//  }
}
```

Adding a route with addtional requirements on the slug(s)

```javascript
_router.addRoute('shop_department_item_categories', {
	pattern: '/shop/{department}/{category}/{itemId}'
	,action: 'shopDepartmentCategoriesPage'
	,requirements: {
		department: '[a-zA-Z0-9-_]+' //--alphanumeric, hyphen and dashes only
		,category: '[a-zA-Z0-9-_]+' //--alphanumeric, hyphen and dashes only
		,itemId: '\\d+' //--numbers only
	}
});

//--url without optional slug
var match = _router.match('/shop/electronics/car/437');
if (match) {
	//--do something here with match object
	//--match object
	//  {
	//  	action: 'shopDepartmentItemsDetailsPage'
	//  	,slugs: {
	//  		department: 'electronics'
	//  		,category: 'car'
	//  		,itemId: 437
	//  	}
	//  	,defaults: {}
	//  }
}

//--url with optional slug
var match = _router.match('/shop/home-and-office/supplies/573');
if (match) {
	//--do something here with match object
	//--match object
	//  {
	//  	action: 'shopDepartmentItemsDetailsPage'
	//  	,slugs: {
	//  		department: 'home-and-office'
	//  		,category: 'supplies'
	//  		,itemId: 573
	//  	}
	//  	,defaults: {}
	//  }
}
```