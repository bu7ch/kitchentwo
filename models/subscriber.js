const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

const subscriberSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    zipCode: { type: Number, min: [10000, "Zipcode trop court"], max: 99999 },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);
subscriberSchema.methods.getInfo = function () {
  return `name : ${this.name} email : ${this.email} zipCode : ${this.zipCode}`;
};
const Subscriber = mongoose.model("Subscriber", subscriberSchema);

module.exports = Subscriber;
