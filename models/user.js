const mongoose = require("mongoose"),
  { Schema } = mongoose,
  Subscriber = require("../models/subscriber"),
  Course = require("../models/course"),
  bcrypt = require("bcryptjs"),
  passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema(
  {
    name: {
      first: { type: String, trim: true },
      last: { type: String, trim: true },
    },
    email: { type: String, required: true, lowercase: true, unique: true },
    zipCode: { type: Number, min: [10000, "ZipCode trop court"], max: 99999 },
    password: { type: String, required: true },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    subscribedAccount: { type: Schema.Types.ObjectId, ref: "Subscriber" },
  },
  { timestamps: true }
);

userSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`;
});

userSchema.pre("save", function () {
  let user = this;
  bcrypt
    .hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch((err) => {
      console.log(`Error hashing password: ${err.message}`);
      next(err);
    });
});

userSchema.methods.passwordComparaison = function (inputPassword) {
  let user = this;
  return bcrypt.compare(inputPassword, user.password);
};

userSchema.pre("save", function (next) {
  let user = this;
  if (user.subscribedAccount === undefined) {
    Subscriber.findOne({ email: user.email })
      .then((subscriber) => {
        user.subscribedAccount = subscriber;
        next();
      })
      .catch((error) => {
        console.log(`Error in connecting subsscriber : ${error.message}`);
        next(error);
      });
  } else {
    next();
  }
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});

module.exports = mongoose.model("User", userSchema);
