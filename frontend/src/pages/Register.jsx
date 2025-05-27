import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { ChevronLeft, Fingerprint, Mail, User2 } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { toast } from "sonner";

function Register() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [showPassword, setShowPassword] = useState(false);
  const toggleView = () => setShowPassword(!showPassword);

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/auth/register`, inputs, {
        withCredentials: true,
      });
      toast.success(res?.data.message || "Registration succesfull");
      navigate("/auth/verify-email");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[400px] mx-auto shadow-lg p-8 rounded-md relative">
      <h1 className="text-3xl font-bold text-center">Create Account</h1>
      <p className="text-gray-500 mb-6 mt-2 text-center text-sm">
        Join us today! Please fill in your details to create an account.
      </p>

      {/* Name input */}
      <div className="flex items-center gap-2 mt-4">
        <User2 />
        <Input
          type="text"
          name="name"
          placeholder="Enter your Name"
          value={inputs.name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Email input */}
      <div className="flex items-center gap-2 mt-4">
        <Mail />
        <Input
          type="email"
          name="email"
          placeholder="Enter your Email"
          value={inputs.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Password input */}
      <div className="flex items-center gap-2 mt-4">
        <Fingerprint />
        <Input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Create your Password"
          value={inputs.password}
          onChange={handleChange}
          required
        />
      </div>

      {/* Show/hide toggle */}
      <p className="text-xs hover:underline cursor-pointer flex justify-end mr-2">
        {showPassword ? (
          <span onClick={toggleView}>hide</span>
        ) : (
          <span onClick={toggleView}>show</span>
        )}
      </p>

      <Button className="w-full mt-8" disabled={loading} onClick={handleSubmit}>
        {loading ? <HashLoader size={20} color="white" /> : "Sign Up"}
      </Button>

      <p className="text-sm text-center mt-2">
        Already have an account?{" "}
        <Link to="/auth/login">
          <span className="font-semibold hover:underline hover:text-blue-400 cursor-pointer">
            Login
          </span>
        </Link>
      </p>
      <Button className="absolute top-2 left-2" onClick={() => navigate("/")}>
        <ChevronLeft />
      </Button>
    </div>
  );
}

export default Register;
