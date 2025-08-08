import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Plus, X, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import AddContactForm from "../components/AddContactForm";


const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
    addContact,
    deleteContact,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState({ fullName: "", profilePic: "" });

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  const handleAddContact = async (e) => {
    e.preventDefault();
    if (!newContact.fullName.trim()) return toast.error("Name is required");
    try {
      await addContact(newContact);
      toast.success("Contact added!");
      setNewContact({ fullName: "", profilePic: "" });
      setShowAddContact(false);
      await getUsers();
    } catch {
      toast.error("Failed to add contact");
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    try {
      await deleteContact(id);
      toast.success("Contact deleted");
      await getUsers();
    } catch {
      toast.error("Failed to delete contact");
    }
  };

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <>
      <aside className="h-full w-20 lg:w-72 border-r border-pink-200 bg-white flex flex-col">
        <div className="border-b border-pink-200 w-full p-5 bg-pink-100">
          <div className="flex items-center justify-between text-pink-600">
            <div className="flex items-center gap-2">
              <Users className="size-6" />
              <span className="font-semibold hidden lg:block">Contacts</span>
            </div>
            <button
              onClick={() => setShowAddContact(true)}
              className="hidden lg:flex items-center gap-1 text-sm text-pink-600 hover:text-pink-800"
            >
              <Plus size={18} /> <span>Add</span>
            </button>
          </div>

          <div className="mt-3 hidden lg:flex items-center gap-2">
            <label className="cursor-pointer flex items-center gap-2">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="checkbox checkbox-sm border-pink-300 checked:bg-pink-500"
              />
              <span className="text-sm text-pink-700">Show online only</span>
            </label>
            <span className="text-xs text-pink-500">({onlineUsers.length - 1} online)</span>
          </div>
        </div>

        <div className="overflow-y-auto w-full py-3">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className={`w-full p-3 flex items-center gap-3 transition-all duration-150 rounded-md justify-between ${
                selectedUser?._id === user._id
                  ? "bg-pink-100 ring-1 ring-pink-400"
                  : "hover:bg-pink-50"
              }`}
            >
              <button
                onClick={() => setSelectedUser(user)}
                className="flex items-center gap-3 w-full"
              >
                <div className="relative">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.name}
                    className="size-12 object-cover rounded-full border-2 border-pink-300"
                  />
                  {onlineUsers.includes(user._id) && (
                    <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white" />
                  )}
                </div>
                <div className="hidden lg:block text-left min-w-0">
                  <div className="font-medium text-pink-700 truncate">{user.fullName}</div>
                  <div className="text-sm text-pink-400">
                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                  </div>
                </div>
              </button>
              <button
                onClick={() => handleDeleteContact(user._id)}
                className="text-pink-400 hover:text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <div className="text-center text-pink-400 py-4">No contacts found</div>
          )}
        </div>
      </aside>

      {/* Add Contact Modal */}
      {showAddContact && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl relative">
            <button
              onClick={() => setShowAddContact(false)}
              className="absolute top-2 right-2 text-pink-500 hover:text-pink-700"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-semibold text-pink-600 mb-4">Add New Contact</h3>
            <form onSubmit={handleAddContact} className="space-y-4">
              <div>
                <label className="text-sm text-pink-600">Full Name</label>
                <input
                  type="text"
                  value={newContact.fullName}
                  onChange={(e) =>
                    setNewContact({ ...newContact, fullName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="e.g. Aditi Sharma"
                />
              </div>
              <div>
                <label className="text-sm text-pink-600">Profile Pic URL</label>
                <input
                  type="text"
                  value={newContact.profilePic}
                  onChange={(e) =>
                    setNewContact({ ...newContact, profilePic: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Optional"
                />
              </div>
              <button
                type="submit"
                className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition w-full"
              >
                Add Contact
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
