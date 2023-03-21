const { Broker, validate } = require("../../../models/Broker");
import { formatErrors } from "@/db/utils";
import connectDB from "../../../db/connect";

export default async function allBrokers(req, res) {
  const { brokerId } = req.query;
  await connectDB();
  const { method } = req;
  if (method === "GET") {
    try {
      const broker = await Broker.findById(brokerId);
      res.json(broker);
    } catch (err) {
      res.status(400).send({ error: err.errors[field].message });
    }
  } else if (method === "DELETE") {
    try {
      await Broker.findOneAndDelete({ _id: brokerId });
      res.status(201).json({ message: "Deleted Broker" });
    } catch (error) {
      res.status(400).send("Deletion failed");
    }
  } else if (method === "POST") {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
      await Broker.validate(req.body);
      await Broker.findOneAndUpdate(
        { _id: brokerId },
        {
          $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userId: req.body.userId,
            rating: req.body.rating,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            notes: req.body.notes,
          },
        }
      );
      res.json({ message: "broker updated" });
    } catch (err) {
      res.status(400).send(formatErrors(err.errors, "mongo"));
    }
  } else {
    res.status(400).send("Action not available");
  }
}
