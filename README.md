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
};

//--without routes passed into the constructor
var _router = new AppRouter();
//...code
_router.setRoutes(_routes);

//--with routes passed into the constructor
var _router = new AppRouter(_routes);
```