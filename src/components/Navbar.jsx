import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../assets/MTClogo.svg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/events", label: "Events" },
    { path: "/media", label: "Media" },
    { path: "/partners", label: "Partners" },
  ];

  return (
    <nav className="w-full bg-black/20 backdrop-blur-lg text-white border-b border-divider sticky top-0 z-[1000] supports-backdrop-blur:bg-black/60">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="MTC Logo" className="w-9 h-9" />
          <span className="font-bold text-xl">MTC</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-semibold transition-colors px-3 py-2 rounded-lg ${
                location.pathname === item.path
                  ? "text-stone-400 bg-white/5"
                  : "text-white hover:text-stone-400 hover:bg-white/5"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      {menuOpen && (
        <>
          {/* Backdrop blur overlay */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-lg z-[999] sm:hidden"
            onClick={() => setMenuOpen(false)}
            style={{ top: "73px" }} // Start below navbar
          />

          {/* Menu content */}
          <div
            className="fixed left-0 right-0 bg-black/90 backdrop-blur-3xl border-divider z-[1000] sm:hidden h-screen"
            // style={{ top: "73px" }}
          >
            <div className="px-6 py-8">
              <div className="flex flex-col gap-6">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`text-xl font-medium transition-colors py-3 px-4 rounded-lg ${
                      location.pathname === item.path
                        ? "text-stone-400 bg-white/10"
                        : "text-white hover:text-stone-400 hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
