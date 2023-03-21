const { Load, validate } = require("../../../models/Load");
import { formatErrors } from "@/db/utils";
import connectDB from "../../../db/connect";

export default async function addLoad(req, res) {
  const { loadId } = req.query;
  const { method } = req;
  if (method === "POST") {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(formatErrors(error.details));
    await connectDB();
    try {
      await Load.create({
        userId: req.body.userId,
        bol: req.body.bol,
        name: req.body.name,
        originName: req.body.originName,
        originAddress: req.body.originAddress,
        originType: req.body.originType,
        originTrailer: req.body.originTrailer,
        originWindow: req.body.originWindow,
        originMiles: req.body.originMiles,
        destinationName: req.body.destinationName,
        destinationAddress: req.body.destinationAddress,
        destinationType: req.body.destinationType,
        destinationTrailer: req.body.destinationTrailer,
        destinationWindow: req.body.destinationWindow,
        destinationMiles: req.body.destinationMiles,
        payment: req.body.payment,
        notes: req.body.notes,
        completed: req.body.completed,
      });

      res.json({ message: "Load created" });
    } catch (err) {
      res.status(400).send(formatErrors(err.errors, "mongo"));
    }
  } else {
    res.status(404).send("Unknown enpoint");
  }
}
