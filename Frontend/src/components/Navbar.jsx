import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-gradient-to-r from-rose-100 to-pink-200 border-b border-rose-200 fixed w-full top-0 z-40 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link 
              to="/" 
              className="flex items-center gap-2.5 hover:opacity-90 transition-all duration-200"
              title="Home"
            >
              <div className="size-9 rounded-lg bg-rose-100 flex items-center justify-center shadow-sm border border-rose-200">
                <MessageSquare className="w-5 h-5 text-rose-600" />
              </div>
              <h1 className="text-lg font-bold text-rose-700 tracking-wide">
              chitChat
              </h1>
            </Link>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-3 text-rose-700">
            <Link
              to="/settings"
              className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-rose-200 transition-all duration-200"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link 
                  to="/profile" 
                  className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-rose-200 transition-all duration-200"
                  title="Profile"
                >
                  <User className="size-5" />
                  <span className="hidden sm:inline font-medium">Profile</span>
                </Link>

                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-3 py-1 rounded-md bg-rose-400 hover:bg-rose-500 text-white shadow-sm transition-all duration-200"
                  title="Logout"
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline font-medium">Logout</span>
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;


