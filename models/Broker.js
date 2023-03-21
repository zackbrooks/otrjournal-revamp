const mongoose = require("mongoose");
const Joi = require("joi");
const { isEmail } = require("validator");
import { Schema, model, models } from "mongoose";

const BrokerSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Please enter first name."],
  },
  lastName: {
    type: String,
    required: [true, "Please enter last name."],
  },
  email: {
    type: String,
    required: [true, "Please enter email."],
    validate: [isEmail, "Please enter valid email"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please enter a phone number."],
  },
  userId: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
    max: [10, "Max rating is 10."],
    min: [1, "Minimum rating is 1."],
  },
  notes: {
    type: String,
    required: false,
  },
});

function validateBroker(broker) {
  const schema = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    userId: Joi.string().required(),
    rating: Joi.number().max(10).min(1),
    notes: Joi.string(),
  };
  const result = Joi.validate(broker, schema, { abortEarly: false });
  return result;
}

const Broker = models.Broker || model("Broker", BrokerSchema);
module.exports.Broker = models.Broker || model("Broker", BrokerSchema);
module.exports.validate = validateBroker;
