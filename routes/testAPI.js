var express = require("express");
var router = express.Router();

const fs = require("fs");

router.get("/", function (req, res, next) {
  res.send("API is working properly");
});

router.get("/fleets", function (req, res, next) {
  fs.readFile("./fleets.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading fleets file from disk:", err);
      return;
    }
    try {
      const fleets = JSON.parse(jsonString);
      let fleetsAdd = fleets.Fleets.map(fleet => {
        return(
          {
           ...fleet, 
           cnt: fleet.vessels.length
          }
        );
      })

      console.log("Fleets:", fleets);
      res.send(fleetsAdd);
    } catch (err) {
      console.log("Error parsing Fleets JSON string:", err);
      res.status(400).send(error.message);
    }
  });
});

router.get("/vessels", function (req, res, next) {
  fs.readFile("./vessels.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading vessels file from disk:", err);
      return;
    }
    try {
      const vessels = JSON.parse(jsonString);
      console.log("Vessels:", vessels);
      res.send(vessels);
    } catch (err) {
      console.log("Error parsing Vessels JSON string:", err);
      res.status(400).send(err.message);
    }
  });
});

router.get("/vesselLocations", function (req, res, next) {  
  fs.readFile("./vesselLocations.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading vesselLocations file from disk:", err);
      return;
    }
    try {
      const vesselLocations = JSON.parse(jsonString);

      console.log("VesselLocations:", vesselLocations);
      res.send(vesselLocations);
    } catch (err) {
      console.log("Error parsing VesselLocations JSON string:", err);
      res.status(400).send(err.message);
    }
  });
});

router.get("/fleet/:id", (req, res, next) => {
  fs.readFile("./fleets.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      return;
    }
    try {
      const fleets = JSON.parse(jsonString);
      console.log("Fleets:", fleets);

      //const fleet = fleets.findById(req.params.id);
      let id = req.params.id;
      let fleetSpec = fleets.map((x) => {
        return x._id == id;
      });
      if (!fleetSpec)
        return res
          .status(404)
          .send("The fleet with the given ID was not found.");

      res.send(fleetSpec.vessels);
    } catch (err) {
      console.log("Error parsing JSON string:", err);
      res.status(400).send(err.message);
    }
  });
});

module.exports = router;
