import Contact from "../models/contact.model.js";
import User from "../models/user.model.js";

// Get all contacts for a user
export const getContacts = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    const contacts = await Contact.find({ owner: userId }).populate("contactUser", "name email");
    res.status(200).json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
