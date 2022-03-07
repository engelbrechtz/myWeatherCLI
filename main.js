const weather = require("./weather");

const zipcode = process.argv.slice(2).join("");

// console.log(zipcode);

weather(zipcode);
