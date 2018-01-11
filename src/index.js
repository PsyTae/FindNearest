// npm i --save express morgan async @turf/turf d3-dsv express-uncapitalize
/* eslint no-console: 0 */
const express = require("express");
const morgan = require("morgan");
const routes = require("./routes/index");

const app = express();
const expressPort = process.env.PORT || 8080;

app.set("json spaces", 2);
app.use(require("express-uncapitalize")());

app.use(morgan("dev"));

app.use(routes);

app.listen(expressPort, () => {
    console.log(`Express listening on port ${expressPort}`);
});
