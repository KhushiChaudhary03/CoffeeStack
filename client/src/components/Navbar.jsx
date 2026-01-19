import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartCount } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#2B1B14] text-white fixed w-full top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          CoffeeStack
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="hover:text-[#C8A97E]">Home</Link>
          <Link to="/menu" className="hover:text-[#C8A97E]">Menu</Link>

          
          <Link to="/orders" className="hover:text-[#C8A97E]">
            Orders
          </Link>

          {/* Cart with badge */}
          <Link to="/cart" className="relative hover:text-[#C8A97E]">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-[#C8A97E] text-[#2B1B14] text-xs rounded-full px-1.5">
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/login" className="hover:text-[#C8A97E]">
            Login
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#2B1B14] border-t border-[#3E2723] px-6 py-4 space-y-4">
          <Link onClick={() => setOpen(false)} to="/" className="block">
            Home
          </Link>

          <Link onClick={() => setOpen(false)} to="/menu" className="block">
            Menu
          </Link>

          
          <Link onClick={() => setOpen(false)} to="/orders" className="block">
            Orders
          </Link>

          <Link onClick={() => setOpen(false)} to="/cart" className="block">
            Cart ({cartCount})
          </Link>

          <Link onClick={() => setOpen(false)} to="/login" className="block">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
