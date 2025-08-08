import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-pink-300 to-pink-400">
      <div className="w-[90%] md:w-[70%] lg:w-[60%] xl:w-[55%] 2xl:w-[45%] grid grid-cols-1 lg:grid-cols-2 bg-white shadow-lg rounded-3xl overflow-hidden">
        
        {/* Left side - Form */}
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-2">Hello!</h2>
          <p className="text-center text-gray-500 mb-6">Sign into your account</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="E-mail"
                className="w-full pl-10 pr-4 py-2 rounded-full shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-10 pr-10 py-2 rounded-full shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm text-gray-500 px-1">
              <label className="flex items-center gap-1">
                <input type="checkbox" className="checkbox checkbox-xs" />
                Remember me
              </label>
              <span className="hover:underline cursor-pointer text-pink-500">Forgot password?</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold transition"
            >
              {isLoggingIn ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin h-4 w-4" />
                  Loading...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Create Account */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-pink-500 hover:underline">
              Create
            </Link>
          </p>
        </div>

        {/* Right side - Welcome Message */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-pink-400 to-pink-500 text-white px-6 py-10">
          <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-center text-sm">
            "It’s good to have you back. Your conversations, your people, and your peace of mind — all in one place."


          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
