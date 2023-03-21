const { User, validate } = require("../../../models/User");
import { formatErrors } from "@/db/utils";
// import { method } from "lodash";
import connectDB from "../../../db/connect";

export default async function signUp(req, res) {
  const { email, password } = req.body;
  const { error } = validate(req.body);
  const { method } = req;
  if (error) return res.status(401).send("Invalid email or password.");
  if (method === "POST") {
    connectDB();
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).send("Invalid email or password.");
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).send("Invalid email or password.");
    }
    const token = user.createJWT();
    res.send({ id: user._id, token });
  } else {
    res.status(404).send("Unknown enpoint");
  }
}
