
# JavaScript "module" systems

Since JavaScript has developed back in 2005, the eco-system changed its purpose many times, This repository will present all the confusing things over the modern JavaScript.

Right after understanding JavaScript basic syntax,
The JavaScript "module" systems are the most important fundamental that JS developer should be familiar with. It will navigate you to have good decision making when dealing with the JS eco-system.

In comparison to other languages, JavaScript did a few dramatic changes during its relative short life-time.
Originally, JavaScript has developed to be a script language for dynamic web pages that are running over browsers,
During time technologies like NodeJS, react-native, mongoDB developed and became super popular.
Each of the mentioned technologies, had/have its own agenda of how JavaScript should look like, and currently it creates a lot of confusion among developers.

Fully understand these different "mutations" of JavaScript module systems will make one to look at many conflicts into much more logical and clear.

## Discolsure

I took inspiration from [jameshfisher](jameshfisher.com) blog, which did an amazing job explaining everything.

---

## The modern JS eco-system module systems

- [Raw `<script>` loading](raw/README.md), where dependencies are implicit, and exports are vomited onto the window object. (Strangely, this convention doesn’t have a name!) and this is the original purpose JS was created for.

- [CommonJS](commonjs/README.md), where a module’s dependencies are synchronously, dynamically require()d, and its exports are placed on an exports object.
  
- [“ECMAScript modules” or ES modules or "ESM"](esm/README.md), where a module’s dependencies are **statically** imported before execution, and its exports are statically defined, top-level variables.
  
- [Asynchronous Module Definition or “AMD”](amd/README.md), where a module calls define(dependencies, callback) (Plus a degenerate alternative form which unsafely wraps a CommonJS module; the less said about it, the better).
  
- [Universal Module Definition or "UMD"](umd/README.md). One final module system to rule them all (except ES modules which are a different thing)
