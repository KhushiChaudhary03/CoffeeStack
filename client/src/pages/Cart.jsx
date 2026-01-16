import { Link } from "react-router-dom";
import { useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Espresso", price: 120, quantity: 1 },
    { id: 2, name: "Cappuccino", price: 150, quantity: 2 },
  ]);

  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#F5EFE6] px-6 md:px-20 py-20 text-[#2B1B14]">

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Your Cart 
      </h1>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-6">Your cart is empty.</p>
            <Link to="/menu" className="btn-primary">
              Browse Menu
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
                >
                  {/* Item Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      ₹{item.price} per cup
                    </p>
                  </div>

                  {/* Quantity Control */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="w-9 h-9 rounded-full border border-[#3E2723] hover:bg-[#3E2723] hover:text-white transition"
                    >
                      −
                    </button>

                    <span className="font-semibold w-6 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="w-9 h-9 rounded-full border border-[#3E2723] hover:bg-[#3E2723] hover:text-white transition"
                    >
                      +
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="font-semibold">
                    ₹{item.price * item.quantity}
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-sm text-gray-400 hover:text-red-600 transition"
                  >
                    Remove ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6 border-t pt-6">
              <Link to="/menu" className="btn-secondary">
                ← Continue Shopping
              </Link>

              <div className="text-right">
                <p className="text-lg mb-3">
                  Total Amount:
                  <span className="font-bold ml-2">
                    ₹{totalPrice}
                  </span>
                </p>

                <button className="btn-primary px-8">
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
