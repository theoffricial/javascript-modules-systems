console.log("Example 4 - import synchronously");
// const myNumber = 5;
// export { myNumber as x };

console.log("Going to import", new URL("./dependency.js", import.meta.url).href);
// Check "Disable cache" via DevTools
import * as dependency1 from './dependency.js';
import * as dependency2 from './dependency.js';
console.log("dependency1:", dependency1.myDependency);
console.log("dependency2:", dependency2.myDependency);

// This was example 3
// (async () => {
//     console.log("Going to import", new URL("./dependency.js", import.meta.url).href);
//     // Check "Disable cache" via DevTools
//     const dependency1 = await import("./dependency.js");
//     const dependency2 = await import("./dependency.js");
//     console.log("dependency1:", dependency1.myDependency);
//     console.log("dependency2:", dependency2.myDependency);
// })();