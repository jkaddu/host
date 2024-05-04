// How NodeJS differs from Vanilla JS
// NodeJS runs on a server compared to VanillaJA which runs in the browser
// THe console is the termianl window compared to the console window on the brower
// Has global object instead of a window object
// Has core modules that I'll explore
// Use ComminJS modules instead of ES6 modules
// Missing some JS API like fetch

const os = require("os");
const path = require("path");
// const math = require("./math");
// Destructured math import
const { add, subtract, multiply, divide } = require("./math");

console.log(add(2, 3));
console.log(subtract(2, 3));
console.log(multiply(2, 3));
console.log(divide(2, 3));
// console.log("Hello World");

// console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());
// console.log(__dirname);
// console.log(__filename);

// console.log(path.dirname(__filename));
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));

// console.log(path.parse(__filename));
