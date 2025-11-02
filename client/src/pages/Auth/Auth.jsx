import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../../apiClinet";

function Auth({ type }) {
  let [loading, setLoading] = useState(false);
  let [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (type === "signup" && formData.password !== formData.confirmPassword) {
      toast.error("Passowrd Doesn't Match");
      return;
    }
    setLoading(true);
    try {
      const endpoint = type === "signup" ? "/auth/signup" : "/auth/login";
      const response = apiClient.post(endpoint, formData);
      toast.success(response.data.message || "Success");
      if (type === "signup") {
        navigate("/login");
      }
      if (type === "/login") {
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-800 text-white">
        <div className="bg-white text-gray-900 p-8 rounded-lg shadow-white shadow-2xl w-full max-w-md m-2">
          <h2 className="text-3xl font-extrabold text-center mb-6">
            {type === "signup" ? "SignUp VibeCall" : "Login VibeCall"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {type === "signup" && (
              <>
                <div className="flex items-center border rounded-lg p-2 bg-gray-100">
                  <FaUser className="text-purple-500 mr-2" />
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    className="w-full bg-transparent focus:outline-none"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex items-center border rounded-lg p-2 bg-gray-100">
                  <FaUser className="text-purple-500 mr-2" />
                  <input
                    type="text"
                    name="username"
                    placeholder="Username (e.g., Jondo99)"
                    className="w-full bg-transparent focus:outline-none"
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}
            <div className="flex items-center border rounded-lg p-2 bg-gray-100">
              <FaEnvelope className="text-purple-500 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full bg-transparent focus:outline-none"
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center border rounded-lg p-2 bg-gray-100">
              <FaLock className="text-purple-500 mr-2" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full bg-transparent focus:outline-none"
                onChange={handleChange}
                required
              />
            </div>
            {type === "signup" && (
              <div className="flex items-center border rounded-lg p-2 bg-gray-100">
                <FaLock className="text-purple-500 mr-2" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full bg-transparent focus:outline-none"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {type === "signup" && (
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Male
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Female
                </label>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-purple-500 text-white py-2 rounded-lg hover:opacity-90 transition duration-300"
              disabled={loading}
            >
              {loading ? "Loading..." : type === "signup" ? "Sign Up" : "Login"}
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            {type === "signup" ? (
              <>
                Already have an account?{" "}
                <Link to="/login">
                  <span className="underline text-purple-500">Login</span>
                </Link>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <Link to="/signup">
                  <span className="underline text-purple-500">Register</span>
                </Link>
              </>
            )}
          </p>
        </div>
        <Toaster position="top-center" />
      </div>
    </>
  );
}

export default Auth;
