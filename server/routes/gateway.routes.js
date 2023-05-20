module.exports = (app) => {
  const gateway = require("../controllers/gateway.controller.js");

  var router = require("express").Router();

  router.post("/", gateway.create);

  router.get("/", gateway.findAll);

  router.get("/:id", gateway.findOne);

  router.put("/:id", gateway.update);

  router.delete("/:id", gateway.delete);

  router.delete("/", gateway.deleteAll);

  app.use("/api/gateway", router);
};
