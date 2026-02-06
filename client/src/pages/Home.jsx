import { Link } from "react-router-dom";
import { useEffect } from "react";
import heroImage from "../assets/images/cover.jpg";

export default function Home() {

  // Scroll reveal animation logic
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#0f0a08] text-white">

      {/* =========================
          HERO SECTION
         ========================= */}
      <section
        className="relative h-screen bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Hero Content (LEFT ALIGNED) */}
        <div className="relative z-10 px-8 md:px-24 max-w-2xl text-left reveal">
          <p className="uppercase tracking-widest text-xs text-[#C8A97E] mb-3">
            Welcome to CoffeeStack
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Where Every Brew <br /> Meets Perfection
          </h1>

          <p className="text-gray-300 mb-8">
            Discover handcrafted coffee blends powered by smart ordering
            technology for a fast, seamless experience.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link to="/menu" className="btn-primary">
              Order Coffee
            </Link>

            <Link to="/login" className="btn-secondary">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* =========================
          ABOUT SECTION
         ========================= */}
      <section className="px-8 md:px-20 py-20 bg-[#1b120e] reveal">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Built for Coffee Lovers
          </h2>
          <p className="text-gray-400">
            CoffeeStack merges modern web technologies with rich coffee culture
            to deliver a smooth, fast, and reliable digital coffee experience.
          </p>
        </div>
      </section>

      {/* =========================
          FEATURES SECTION
         ========================= */}
      <section className="px-8 md:px-20 py-20 bg-[#F5EFE6] text-[#2B1B14]">
        <h2 className="text-3xl font-bold text-center mb-14 reveal">
          Why Choose CoffeeStack
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="card text-center reveal delay-1">
            <h3 className="text-xl font-semibold mb-3">
              ⚡ Lightning Fast
            </h3>
            <p className="text-gray-700">
              Optimized ordering flow that saves time with minimal steps.
            </p>
          </div>

          <div className="card text-center reveal delay-2">
            <h3 className="text-xl font-semibold mb-3">
              📱 Responsive Design
            </h3>
            <p className="text-gray-700">
              Works seamlessly across mobile, tablet, and desktop devices.
            </p>
          </div>

          <div className="card text-center reveal delay-3">
            <h3 className="text-xl font-semibold mb-3">
              🔐 Secure Platform
            </h3>
            <p className="text-gray-700">
              User authentication and data handled securely using JWT.
            </p>
          </div>
        </div>
      </section>

      <section className="px-8 md:px-20 py-20 bg-[#1b120e] reveal">
        <h2 className="text-3xl font-bold text-center mb-12">
          Most Loved Coffees
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {["Espresso", "Cappuccino", "Latte"].map((item) => (
            <div
              key={item}
              className="bg-[#2B1B14] rounded-xl p-6 text-center hover:-translate-y-2 transition"
            >
              <h3 className="text-lg font-semibold mb-3">{item}</h3>
              <p className="text-gray-400 mb-4">
                A customer favorite brewed to perfection.
              </p>
              <Link to="/menu" className="btn-primary w-full">
                View Menu
              </Link>
            </div>
          ))}
        </div>
      </section>

     
      <section className="px-8 md:px-20 py-20 bg-[#F5EFE6] text-[#2B1B14] reveal">
        <div className="max-w-4xl mx-auto text-center">
          <p className="italic text-lg mb-4">
            “CoffeeStack delivers both premium coffee and a smooth digital
            experience. Simple, fast, and reliable.”
          </p>
          <h4 className="font-semibold">— CoffeeStack User</h4>
        </div>
      </section>

      
      <section className="bg-[#2B1B14] px-8 md:px-20 py-20 text-center reveal">
        <h2 className="text-3xl font-bold mb-6">
          Ready for Your Next Coffee?
        </h2>
        <p className="text-gray-300 mb-8">
          Browse our menu and place your order in seconds.
        </p>
        <Link to="/menu" className="btn-primary">
          Get Started
        </Link>
      </section>

    </div>
  );
}
