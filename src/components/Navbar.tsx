import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) =>
    location.pathname === path ? "font-extrabold" : "";

  return (
    <nav className="flex flex-col z-50">
      <div className="bg-[#E8E8E8] h-10 flex items-center p-1">
        <span className="text-center text-gray-500 mx-auto font-light text-xs">
          Follow me on Instagram! @always_xhyyy
        </span>
      </div>

      <div className="px-2 sm:px-5 bg-[#E8E8E8]">
        <div className="border-4 rounded-t-2xl border-[#BBBFCA]">
          <div className="bg-[#F4F4F2] h-16 flex justify-between px-6 md:px-10 lg:px-12 items-center border-4 border-white rounded-t-2xl relative">
            {/* Logo */}
            <div>
              <p className="text-2xl mb-[-8px] font-extrabold text-[#FEBA17]">
                <Link to="/" className={isActive("/")}>SayCheese!</Link>
              </p>
              <p className="text-xs">Photo-booth</p>
            </div>

            {/* Desktop Nav */}
            <ul className="hidden sm:flex text-base gap-3 md:gap-6 lg:gap-12">
              <li><Link to="/" className={isActive("/")}>Home</Link></li>
              <li><Link to="/About" className={isActive("/About")}>About</Link></li>
              <li><Link to="/PrivacyPolicy" className={isActive("/PrivacyPolicy")}>Privacy Policy</Link></li>
              <li><Link to="/Contact" className={isActive("/Contact")}>Contact</Link></li>
            </ul>

            {/* Mobile Toggle */}
            <div className="sm:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-black">
                {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
              <div className="absolute top-full left-0 w-full h-screen bg-[#F4F4F2] border-t border-white sm:hidden flex flex-col items-center py-3 z-50">
                <Link to="/" onClick={() => setIsOpen(false)} className={`py-1 ${isActive("/")}`}>Home</Link>
                <Link to="/About" onClick={() => setIsOpen(false)} className={`py-1 ${isActive("/About")}`}>About</Link>
                <Link to="/PrivacyPolicy" onClick={() => setIsOpen(false)} className={`py-1 ${isActive("/PrivacyPolicy")}`}>Privacy Policy</Link>
                <Link to="/Contact" onClick={() => setIsOpen(false)} className={`py-1 ${isActive("/Contact")}`}>Contact</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
