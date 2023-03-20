import connectDB from "../../../db/connect";
import Company from "../../../models/Company";

export default async function addCompany(req, res) {
  await connectDB();
  try {
    await Company.create({
      name: req.body.name,
      userId: req.body.id,
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
    console.log(err);
    res.status(400).send({ error: err.message });
  }
}
