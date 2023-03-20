// import connectDB from "@/db/connect";
import connectDB from "../../../db/connect";
import Broker from "../../../models/Broker";

export default async function addBroker(req, res) {
  await connectDB();
  try {
    await Broker.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userId: req.body.userId,
      rating: req.body.rating,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      notes: req.body.notes,
    });
    console.log("document created");
    res.send("Broker created");
  } catch (err) {
    // formatErrors(err.errors, "mongo");
    // res.status(400).send({ error: formatErrors(err.errors, "mongo") });
    // console.log("ERROR", err)
    res.status(400).send(err);
  }
}
