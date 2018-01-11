const async = require("async");
const fs = require("fs");
const path = require("path");
const turf = require("@turf/turf");
const D3Dsv = require("d3-dsv");

const sortByProperty = property => {
    return (x, y) => {
        let temp;
        if (x[property] === y[property]) temp = 0;
        else if (x[property] > y[property]) temp = 1;
        else temp = -1;
        return temp;
    };
};

const dataIn = () => {
    /**
     * dataIn could be changed to a sql connection querying a table if needed, but for sake of expediency used csv provided as data source.
     */
    // read in csv
    const csvInput = fs
        .readFileSync(path.join(__dirname, "/data/pharmacies.csv"))
        .toString();

    // parse csv
    return D3Dsv.csvParse(csvInput);
};

const findNearest = (inPoint, cb) => {
    const here = turf.point(inPoint);

    let jsonData = dataIn();

    async.each(
        jsonData,
        (el, next) => {
            const pharmacy = turf.point([el.longitude, el.latitude]);
            el.distanceInMiles = turf.distance(here, pharmacy, {
                units: "miles"
            });
            next();
        },
        err => {
            if (err) cb(err);
            jsonData = jsonData.sort(sortByProperty("distanceInMiles"));

            cb(null, jsonData[0]);
        }
    );
};

module.exports = findNearest;
