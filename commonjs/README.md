# CommonJS module system

## What does the require function do in Node.js?

The other day I wrote an intro to “JavaScript modules”. But technically, I only wrote an intro to ECMAScript modules, one of the two major module systems in JavaScript. The other is the “CommonJS” module system, which is mainly used in Node.js, and is identified by calls to a require function. Here’s a brief intro to that system.

---

Here’s an example CommonJS module, which you could use in Node.js:

```javascript
let x = 5;
exports.x = x;
exports.increment = function() {
x++;
};
```

Then to use it:

```bash
> require('myModule.js')
Uncaught Error: Cannot find module 'myModule.js'
Whoops, Node.js can’t even find our module.
```

This very unhelpful error message is because, to load a file with a relative path, we have to use an explicit ./ prefix:

```bash
> const m = require('./myModule.js')
undefined
> m.x
5
> m.increment()
undefined
> m.x
5
```

A CommonJS module exports things by adding properties to an exports object. Our module exports an x and an increment. But if you’ve used ECMAScript modules, this module might not work as you expected: m.x does not get incremented after calling m.increment()!

The original variable x does get incremented, but m.x is not a reference to that variable. The line exports.x = x copies the value of x, rather than making a reference to it. This is different to the “live binding” semantics of ECMAScript modules. To make this work as expected, we can export a getter function:

`exports.x = () => x;`

As you can see, CommonJS modules can have internal state. requiring a module multiple times will only execute the module script once, and return the same exports object from every require call. Thus, the module’s state can be shared. For example:

```javascript
const m1 = require('./myModule.js');
const m2 = require('./myModule.js');
console.log(m1.x());  // logs 5
m2.increment();
console.log(m1.x());  // logs 6
```

## Node.js and packages

So this is how you load a local module you’ve written. But what about external “packages”? Every Node.js developer has written `const express = require('express')`, but what does this do? The full search algorithm is a bit horrifying. But in a standard setup, this loads the JavaScript file at `./node_modules/express/index.js`. You can equivalently write `const express = require('./node_modules/express/index.js')`. You can also use require.resolve to debug it:

```bash
> require.resolve('express')
'/Users/jim/dev/tmp/node_require/node_modules/express/index.js'
```

According to the algorithm, before finding `./node_modules/express/index.js`, it tried looking for express in the core Node.js modules. This didn’t exist, so it looked in node_modules, and found a directory called express. (If there was a `./node_modules/express.js`, it would load that directly.) It then loaded `./node_modules/express/package.json`, and looked for an exports field, but this didn’t exist. It also looked for a main field, but this didn’t exist either. It then fell back to index.js, which it found.

It’s a bit deceptive that Node.js looks in package.json files. It gives the impression that Node.js knows about packages, but actually Node.js (should) really only know about modules. NPM, a package manager, only really knows about packages. Some things like express are both Node.js modules and NPM packages. Other things are Node.js modules, but not NPM packages (like a local file `./myModule.js`); Yet other things are NPM packages, but not Node.js modules (like this Python package on NPM).

When a module has its own dependencies, how do these get resolved? The express module has a call to `require('body-parser')`. You might think that it has its own node_modules, like `./node_modules/express/node_modules/body-parser/index.js`. If this was present, it would load! However, this is unconventional; typically all recursive sub-dependencies are flattened into one big node_modules directory. To make this work, `require()` looks for `node_modules` in all of the parent directories of the caller.

---

## module.exports vs exports in Node.js

This inspired by [this](https://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-node-js) discussion on `stack overflow`.


Even though question has been answered and accepted long ago, i just want to share my 2 cents:

You can imagine that at the very beginning of your file there is something like (just for explanation):

```javascript
var module = new Module(...);
var exports = module.exports;
enter image description here
```

So whatever you do just keep in mind that module.exports and NOT exports will be returned from your module when you're requiring that module from somewhere else.

So when you do something like:

```javascript
exports.a = function() {
    console.log("a");
}
exports.b = function() {
    console.log("b");
}
```

You are adding 2 functions a and b to the object to which module.exports points, so the `typeof` the returning result will be an `object: { a: [Function], b: [Function] }`

Of course, this is the same result you will get if you are using module.exports in this example instead of exports.

This is the case where you want your module.exports to behave like a container of exported values. Whereas, if you only want to export a constructor function then there is something you should know about using module.exports or exports;(Remember again that module.exports will be returned when you require something, not export).

```javascript
module.exports = function Something() {
    console.log('bla bla');
}
```

Now `typeof` returning result is 'function' and you can require it and immediately invoke like:
`var x = require('./file1.js')();` because you overwrite the returning result to be a function.

However, using exports you can't use something like:

```javascript
exports = function Something() {
    console.log('bla bla');
}
```

```javascript
var x = require('./file1.js')(); //Error: require is not a function
```

Because with exports, the reference doesn't point anymore to the object where module.exports points, so there is not a relationship between exports and module.exports anymore. In this case module.exports still points to the empty object `{}` which will be returned.

The accepted answer from another topic should also help: Does JavaScript pass by [reference](https://stackoverflow.com/questions/13104494/does-javascript-pass-by-reference)?
