import connectDB from "../../../db/connect";
import Load from "../../../models/Load";

export default async function oneLoad(req, res) {
  const { loadId } = req.query;
  await connectDB();
  const { method } = req;
  console.log("method:", method);
  if (method === "GET") {
    try {
      const load = await Load.findById(loadId);
      res.json(load);
    } catch (err) {
      res.status(400).send({ error: err.errors[field].message });
    }
  } else if (method === "DELETE") {
    try {
      await Load.findOneAndDelete({ _id: loadId });
      res.status(201).json({ message: "Deleted Load" });
    } catch (error) {
      res.status(400).send("Deletion failed");
    }
  } else if (method === "POST") {
    try {
      await Load.validate(req.body);
      await Load.findOneAndUpdate(
        { _id: loadId },
        {
          $set: {
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
          },
        }
      );
      res.json({ message: "Load updated" });
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
