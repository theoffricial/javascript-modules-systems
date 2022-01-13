console.log("Example 2 - executing module");
// const myNumber = 5;
// export { myNumber as x };


(async () => {
    console.log("Going to import", new URL("./dependency.js", import.meta.url).href);
    const dependency = await import("./dependency.js");
    console.log(dependency.myDependency);
})();