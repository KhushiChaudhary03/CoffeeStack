import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


export default function Cart() {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeItem,
    totalPrice,
  } = useCart();
  const navigate = useNavigate();

const handleCheckout = async () => {
  const token = localStorage.getItem("token");
  console.log("TOKEN SENT:", token);
  if (!token) {
    navigate("/login");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, //  SEND TOKEN
      },
      body: JSON.stringify({
        items: cartItems,
        totalAmount: totalPrice,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      navigate("/bill", { state: { orderId: data.orderId } });
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
  }
};



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
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center justify-between gap-6 border rounded-xl p-4"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      ₹{item.price} per cup
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button onClick={() => decreaseQty(item.id)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>

                  <div className="font-semibold">
                    ₹{item.price * item.quantity}
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6 border-t pt-6">
  <Link to="/menu" className="btn-secondary">
    ← Continue Shopping
  </Link>

  <div className="text-right">
    <p className="text-xl font-bold mb-3">
      Total: ₹{totalPrice}
    </p>

    
    <button
      onClick={handleCheckout}
      className="btn-primary px-8"
    >
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
