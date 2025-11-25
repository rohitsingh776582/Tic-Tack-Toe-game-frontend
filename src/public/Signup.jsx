import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ticTac from "../assets/tic-tac.jpeg";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      return setError("All fields are required!");
    }

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match!");
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
      });

      alert("Signup successful!");
      navigate("/tounament", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#AEC6D3] flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-3xl max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* LEFT SIDE */}
        <div className="bg-[#E4EDF3] flex flex-col items-center justify-center p-10 text-center">
          <img src={ticTac} alt="Illustration" className="w-200 mb-6" />

          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome to the Tic-Tac-Toe Game — let the fun begin!
          </h2>

          <p className="text-gray-600 mt-3">
            Tic-Tac-Toe is a classic strategy game played between two players...
          </p>
        </div>

        {/* RIGHT SIDE form */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign Up</h2>

          {error && <p className="text-red-600 mb-3">{error}</p>}

          <div className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="border rounded-full px-4 py-3 w-full outline-none"
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="border rounded-full px-4 py-3 w-full outline-none"
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border rounded-full px-4 py-3 w-full outline-none"
              onChange={handleChange}
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="border rounded-full px-4 py-3 w-full outline-none"
              onChange={handleChange}
            />

            <button
              className="bg-yellow-400 font-semibold py-3 rounded-full text-lg"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Processing..." : "Sign Up"}
            </button>

            <p className="text-center text-gray-600 mt-4">
              Already have an account?
              <Link to="/" className="text-purple-600 hover:underline ml-2">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
