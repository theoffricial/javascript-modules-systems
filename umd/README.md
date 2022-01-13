# What is UMD module system

Basically, a UMD module is a JavaScript file that tries to guess at runtime which module system it’s being used in, and then it acts as that kind of module. So you can load the file in a plain `<script>`, or you can load it from an AMD module loader, or you can load it as a Node.js module, and it will always do something sensible.

You might reasonably ask why this is useful. Surely the developer knows ahead of time which module system is being used, and so can load a version specifically for that module system? So we’d have `react-script.js` for raw `<script>` users, `react-commonjs.js` for CommonJS users, `react-amd.js` for AMD users, and `react-es6.js` for ECMAScript module users.

Honestly, I don’t know the answer. I suppose it allows library authors and library consumers to live in some level of ignorance.
And also use the same library easily for different purposes.
e.g. Running React over the browser and also make it compatible with NodeJS libraries/tools for testing purposes.

But for whatever reason, UMD is popular. [Here is the basic pattern](https://github.com/umdjs/umd/blob/master/templates/commonjsStrict.js), in all its glory:

## UMD implementation

```javascript
// myModuleName.js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'b'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('b'));
    } else {
        // Browser globals
        factory((root.myModuleName = {}), root.b);
    }
}(typeof self !== 'undefined' ? self : this, function (exports, b) {
    // Use b in some fashion.

    // attach properties to the exports object to define
    // the exported module properties.
    exports.action = function () {};
}));
```

Near the bottom is the factory function, which contains the meat of the module. As arguments, it is given its imported modules, and an exports object that it is expected to populate. We then have some magic tests for different module systems. If `typeof define === 'function' && define.amd`, we’re probably in an AMD system, so we should define a module. If `typeof exports === 'object' && typeof exports.nodeName !== 'string'`, we’re probably in a CommonJS system, so we should require the dependencies and put our exports on the global exports object. Otherwise, we should just act like a `<script>`: attempt to take our dependencies from the global object, and spit our exports back onto the global object.

There are lots of variations on this theme in different packages. But you know you’re looking at UMD if you see these runtime checks for typeof define, typeof exports, etc. For example, here’s a file in the [react](https://unpkg.com/browse/react@16.13.1/umd/react.development.js) package, which begins:

```javascript
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.React = {}));
}(this, (function (exports) { 'use strict'; // ...
```

## UMD does not support ESM

Despite claiming to be “universal”, there’s one big module system that UMD doesn’t support: ECMAScript modules or "ESM", i.e. The Future! You can’t write `import {foo,bar} from './someUmdModule.js'` and expect it to work. I actually think it would be impossible, because ECMAScript modules define their imports and exports statically at the top level, which contradicts the idea of dynamic runtime switching between module systems.
