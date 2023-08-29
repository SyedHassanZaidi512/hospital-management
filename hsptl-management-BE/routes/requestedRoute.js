const express = require("express");
const {
  addDeviceToRequested,
  getAllRequestedDevices,
  getOneRequestedDevice,
  deleteAllDB
} = require("../controllers/requested.controller");

const router = express.Router();

router.get("/", getAllRequestedDevices);
router.post("/:deviceID", addDeviceToRequested);
router.get("/:deviceID", getOneRequestedDevice);
router.delete("/delete", deleteAllDB);
module.exports = router;
