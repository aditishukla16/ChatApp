import axios from "axios";
import { useState } from "react";

export default function AddContact() {
  const [fullName, setFullName] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const handleAddContact = async () => {
    try {
      const res = await axios.post("http://localhost:5001/contacts/add", {
        userId: "674a7a52d3f93c27f890abcd", // yaha apne MongoDB me user ka _id dalna
        fullName,
        profilePic,
      });

      console.log("Contact Added:", res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Profile Pic URL (optional)"
        value={profilePic}
        onChange={(e) => setProfilePic(e.target.value)}
      />
      <button onClick={handleAddContact}>Add Contact</button>
    </div>
  );
}
