import { Bell, User, BellDot, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import VisitCounter from '../v';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-zinc-950 text-zinc-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Desktop and Mobile layout */}
        <div className="flex justify-between items-center">
          {/* Logo or brand name can go here */}
          <div className="font-bold text-xl">
            <a href="/">ESTIN SRC</a>
          </div>

          {/* Desktop navigation - hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="hover:text-gray-300 transition-colors">
              Home
            </a>
            <a href="/courses" className="hover:text-gray-300 transition-colors">
              Courses
            </a>
            <a href="/qcm" className="hover:text-gray-300 transition-colors">
              Qcms
            </a>
            <a href="/books" className="hover:text-gray-300 transition-colors">
              Books
            </a>
            <VisitCounter />
          </div>

          {/* Right side navigation - visible on all screens */}
          <div className="flex items-center space-x-6">
            <button onClick={() => navigate("/notification")} className="text-red-600 hover:text-red-300 transition-colors">
              <BellDot size={20} />
            </button>
            <button onClick={() => navigate('/account')} className="hover:text-gray-300 transition-colors">
              <User size={20} />
            </button>
            {/* Hamburger menu button - visible only on mobile */}
            <button
              className="md:hidden text-zinc-50 hover:text-gray-300 focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu - shown when hamburger is clicked */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-2 border-t border-zinc-800">
            <div className="flex flex-col space-y-4">
              <a
                href="/"
                className="hover:text-gray-300 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="/courses"
                className="hover:text-gray-300 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </a>
              <a
                href="/qcm"
                className="hover:text-gray-300 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Qcms
              </a>
              <a
                href="/books"
                className="hover:text-gray-300 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Books
              </a>
              <div className="py-2">
                <VisitCounter />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

