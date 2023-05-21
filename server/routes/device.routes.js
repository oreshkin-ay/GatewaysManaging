module.exports = (app) => {
  const device = require("../controllers/device.controller.js");

  var router = require("express").Router();

  router.post("/:id", device.create);

  router.delete("/:id", device.delete);

  app.use("/api/device", router);
};
