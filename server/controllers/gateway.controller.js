const db = require("../models");
const Gateway = db.gateway;

exports.create = (req, res) => {
  const gateway = new Gateway(req.body);

  gateway
    .save(gateway)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message:
          err.message || "Some error occurred while creating the Gateway.",
      });
    });
};

exports.findAll = (req, res) => {
  const { name } = req.query;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  Gateway.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message:
          err.message || "Some error occurred while retrieving gateways.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Gateway.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Gateway with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Gateway with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Gateway.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Gateway with id=${id}. Maybe Gateway was not found!`,
        });
      } else res.send({ message: "Gateway was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Gateway with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Gateway.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Gateway with id=${id}. Maybe Gateway was not found!`,
        });
      } else {
        res.send({
          message: "Gateway was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Gateway with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Gateway.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Gateways were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all gateways.",
      });
    });
};
