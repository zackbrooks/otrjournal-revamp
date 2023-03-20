import connectDB from "../../../db/connect";
import Company from "../../../models/Company";

export default async function oneCompany(req, res) {
  const { companyId } = req.query;
  await connectDB();
  const { method } = req;
  console.log("method:", method);
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
      //   let errArr = [];
      //   for (field in err.errors) {
      //     errArr.push(err.errors[field].message);
      //   }
      res.status(400).send({ error: err.message });
      //   console.log(err);
    }
  } else {
    res.status(400).send("Action not available");
  }
}
