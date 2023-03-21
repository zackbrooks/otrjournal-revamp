const { Company, validate } = require("../../../models/Company");
import { formatErrors } from "@/db/utils";
import connectDB from "../../../db/connect";

export default async function oneCompany(req, res) {
  const { companyId } = req.query;
  const { method } = req;
  await connectDB();
  if (method === "GET") {
    try {
      const company = await Company.findById(companyId);
      res.json(company);
    } catch (err) {
      res.status(400).send({ error: err.errors[field].message });
    }
  } else if (method === "DELETE") {
    try {
      await Company.findOneAndDelete({ _id: companyId });
      res.status(201).json({ message: "Deleted Company" });
    } catch (error) {
      res.status(400).send("Deletion failed");
    }
  } else if (method === "POST") {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
      await Company.validate(req.body);
      await Company.findOneAndUpdate(
        { _id: companyId },
        {
          $set: {
            name: req.body.name,
            userId: req.body.id,
            rating: req.body.rating,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            notes: req.body.notes,
            routing: req.body.routing,
            location: req.body.location,
            type: req.body.type,
          },
        }
      );
      res.json({ message: "Company updated" });
    } catch (err) {
      res.status(400).send(formatErrors(err.errors, "mongo"));
    }
  } else {
    res.status(404).send("Unknown enpoint");
  }
}
