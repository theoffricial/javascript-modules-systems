console.log("Example 6 - default");

console.log("Going to import", new URL("./dependency.js", import.meta.url).href);
// Check "Disable cache" via DevTools
import defaultDependency, { notDefault } from './dependency.js';
console.log("default:", defaultDependency);
console.log("notDefault:", notDefault);