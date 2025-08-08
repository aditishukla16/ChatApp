import express from "express";
import User from "../models/user.model.js";
import Contact from "../models/contact.model.js";

const router = express.Router();

// ➕ Add Contact
router.post("/add", async (req, res) => {
  const { userId, fullName, profilePic } = req.body;

  if (!userId || !fullName) {
    return res.status(400).json({ error: "User ID and name are required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const newContact = new Contact({
      fullName,
      profilePic,
      owner: userId
    });
    await newContact.save();

    user.contacts.push(newContact._id);
    await user.save();

    res.status(201).json(newContact);
  } catch (err) {
    console.error("Add Contact Error:", err);
    res.status(500).json({ error: "Failed to add contact" });
  }
});

// 🗑 Delete Contact
router.delete("/delete/:userId/:contactId", async (req, res) => {
  const { userId, contactId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.contacts.pull(contactId);
    await user.save();

    await Contact.findByIdAndDelete(contactId);

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    console.error("Delete Contact Error:", err);
    res.status(500).json({ error: "Failed to delete contact" });
  }
});

// 📜 Get All Contacts for a User
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("contacts");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user.contacts);
  } catch (err) {
    console.error("Get Contacts Error:", err);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

export default router;
