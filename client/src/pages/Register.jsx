import { Link } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      setSuccess("Registration successful! Please login.");

     
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] pt-16 bg-[#F5EFE6] flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        <h1 className="text-2xl font-bold text-center text-[#2B1B14] mb-2">
          A Fresh Cup Awaits ☕
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Create your CoffeeStack account
        </p>

        {/* SUCCESS MESSAGE */}
        {success && (
          <div className="mb-4 bg-green-100 text-green-700 px-4 py-2 rounded-md text-sm text-center">
            {success}
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm text-center">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#C8A97E]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#C8A97E]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#C8A97E]"
            />
          </div>

          <button className="btn-primary w-full">
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#C8A97E] font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
