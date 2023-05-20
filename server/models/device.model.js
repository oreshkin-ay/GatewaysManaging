// • a UID (number),
// • vendor (string),
// • date created,
// • status - online/offline.

module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      uid: {
        type: Number,
        unique: true,
        required: true,
      },
      vendor: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      gateway: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "gateway",
      },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Device = mongoose.model("device", schema);
  return Device;
};
