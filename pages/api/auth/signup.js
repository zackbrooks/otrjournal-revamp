const { User, validate } = require("../../../models/User");
import { formatErrors } from "@/db/utils";
// import { method } from "lodash";
import connectDB from "../../../db/connect";

export default async function signUp(req, res) {
  const { email, password } = req.body;
  const { error } = validate(req.body);
  const { method } = req;
  if (error) return res.status(400).send(error.details[0].message);
  if (method === "POST") {
    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .send("Account with that email address already exists");
    try {
      const user2 = await User.create({
        email,
        password,
      });
      res.send("user created");
      //   res.send(_.pick(user2, ["_id", "email"]));
    } catch (err) {
      res.status(400).send(formatErrors(err.errors, "mongo"));
    }
  } else {
    res.status(404).send("Unknown enpoint");
  }
}
