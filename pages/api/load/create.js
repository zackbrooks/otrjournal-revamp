import connectDB from "../../../db/connect";
import Load from "../../../models/Load";

export default async function addLoad(req, res) {
  await connectDB();
  try {
    await Load.create({
      userId: req.body.id,
      bol: req.body.bol,
      name: req.body.name,
      originName: req.body.originName,
      originAddress: req.body.originAddress,
      originType: req.body.originType,
      originTrailer: req.body.originTrailer,
      originWindow: req.body.originWindow,
      originMiles: req.body.originMiles,
      destinationName: req.body.destinationName,
      destinationAddress: req.body.destinationAddress,
      destinationType: req.body.destinationType,
      destinationTrailer: req.body.destinationTrailer,
      destinationWindow: req.body.destinationWindow,
      destinationMiles: req.body.destinationMiles,
      payment: req.body.payment,
      notes: req.body.notes,
      completed: req.body.completed,
    });

    res.json({ message: "Load created" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
}
