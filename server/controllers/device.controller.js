const db = require("../models");
const Device = db.device;
const Gateway = db.gateway;

// function getNextSequence(name) {
//   var ret = Device.findByIdAndUpdate(
//     { uid: -1 },
//     {},
//     {
//       new: true,
//       // upsert: true,
//       update: { $inc: { seq: 1 } },
//     }
//   );
//   return ret?.seq ?? 2;
// }

exports.create = async (req, res) => {
  try {
    const { id } = req.params;
    const gateway = await Gateway.findById(id);
    if (gateway == null) {
      return res.status(404).json({ message: "Gateway doesn't exist." });
    }

    if (gateway.devices.length === 10) {
      return res.status(400).json({ message: "Device limit exceeded." });
    }

    const newDevice = new Device({
      ...req.body,
      // uid: req.body.uid,
      gateway: id,
    });

    const device = await newDevice.save();
    gateway.devices.push(device._id);
    await gateway.save();
    res.send(device);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

exports.findAll = (req, res) => {
  const { vendor } = req.query;

  var condition = vendor
    ? { vendor: { $regex: new RegExp(vendor), $options: "i" } }
    : {};

  Device.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving device.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Device.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Device with id " + id });
      else res.send(data);
    })
    .catch(() => {
      res
        .status(400)
        .send({ message: "Error retrieving Device with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Device.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Device with id=${id}. Maybe Device was not found!`,
        });
      } else res.send({ message: "Device was updated successfully." });
    })
    .catch(() => {
      res.status(500).send({
        message: "Error updating Device with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Device.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Device with id=${id}. Maybe Device was not found!`,
        });
      } else {
        res.send({
          message: "Device was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Device with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Device.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Devices were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all devices.",
      });
    });
};
