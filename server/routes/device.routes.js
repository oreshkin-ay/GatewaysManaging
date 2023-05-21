module.exports = (app) => {
  const device = require("../controllers/device.controller.js");

  var router = require("express").Router();

  router.post("/:id", device.create);

  router.get("/", device.findAll);

  router.get("/:id", device.findOne);

  router.put("/:id", device.update);

  router.delete("/:id", device.delete);

  router.delete("/", device.deleteAll);

  app.use("/api/device", router);
};

// https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/
