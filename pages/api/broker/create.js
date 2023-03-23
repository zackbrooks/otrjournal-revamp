const { Broker, validate } = require("../../../models/Broker");
import { formatErrors } from "@/db/utils";
import connectDB from "../../../db/connect";

export default async function addBroker(req, res) {
  console.log("GOT HERE AT ADD BROKER");
  const { method } = req;
  if (method === "POST") {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(formatErrors(error.details));
    await connectDB();
    try {
      await Broker.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userId: req.body.userId,
        rating: req.body.rating,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        notes: req.body.notes,
      });
      console.log("document created");
      res.send("Broker created");
    } catch (err) {
      res.status(400).send(formatErrors(err.errors, "mongo"));
    }
  } else {
    res.status(404).send("Unknown endpoint");
  }
}
