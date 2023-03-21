const { Company, validate } = require("../../../models/Company");
import connectDB from "../../../db/connect";

export default async function allCompanies(req, res) {
  const { companyId } = req.query;
  const { method } = req;
  if (method === "GET") {
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
  } else {
    res.status(400).send("Action not available");
  }
}
