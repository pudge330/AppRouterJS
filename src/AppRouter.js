var AppRouter = function(__routes) {
	var __priv = {
		routes: {}
		,init: function() {
			if (typeof __routes != undefined) {
				__priv.routes = __routes;
			}
			for (var _name in __priv.routes) {
				if (__priv.routes.hasOwnProperty(_name)) {
					__priv.routes[_name] = __priv.processNewRoute(__priv.routes[_name]);
				}
			}
		}
		,processNewRoute: function(_route) {
			if (typeof _route.defaults == 'undefined')
				_route.defaults = {};
			if (typeof _route.requirements == 'undefined')
				_route.requirements = {};
			_route.defaultSlugs = {keys: [], obj: {}, arr: []};
			_route.pattern = _route.pattern.replace(/\/+$/, '');
			if (_route.pattern == '') {
				_route.pattern = '/';
			}
			_route = __priv.compileRoute(_route);
			clog(_route);
			return _route;
		}
		,compileRoute: function(_route) {
			var _pattern = _route.pattern;
			var _slugMatches = _pattern.match(/({([^\/{}]+)})/g);
			var _regexes = {};
			if (_slugMatches) {
				for (var i = 0; i < _slugMatches.length; i++) {
					_slugMatch = _slugMatches[i];
					_slugMatches[i] = _slugMatches[i].replace(/^({)|(})$/g, '');
					var _tmpRegex = '([^\\/?#]+)';
					if (typeof _route.requirements[_slugMatches[i]] != 'undefined') {
						_tmpRegex = '(' + _route.requirements[_slugMatches[i]] + ')';
					}
					_slugMatch = '\\{' + _slugMatches[i] + '\\}';
					_route.defaultSlugs.keys.push(_slugMatches[i]);
					if (typeof _route.defaults[_slugMatches[i]] != 'undefined') {
						_route.defaultSlugs.obj[_slugMatches[i]] = _route.defaults[_slugMatches[i]];
						_route.defaultSlugs.arr.push(_route.defaults[_slugMatches[i]]);
						if (i == _slugMatches.length - 1) {
							_tmpRegex = '(?:\\/' + _tmpRegex + ')?';
							_slugMatch = '\\/' + _slugMatch;
						}
						delete _route.defaults[_slugMatches[i]];
					}
					else {
						_route.defaultSlugs.obj[_slugMatches[i]] = undefined;
						_route.defaultSlugs.arr.push(undefined);
					}
					_regexes[_slugMatch] = _tmpRegex;
				}
			}
			_pattern = __priv.regexEscape(_pattern)
			for (var _slug in _regexes) {
				if (_regexes.hasOwnProperty(_slug)) {
					_pattern = _pattern.replace(_slug, _regexes[_slug]);
				}
			}
			_pattern = '^' + _pattern + '$';
			_route.compiledRegex = new RegExp(_pattern);
			return _route;
		}
		,regexEscape: function(_string) {
			return _string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
		}
		,cloneObject: function(_obj) {
			if (null == _obj || "object" != typeof _obj)
				return _obj;
			var copy = _obj.constructor();
			for (var attr in _obj) {
				if (_obj.hasOwnProperty(attr))
					copy[attr] = _obj[attr];
			}
			return copy;
		}
	};
	var __this = {
		setRoutes: function(_routes) {
			__priv.routes = _routes;
			for (var _name in __priv.routes) {
				if (__priv.routes.hasOwnProperty(_name)) {
					__priv.routes[_name] = __priv.processNewRoute(__priv.routes[_name]);
				}
			}
		}
		,addRoute: function(_name, _opts, _action) {
			__priv.routes[_name] = _opts;
			if (typeof _action != 'undefined') {
				__priv.routes[_name].action = _action;
			}
			__priv.routes[_name] = __priv.processNewRoute(__priv.routes[_name]);
		}
		,addRoutes: function(_routes) {
			for (var _name in _routes) {
				if (_routes.hasOwnProperty(_name)) {
					__priv.routes[_name] = _routes[_name];
					__priv.routes[_name] = __priv.processNewRoute(__priv.routes[_name]);
				}
			}
		}
		,match: function(_url) {
			_url = _url.replace(/\/+$/, '');
			if (_url == '') {
				_url = '/';
			}
			for (var _name in __priv.routes) {
				if (__priv.routes.hasOwnProperty(_name)) {
					var _urlMatches = _url.match(__priv.routes[_name].compiledRegex);
					if (_urlMatches) {
						var _slugs = {
							obj: __priv.cloneObject(__priv.routes[_name].defaultSlugs.obj)
							,arr: __priv.routes[_name].defaultSlugs.arr.slice()
						};
						for (var i = 0; i < _slugs.arr.length; i++) {
							if (typeof _urlMatches[i + 1] != 'undefined') {
								_slugs.obj[__priv.routes[_name].defaultSlugs.keys[i]] = _urlMatches[i + 1];
								_slugs.arr[i] = _urlMatches[i + 1];
							}
						}
						return {
							action: __priv.routes[_name].action
							,slugs: _slugs
							,defaults: __priv.cloneObject(__priv.routes[_name].defaults)
						};
					}
				}
			}
			return null;
		}
	};
	__priv.init();
	return __this;
};
