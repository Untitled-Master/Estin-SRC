import { useState, useEffect } from 'react';
import { Home, HelpCircle, ArrowRight } from 'lucide-react';
import VisitCounter from '../components/v'; 

const NotFound = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-[#09090B] select-none">
      <VisitCounter />
      {/* Interactive Background */}
      <div 
        className="absolute inset-0 opacity-30 transition-all duration-500" 
        style={{
          background: `radial-gradient(
            circle at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(250,250,250,0.05) 0%, 
            rgba(250,250,250,0.01) 50%, 
            transparent 70%
          )`
        }}
      />

      {/* Geometric Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[1, 2, 3].map((item) => (
          <div 
            key={item}
            className={`absolute bg-[#FAFAFA]/5 rounded-full blur-2xl transform transition-all duration-1000 ${
              isLoaded 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-50'
            }`}
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 flex items-center justify-center">
        <div className="text-center">
          {/* ESTIN Branding */}
          <div 
            className={`mb-8 opacity-0 transform transition-all duration-700 ${
              isLoaded 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-4'
            }`}
          >
            <div className="flex justify-center items-center space-x-2">
              <div className="text-sm font-medium tracking-wider text-[#FAFAFA]/70 uppercase">
                ESTIN
              </div>
              <div className="h-4 w-px bg-[#FAFAFA]/20"></div>
              <div className="text-xs text-[#FAFAFA]/50">Digital Excellence</div>
            </div>
          </div>

          {/* Animated 404 */}
          <div 
            className={`relative mb-6 opacity-0 transform transition-all duration-1000 delay-200 ${
              isLoaded 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-6'
            }`}
          >
            <h1 className="text-[12rem] md:text-[16rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FAFAFA]/30 to-[#FAFAFA]/70 select-none">
              404
            </h1>
            <div className="absolute inset-0 text-[12rem] md:text-[16rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FAFAFA] to-[#FAFAFA]/50 animate-pulse opacity-20 blur-sm">
              404
            </div>
          </div>

          {/* Message and Description */}
          <div 
            className={`mb-10 opacity-0 transform transition-all duration-1000 delay-300 ${
              isLoaded 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-6'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#FAFAFA] mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg md:text-xl text-[#FAFAFA]/80 max-w-xl mx-auto">
              The digital path you're seeking seems to have wandered off. Let's guide you back to safety.
            </p>
          </div>

          {/* Action Buttons */}
          <div 
            className={`flex justify-center space-x-4 opacity-0 transform transition-all duration-1000 delay-500 ${
              isLoaded 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-6'
            }`}
          >
            <a 
              href="/" 
              className="group inline-flex items-center px-6 py-3 bg-[#FAFAFA] text-[#09090B] rounded-lg hover:bg-[#FAFAFA]/90 transition-all duration-300"
            >
              <Home className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Return Home
              <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
            </a>
            
            <a 
              href="/contact" 
              className="group inline-flex items-center px-6 py-3 border border-[#FAFAFA]/20 text-[#FAFAFA] rounded-lg hover:bg-[#FAFAFA]/10 transition-all duration-300"
            >
              <HelpCircle className="mr-2 h-5 w-5 group-hover:rotate-6 transition-transform" />
              Contact Support
            </a>
          </div>

          {/* Footer Branding */}
          <div 
            className={`absolute bottom-8 left-0 right-0 text-center text-[#FAFAFA]/40 text-xs opacity-0 transform transition-all duration-1000 delay-700 ${
              isLoaded 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-4'
            }`}
          >
            École Supérieure en Technologies de l'Informatique et du Numérique
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;