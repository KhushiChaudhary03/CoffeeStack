import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Bill() {
  const { cartItems, totalPrice, clearCart } = useCart();

  const orderId = "ORD-" + Date.now();
  const orderDate = new Date().toLocaleString();

  return (
    <div className="min-h-screen bg-[#F5EFE6] px-6 md:px-20 py-20 text-[#2B1B14]">

      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center mb-4">
        Order Confirmed ☕
      </h1>

      <p className="text-center text-gray-600 mb-10">
        Thank you for ordering with CoffeeStack
      </p>

      {/* Bill Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div>
            <p className="font-semibold">Order ID</p>
            <p className="text-gray-600">{orderId}</p>
          </div>

          <div className="mt-2 md:mt-0">
            <p className="font-semibold">Date</p>
            <p className="text-gray-600">{orderDate}</p>
          </div>
        </div>

        {/* Items Header */}
        <div className="flex justify-between font-semibold border-b pb-2 mb-4">
          <span>Item</span>
          <span>Amount</span>
        </div>

        {/* Items */}
        <div className="space-y-3 mb-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between text-sm"
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <hr className="my-4" />

        {/* Total */}
        <div className="flex justify-between text-xl font-bold mb-6">
          <span>Total Paid</span>
          <span>₹{totalPrice}</span>
        </div>

        {/* Info */}
        <div className="bg-[#F5EFE6] rounded-lg p-4 text-sm text-gray-700 mb-8">
          ☕ Your coffee is being prepared fresh.  
          You will receive it shortly. Enjoy!
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4">
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
