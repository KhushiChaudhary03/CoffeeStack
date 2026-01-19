// React
import { useState } from "react";

// Cart Context
import { useCart } from "../context/CartContext";

// Import coffee images
import espresso from "../assets/images/espresso.jpg";
import cappuccino from "../assets/images/cappuccino.jpg";
import latte from "../assets/images/latte.jpg";
import mocha from "../assets/images/mocha.jpg";
import coldcoffee from "../assets/images/coldcoffee.jpg";
import caramel from "../assets/images/caramel.jpg";

// Menu data
const coffeeMenu = [
  {
    id: 1,
    name: "Espresso",
    price: 120,
    description: "Strong and rich classic espresso.",
    image: espresso,
  },
  {
    id: 2,
    name: "Cappuccino",
    price: 150,
    description: "Perfect balance of coffee and milk foam.",
    image: cappuccino,
  },
  {
    id: 3,
    name: "Latte",
    price: 170,
    description: "Smooth espresso with steamed milk.",
    image: latte,
  },
  {
    id: 4,
    name: "Mocha",
    price: 180,
    description: "Coffee blended with chocolate flavor.",
    image: mocha,
  },
  {
    id: 5,
    name: "Cold Coffee",
    price: 160,
    description: "Chilled coffee for a refreshing taste.",
    image: coldcoffee,
  },
  {
    id: 6,
    name: "Caramel Latte",
    price: 190,
    description: "Sweet caramel mixed with creamy latte.",
    image: caramel,
  },
];

export default function Menu() {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState(null);

  const handleAddToCart = (coffee) => {
    addToCart(coffee);
    setAddedId(coffee.id);

    setTimeout(() => {
      setAddedId(null);
    }, 1200);
  };

  return (
    <div className="bg-[#F5EFE6] min-h-screen px-8 md:px-16 py-16">

      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center text-[#3E2723] mb-12">
        Freshly Brewed Happiness
      </h1>

      {/* Menu Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {coffeeMenu.map((coffee) => (
          <div
            key={coffee.id}
            className="card text-center transform hover:scale-105 transition duration-300"
          >
            {/* Image */}
            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg mb-4 bg-[#F5EFE6] flex items-center justify-center">
              <img
                src={coffee.image}
                alt={coffee.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Coffee Details */}
            <h2 className="text-xl font-bold text-[#3E2723] mb-2">
              {coffee.name}
            </h2>

            <p className="text-gray-600 text-sm mb-2">
              {coffee.description}
            </p>

            <p className="font-semibold mb-4">
              ₹{coffee.price}
            </p>

            {/* Add to Cart Button with Animation */}
            <button
              onClick={() => handleAddToCart(coffee)}
              className={`w-full py-2 rounded-full font-semibold transition-all duration-300
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
