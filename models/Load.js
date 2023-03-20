const mongoose = require("mongoose");
// const Joi = require("joi");
import { Schema, model, models } from "mongoose";

const LoadSchema = new mongoose.Schema({
  bol: {
    type: String,
    required: [true, "Please enter bill of lading."],
  },
  name: {
    type: String,
    required: false,
  },
  originName: {
    type: String,
    required: [true, "Please enter a name for origin."],
  },
  originAddress: {
    type: String,
    required: [true, "Please enter an address for origin."],
  },
  originWindow: {
    type: Array,
    required: [true, "Please enter a pick up start date for origin."],
  },

  originMiles: {
    type: Number,
    required: false,
  },
  originTrailer: {
    type: String,
    required: [true, "Please enter a trailer id for origin."],
  },
  originType: {
    type: String,
    required: false,
    enum: ["Live", "Drop and Hook"],
  },
  destinationName: {
    type: String,
    required: [true, "Please enter a name for destination."],
  },
  destinationAddress: {
    type: String,
    required: [true, "Please enter an address for destination."],
  },
  destinationWindow: {
    type: Array,
    required: [true, "Please enter a pick up start date for destination."],
  },
  destinationMiles: {
    type: Number,
    required: false,
  },
  destinationTrailer: {
    type: String,
    required: [true, "Please enter a location for destination."],
  },

  payment: {
    type: Number,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  destinationType: {
    type: String,
    required: false,
    enum: ["Live", "Drop and Hook"],
  },
  userId: {
    type: String,
    required: true,
  },
});

// function validateLoad(load) {
//   const schema = {
//     bol: Joi.string().required(),
//     name: Joi.string(),
//     payment: Joi.number(),
//     notes: Joi.string(),
//     completed: Joi.boolean(),
//     userId: Joi.string().required(),
//     originName: Joi.string().required(),
//     originAddress: Joi.string().required(),
//     originTrailer: Joi.string().required(),
//     originWindow: Joi.array().required(),
//     originMiles: Joi.number(),
//     originType: Joi.string().required(),
//     destinationName: Joi.string().required(),
//     destinationAddress: Joi.string().required(),
//     destinationTrailer: Joi.string().required(),
//     destinationWindow: Joi.array().required(),
//     destinationMiles: Joi.number(),
//     destinationType: Joi.string().required(),
//   };
//   return (result = Joi.validate(load, schema));
// }
// module.exports.Load = mongoose.model("Load", LoadSchema);
// module.exports.validate = validateLoad;
const Load = models.Load || model("Load", LoadSchema);
export default Load;
