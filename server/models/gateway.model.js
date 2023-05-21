const net = require('node:net');

module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        index: true,
        unique: true,
        sparse: true,
      },
      ip: {
        type: String,
        required: true,
        unique: true,
        sparse: true,
        validate: {
          validator: function (value) {
            return net.isIPv4(value);
          },
          message: "It's not IPv4",
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
