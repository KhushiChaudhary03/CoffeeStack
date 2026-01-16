import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Login() {
  // ✅ State (ONLY at top level)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setMessage("Login successful! ☕");
        setIsError(false);
        setTimeout(() => {
          navigate("/menu");
        }, 1200);
      } else {
        setMessage(data.message || "Invalid credentials");
        setIsError(true);
      }
    } catch (error) {
      setMessage("Server error. Please try again.");
      setIsError(true);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] pt-16 bg-[#F5EFE6] flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        <h1 className="text-2xl font-bold text-center text-[#2B1B14] mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Login to continue your CoffeeStack journey
        </p>

        {/* ✅ Website notification */}
        {message && (
          <div
            className={`mb-4 text-center text-sm px-4 py-2 rounded-lg ${
              isError
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#C8A97E]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#C8A97E]"
            />
          </div>

          <button className="btn-primary w-full">
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-[#C8A97E] font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
