import { Bell, User, BellDot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VisitCounter from '../v';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-[#09090B] text-[#FAFAFA] p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left side navigation */}
        <div className="flex items-center space-x-8">
          <a href="/" className="hover:text-gray-300 transition-colors">
            Home
          </a>
          <a href="/courses" className="hover:text-gray-300 transition-colors">
            Courses
          </a>
          <a href="/books" className="hover:text-gray-300 transition-colors">
            Books
          </a>
          <VisitCounter />
        </div>

        {/* Right side navigation */}
        <div className="flex items-center space-x-6">
          <button onClick={() => navigate("/notification")} className="text-red-600 hover:text-red-300 transition-colors">
            <BellDot size={20} />
          </button>
          <button onClick={() => navigate('/account')} className="hover:text-gray-300 transition-colors">
            <User size={20} /> 
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;