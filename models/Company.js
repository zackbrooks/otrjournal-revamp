const mongoose = require("mongoose");
const Joi = require("joi");
const { isEmail } = require("validator");
import { Schema, model, models } from "mongoose";

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name."],
  },
  location: {
    type: String,
    required: [true, "Please enter a location."],
  },
  userId: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: false,
    default: "This is the default for this company",
  },
  rating: {
    type: Number,
    required: false,
    max: [10, "Max rating is 10."],
    min: [1, "Minimum rating is 1."],
  },
  routing: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
    validate: [isEmail, "Please enter valid email"],
  },
  type: {
    type: String,
    required: true,
    enum: [
      "Parking",
      "Repair/Service",
      "Truck Stop",
      "Truck Wash",
      "Food/Restaurant",
      "Hotel/Motel",
      "Shopping",
      "Pet Park",
      "Other",
      "Avoid",
      "Shipper",
      "Receiver",
    ],
  },
});

function validateCompany(company) {
  const schema = {
    name: Joi.string().required(),
    email: Joi.string().email(),
    phoneNumber: Joi.string(),
    userId: Joi.string().required(),
    rating: Joi.number().max(10).min(1),
    notes: Joi.string(),
    routing: Joi.string(),
    location: Joi.string().required(),
    type: Joi.string().required(),
  };

  const result = Joi.validate(company, schema, { abortEarly: false });
  return result;
}

const Company = models.Company || model("Company", CompanySchema);
export default Company;

module.exports.Company = models.Company || model("Company", CompanySchema);
module.exports.validate = validateCompany;
