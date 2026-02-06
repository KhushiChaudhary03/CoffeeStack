import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { cartCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-[#2B1B14] text-white fixed w-full top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          CoffeeStack
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">

          {/* USER NAV */}
          {!isAdmin && (
            <>
              <Link to="/" className="hover:text-[#C8A97E]">Home</Link>
              <Link to="/menu" className="hover:text-[#C8A97E]">Menu</Link>
              {isAuthenticated && (
                <>
                  <Link to="/orders" className="hover:text-[#C8A97E]">Orders</Link>
                  <Link to="/cart" className="hover:text-[#C8A97E]">
                    Cart ({cartCount})
                  </Link>
                </>
              )}
            </>
          )}

          {/* ADMIN NAV */}
          {isAdmin && (
            <Link
              to="/admin"
              className="font-semibold text-[#C8A97E]"
            >
              Admin Dashboard
            </Link>
          )}

          {!isAuthenticated && (
            <Link to="/login" className="hover:text-[#C8A97E]">
              Login
            </Link>
          )}

          {isAuthenticated && (
            <div className="flex items-center gap-3">
              <span className="text-sm">{user?.name}</span>

              {isAdmin && (
                <span className="text-xs bg-[#C8A97E] text-[#2B1B14] px-2 py-0.5 rounded-full font-bold">
                  ADMIN
                </span>
              )}

              <button
                onClick={handleLogout}
                className="hover:text-[#C8A97E]"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
