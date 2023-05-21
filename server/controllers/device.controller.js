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
      gateway_id: id,
    });

    const device = await newDevice.save();
    gateway.devices.push(device._id);
    await gateway.save();
    res.send(device);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const device = await Device.findByIdAndRemove(id);
    if (!device) {
      res.status(404).send({
        message: `Cannot delete Device with id=${id}. Maybe Device was not found!`,
      });
    } else {
      const gateway = await Gateway.findById(device.gateway_id);
      gateway.devices = gateway.devices.filter(
        (idDevice) => idDevice.toString() !== id
      );
      await gateway.save();
      res.send(device);
    }
  } catch (e) {
    res.status(400).send({
      message: "Could not delete Device with id=" + id,
    });
  }
};
