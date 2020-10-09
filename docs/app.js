"use strict"

const express = require("express");
const options = require("./config/options.json");
const requestHandlers = require("./scripts/request-handlers.js");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("www"));

// Sensor
app.get("/sensors", requestHandlers.getSensors);

// post new Sensor
app.post("/sensor", requestHandlers.createSensor);

app.listen(options.server.port, function() {
    console.log("Server running at http://localhost:%d", options.server.port);
});