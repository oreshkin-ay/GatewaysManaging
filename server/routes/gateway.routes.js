module.exports = (app) => {
  const gateway = require("../controllers/gateway.controller.js");

  const router = require("express").Router();

  router.get("/", gateway.findAll);

  router.post("/", gateway.create);

  router.get("/:id", gateway.findOne);

  router.put("/:id", gateway.update);

  router.delete("/:id", gateway.delete);

  router.delete("/", gateway.deleteAll);

  app.use("/api/gateway", router);
};
