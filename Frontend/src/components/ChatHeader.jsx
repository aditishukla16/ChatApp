import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-4 border-b border-pink-200 bg-pink-50">
      <div className="flex items-center justify-between">
        {/* User Avatar & Info */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="w-10 h-10 rounded-full border-2 border-pink-300 object-cover"
            />
            {onlineUsers.includes(selectedUser._id) && (
              <span className="absolute bottom-0 right-0 size-2.5 bg-green-500 rounded-full ring-2 ring-white" />
            )}
          </div>

          <div className="text-left">
            <h3 className="font-semibold text-pink-700 leading-tight">{selectedUser.fullName}</h3>
            <p className="text-sm text-pink-500">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close Chat */}
        <button
          onClick={() => setSelectedUser(null)}
          className="text-pink-500 hover:text-pink-700 transition-colors"
        >
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
