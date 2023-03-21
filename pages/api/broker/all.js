const { Broker, validate } = require("../../../models/Broker");
import connectDB from "../../../db/connect";

export default async function allBrokers(req, res) {
  const { method } = req;
  if (method === "GET") {
    await connectDB();
    try {
      // if (!req.body.userId) throw Error("Access Denied");
      const allBrokers = await Broker.find({
        userId: "63d48272c8ad1d722139ed3d",
      });

      res.send(allBrokers);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  } else {
    res.status(404).send("Unknown enpoint");
  }
}
