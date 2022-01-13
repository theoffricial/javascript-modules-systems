console.log("Example 3 - importing module multiple times");
// const myNumber = 5;
// export { myNumber as x };


(async () => {
    console.log("Going to import", new URL("./dependency.js", import.meta.url).href);
    // Check "Disable cache" via DevTools
    const dependency1 = await import("./dependency.js");
    const dependency2 = await import("./dependency.js");
    console.log("dependency1:", dependency1.myDependency);
    console.log("dependency2:", dependency2.myDependency);
})();