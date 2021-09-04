const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

const courseSchema = new Schema(
  {
    title: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    // maxStudents: {
    //   type: Number,
    //   default: 0,
    //   min: [
    //     0,
    //     "Ce cours ne peut pas avoir de valeur negative pour les etudients",
    //   ],
    // },
    // cost: {
    //   type: Number,
    //   default: 0,
    //   min: [0, "Ce cours ne peut pas avoir un coût négatif"],
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
