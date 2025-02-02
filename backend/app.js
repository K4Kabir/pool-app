import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { connect } from "./utils/connection.js";
import User from "./models/User.js";
import Pool from "./models/Pool.js";

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
    return res.json("User checked").status(200);
  } catch (error) {
    return res.json(error).status(404);
  }
});

app.post("/create", async (req, res) => {
  const { title, description, validity, questions, clerk_id } = await req.body;

  try {
    const newPool = new Pool({
      title,
      description,
      validity,
      questions,
      clerk_id,
    });

    await newPool.save();
    res
      .status(201)
      .json({ message: "Pool created successfully", pool: newPool });
  } catch (error) {
    res.status(500).json({ message: "Error creating pool", error });
  }
});

app.get("/pools/:clerk_id", async (req, res) => {
  try {
    const { clerk_id } = req.params;
    const user = await User.findOne({ clerk_id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Assuming you have a Poll model and a relationship between User and Poll
    const polls = await Pool.find({ clerk_id: clerk_id });

    res.status(200).json(polls);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
app.listen(3000, () => {
  console.log("Server started on PORT 3000");
});
