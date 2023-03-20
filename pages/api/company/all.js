import connectDB from "../../../db/connect";
import Company from "../../../models/Company";

export default async function allCompanies(req, res) {
  await connectDB();
  try {
    // if (!req.body.userId) throw Error("Access Denied");
    const allCompanies = await Company.find({
      userId: "63d48272c8ad1d722139ed3d",
    });

    res.send(allCompanies);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}
