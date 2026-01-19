import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Bill() {
  const { cartItems, totalPrice, clearCart } = useCart();

  const orderId = "ORD-" + Date.now();

  return (
    <div className="min-h-screen bg-[#F5EFE6] px-6 md:px-20 py-20 text-[#2B1B14]">
      <h1 className="text-4xl font-bold text-center mb-10">
        Order Bill
      </h1>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <p className="mb-4 font-semibold">
          Order ID: <span className="font-normal">{orderId}</span>
        </p>

        {/* Items */}
        <div className="space-y-4 mb-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b pb-2"
            >
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>

              <p className="font-semibold">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between text-xl font-bold border-t pt-4">
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <Link
            to="/"
            onClick={clearCart}
            className="btn-primary text-center w-full"
          >
            Back to Home
          </Link>

          <Link
            to="/menu"
            onClick={clearCart}
            className="btn-secondary text-center w-full"
          >
            Order More
          </Link>
        </div>
      </div>
    </div>
  );
}
