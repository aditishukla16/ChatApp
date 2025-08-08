// routes/userRoutes.js
import express from "express";
import User  from "../models/user.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

export default router;
