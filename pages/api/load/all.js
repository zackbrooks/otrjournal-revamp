import connectDB from "../../../db/connect";
import Load from "../../../models/Load";

export default async function allLoads(req, res) {
  await connectDB();
  try {
    // if (!req.body.userId) throw Error("Access Denied");
    const allLoads = await Load.find({
      userId: "63d48272c8ad1d722139ed3d",
    });

    res.send(allLoads);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}
