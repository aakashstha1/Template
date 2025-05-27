import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { ChevronLeft, Fingerprint, Mail } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const toggleView = () => setShowPassword(!showPassword);
  const { login, loading } = useAuth();

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-[400px] mx-auto shadow-lg p-8 rounded-md relative">
      <h1 className="text-3xl font-bold text-center mt-2">Welcome back</h1>
      <p className="text-gray-500 mb-6 mt-2 text-center text-sm">
        Please log in to access your account and continue your journey with us.
      </p>
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
      <p className="text-xs hover:underline cursor-pointer flex justify-end mr-2">
        {showPassword ? (
          <span onClick={toggleView}>hide</span>
        ) : (
          <span onClick={toggleView}>show</span>
        )}
      </p>
      <Button disabled={loading} className="w-full mt-8" onClick={handleSubmit}>
        {loading ? <HashLoader size={20} color="white" /> : " Login"}
      </Button>
      <p className="text-sm hover:underline cursor-pointer text-center mt-2">
        Forget password?
      </p>

      <p className="text-sm text-center mt-2">
        Don&apos;t have an account?{" "}
        <Link to="/auth/register">
          <span className="font-semibold hover:underline hover:text-blue-400 cursor-pointer">
            Sign Up
          </span>
        </Link>
      </p>
      <Button className="absolute top-2 left-2" onClick={() => navigate("/")}>
        <ChevronLeft />
      </Button>
    </div>
  );
}

export default Login;
