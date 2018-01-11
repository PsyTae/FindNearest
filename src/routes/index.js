const path = require("path");
const express = require("express");
const nearest = require("../findNearest");

const router = express.Router();

// main app route
router.get("/", (req, resp) => {
    resp.sendFile(path.join(__dirname, "pages/apiDoc.html"));
});

router.get("/api/findnearest", (req, resp) => {
    if (!req.query.latitude || !req.query.longitude)
        return resp
            .status(400)
            .sendFile(path.join(__dirname, "pages/400Error.html"));

    nearest([req.query.longitude, req.query.latitude], (err, result) => {
        if (err)
            return resp
                .status(500)
                .sendFile(path.join(__dirname, "pages/500Error.html"));
        resp.setHeader("Content-Type", "application/json");
        resp.json(result);
    });
});

module.exports = router;
