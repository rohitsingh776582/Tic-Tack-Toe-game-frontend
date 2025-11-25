
import React, { useState } from "react";
import ticTac from "../assets/tic-tac.jpeg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      return setError("Email & Password required!");
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email: form.email,
        password: form.password,
      });

    
      localStorage.setItem("token", res.data.token);
      
      navigate("/tounament", { replace: true }); 
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Credentials!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 p-4">
      <div className="flex bg-white w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl flex-wrap">
        <div className="flex-1 min-w-[300px] bg-purple-500 flex items-center justify-center p-10">
          <img
            src={ticTac}
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>

  
        <div className="flex-1 min-w-[300px] p-10 flex flex-col gap-5">
          <h2 className="text-3xl font-semibold text-purple-600">
            Welcome Back
          </h2>
          <p className="text-gray-600">Login to your account</p>

          {error && <p className="text-red-600">{error}</p>}

          <div className="flex flex-col gap-6 mt-4">
            <input
              type="email"
              name="email"
              placeholder="write your email"
              className="border-b-2 border-gray-300 focus:border-purple-600 outline-none p-2 text-lg"
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border-b-2 border-gray-300 focus:border-purple-600 outline-none p-2 text-lg"
              onChange={handleChange}
            />

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full text-lg font-medium shadow-md hover:opacity-90 transition"
            >
              {loading ? "Processing..." : "Login"}
            </button>
          </div>

          <div className="text-center mt-4">
            <Link
              to="/signup"
              className="text-purple-600 block text-sm hover:underline"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
