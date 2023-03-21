const { Load, validate } = require("../../../models/Load");
import { formatErrors } from "@/db/utils";
import connectDB from "../../../db/connect";

export default async function allLoads(req, res) {
  const { loadId } = req.query;
  const { method } = req;
  if (method === "GET") {
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
  } else {
    res.status(404).send("Unknown enpoint");
  }
}
