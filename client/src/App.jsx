import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import Bill from "./pages/Bill";
import Orders from "./pages/Orders";
function App() {
  return (
    <CartProvider>
      <Navbar />

      <div className="pt-16">
        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/menu" element={<Menu />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/bill" element={<Bill />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/orders" element={<Orders />} />

</Routes>

      </div>

      <Footer />
    </CartProvider>
  );
}

export default App;
