const byValueModule = require("./by-ref-module");

console.log("x:", byValueModule.x());
byValueModule.increment()
console.log("x:", byValueModule.x());

console.log("As you can see, CommonJS modules can have internal state.");
