const byValueModule = require("./by-value-module");

console.log("x:", byValueModule.x);
byValueModule.increment()
console.log("x:", byValueModule.x);

