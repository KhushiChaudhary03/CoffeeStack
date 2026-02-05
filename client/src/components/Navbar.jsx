import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { cartCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-[#2B1B14] text-white fixed w-full top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link to="/" className="text-xl font-bold">
          CoffeeStack
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>

          {isAuthenticated && <Link to="/orders">Orders</Link>}
          {isAuthenticated && <Link to="/cart">Cart ({cartCount})</Link>}

          {/* ADMIN */}
          {user?.role === "admin" && <Link to="/admin">Admin</Link>}

          {!isAuthenticated && <Link to="/login">Login</Link>}
          {isAuthenticated && (
            <button onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
}
