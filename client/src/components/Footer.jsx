import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#2B1B14] text-[#F1EDE9]">

      {/* Top Accent Divider */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#C8A97E] to-transparent"></div>

      {/* Main Footer */}
      <div className="px-8 md:px-20 py-20">
        <div className="grid md:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <p className="text-sm text-gray-300 leading-relaxed">
              CoffeeStack blends premium coffee culture with modern web
              technology to deliver a smooth and reliable digital experience.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-5 tracking-wide">
              Navigation
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link className="hover:text-[#C8A97E] transition" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#C8A97E] transition" to="/menu">
                  Menu
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#C8A97E] transition" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#C8A97E] transition" to="/register">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-5 tracking-wide">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>📧 coffeestack@gmail.com</li>
              <li>📞 +91 9XXXXXXXXX</li>
              <li>📍 India</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-5 tracking-wide">
              Stay Connected
            </h3>

            <p className="text-sm text-gray-300 mb-5">
              Subscribe for updates, offers & new brews.
            </p>

            <div className="flex group">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-l-lg text-black outline-none"
              />
              <button className="bg-[#3E2723] px-5 rounded-r-lg group-hover:bg-[#C8A97E] group-hover:text-[#2B1B14] transition">
                →
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#3E2723] py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} CoffeeStack • Crafted with ☕ & ❤️
      </div>
    </footer>
  );
}
