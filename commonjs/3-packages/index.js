const fs = require("fs"); // should imported because it is nodejs built-in module

try {
    // Also, you can see it can be loaded dynamically and synchronously
    const _ = require("lodash"); // should not imported, unless installed globally
    // also equivalent to "./node_modules/lodash/index.js"
    console.log(_.camelCase("a_be_si"));
} catch (e) {
    console.error(e);
}

console.log(fs.existsSync("./blablabla.js"));