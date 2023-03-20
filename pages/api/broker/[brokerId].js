import connectDB from "../../../db/connect";
import Broker from "../../../models/Broker";

export default async function allBrokers(req, res) {
  const { brokerId } = req.query;
  await connectDB();
  const { method } = req;
  console.log("method:", method);
  if (method === "GET") {
    try {
      const broker = await Broker.findById(brokerId);
      res.json(broker);
    } catch (err) {
      res.status(400).send({ error: err.errors[field].message });
    }
  } else if (method === "DELETE") {
    try {
      await Broker.findOneAndDelete({ _id: brokerId });
      res.status(201).json({ message: "Deleted Broker" });
    } catch (error) {
      res.status(400).send("Deletion failed");
    }
  } else if (method === "POST") {
    try {
      await Broker.validate(req.body);
      await Broker.findOneAndUpdate(
        { _id: brokerId },
        {
          $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userId: "63d48272c8ad1d722139ed3d",
            rating: req.body.rating,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            notes: req.body.notes,
          },
        }
      );
      res.json({ message: "broker updated" });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(400).send("Action not available");
  }
}
