// • a unique serial number (string),
// • human-readable name (string),
// • IPv4 address (to be validated),
// • multiple associated peripheral devices.

module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        // index: true,
        unique: true,
        sparse: true,
      },
      ip: {
        type: String,
        required: true,
        // index: true,
        unique: true,
        sparse: true,
        validate: {
          validator: function (value) {
            return true;
          },
          message: "Invalid",
        },
      },
      devices: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "device",
        },
      ],
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Gateway = mongoose.model("gateway", schema);
  return Gateway;
};
