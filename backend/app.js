import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { connect } from "./utils/connection.js";
import User from "./models/User.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
connect();

app.post("/check-user", async (req, res) => {
  try {
    const { clerk_id, fullName } = await req.body;
    if (!clerk_id) {
      return res.send("User not found").status(404);
    }
    const check = await User.findOne({ clerk_id });
    if (!check) {
      await User.create({
        clerk_id,
        username: fullName,
      });
    }
    return res.send("User checked").status(200);
  } catch (error) {
    return res.send(error).status(404);
  }
});

app.listen(3000, () => {
  console.log("Server started on PORT 3000");
});
