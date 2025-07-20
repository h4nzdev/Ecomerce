import React, { useState } from "react";
import { User, Mail, Lock, Phone, MapPin, Eye, EyeOff } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password not match",
        text: "Try again",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    // Add registration logic here
    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        username,
        email,
        password,
        phone,
        address,
      });

      if (!response.data.success) {
        Swal.fire({
          icon: "error",
          title: "Email Existed",
          text: response.data.message,
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error.message);
    }

    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPhone("");
    setAddress("");
    setAgreeToTerms(false);
    // Redirect after successful registration
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 p-6 flex items-center justify-center">
      <div className="w-full md:max-w-160 max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Create Account
          </h1>
          <p className="text-slate-600">Join us and start shopping</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 space-y-6 
        grid md:grid-cols-2 grid-cols-1 gap-4"
        >
          <div className="md:col-span-1 col-span-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-md border border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 outline-none transition-colors"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          <div className="md:col-span-1 col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-md border border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 outline-none transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="md:col-span-1 col-span-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 rounded-md border border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 outline-none transition-colors"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="md:col-span-1 col-span-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 rounded-md border border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 outline-none transition-colors"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="col-span-2 flex flex-col gap-4">
            <div className="">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-md border border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 outline-none transition-colors"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className="w-full pl-10 pr-4 py-3 rounded-md border border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 outline-none transition-colors resize-none"
                  placeholder="Enter your full address"
                  required
                />
              </div>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="w-4 h-4 mt-1 text-slate-600 border-slate-300 rounded focus:ring-slate-500"
              />
              <label
                htmlFor="agreeToTerms"
                className="ml-3 text-sm text-slate-600"
              >
                I agree to the{" "}
                <button
                  type="button"
                  className="text-slate-700 hover:text-slate-900 font-medium underline"
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="text-slate-700 hover:text-slate-900 font-medium underline"
                >
                  Privacy Policy
                </button>
              </label>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-slate-700 text-white py-3 px-4 rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Create Account
            </button>

            <div className="text-center">
              <p className="text-sm text-slate-600">
                Already have an account?{" "}
                <Link to={"/login"}>
                  <button
                    type="submit"
                    className="text-slate-700 hover:text-slate-900 font-medium"
                  >
                    Sign in
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            By creating an account, you agree to our terms and conditions
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
