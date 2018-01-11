/* eslint no-console: 0 */
const nearest = require("./findNearest");

nearest([-94.266627, 38.97931], (err, result) => {
    if (err) console.error("Error:", err);
    console.log("Result:", result);
});
