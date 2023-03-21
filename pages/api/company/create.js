const { Company, validate } = require("../../../models/Company");
import { formatErrors } from "@/db/utils";
import connectDB from "../../../db/connect";

export default async function addCompany(req, res) {
  const { companyId } = req.query;
  const { method } = req;
  if (method === "GET") {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(formatErrors(error.details));
    await connectDB();
    try {
      await Company.create({
        name: req.body.name,
        userId: req.body.userId,
        location: req.body.location,
        phoneNumber: req.body.phoneNumber,
        rating: req.body.rating,
        routing: req.body.routing,
        notes: req.body.notes,
        email: req.body.email,
        type: req.body.type,
      });

      res.json({ message: "Company created" });
    } catch (err) {
      res.status(400).send(formatErrors(err.errors, "mongo"));
    }
  } else {
    res.status(404).send("Unknown enpoint");
  }
}
