import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

// images
import espresso from "../assets/images/espresso.jpg";
import cappuccino from "../assets/images/cappuccino.jpg";
import latte from "../assets/images/latte.jpg";
import mocha from "../assets/images/mocha.jpg";
import coldcoffee from "../assets/images/coldcoffee.jpg";
import caramel from "../assets/images/caramel.jpg";

const coffeeMenu = [
  { id: 1, name: "Espresso", price: 120, description: "Strong and rich classic espresso.", image: espresso },
  { id: 2, name: "Cappuccino", price: 150, description: "Perfect balance of coffee and milk foam.", image: cappuccino },
  { id: 3, name: "Latte", price: 170, description: "Smooth espresso with steamed milk.", image: latte },
  { id: 4, name: "Mocha", price: 180, description: "Coffee blended with chocolate flavor.", image: mocha },
  { id: 5, name: "Cold Coffee", price: 160, description: "Chilled coffee for a refreshing taste.", image: coldcoffee },
  { id: 6, name: "Caramel Latte", price: 190, description: "Sweet caramel mixed with creamy latte.", image: caramel },
];

export default function Menu() {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState(null);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleAddToCart = (coffee) => {
    if (!isLoggedIn) {
      navigate("/login"); // 🔐 BLOCK GUESTS
      return;
    }

    addToCart(coffee);
    setAddedId(coffee.id);

    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="bg-[#F5EFE6] min-h-screen px-8 md:px-16 py-16">
      <h1 className="text-4xl font-bold text-center text-[#3E2723] mb-12">
        Freshly Brewed Happiness
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {coffeeMenu.map((coffee) => (
          <div key={coffee.id} className="card text-center hover:scale-105 transition">
            <div className="aspect-[4/3] mb-4 flex items-center justify-center">
              <img src={coffee.image} alt={coffee.name} className="object-contain" />
            </div>

            <h2 className="text-xl font-bold mb-2">{coffee.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{coffee.description}</p>
            <p className="font-semibold mb-4">₹{coffee.price}</p>

            <button
              onClick={() => handleAddToCart(coffee)}
              className={`w-full py-2 rounded-full font-semibold transition-all
                ${
                  addedId === coffee.id
                    ? "bg-green-600 text-white scale-105"
                    : "btn-primary"
                }`}
            >
              {addedId === coffee.id ? "Added ✓" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
