import React, { useState, useEffect } from 'react';
import { ChevronRight, ExternalLink, ArrowRight } from 'lucide-react';

const Hero = () => {
  // Add simple animation for text elements
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative overflow-hidden bg-[#09090B]">
      {/* Image with enhanced overlay and subtle animation */}
      <div className="absolute inset-0">
        <img 
          src="https://elearn.estin.dz/pluginfile.php/1/theme_klass/slide1image/1685881281/etudiants-promo-estin-bejaia-juin-2022-1-scaled.jpg"
          alt="ESTIN Students Promotion June 2022"
          className="w-full h-full object-cover scale-105 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/50" />
        
        {/* Enhanced decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#09090B] to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#09090B]/60 to-transparent" />
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMzAgMzAgTDYwIDMwIEw2MCA2MCBMMzAgNjAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIGZpbGw9Im5vbmUiPjwvcGF0aD4KPHBhdGggZD0iTTMwIDMwIEwzMCA2MCBMMCAzMCBMMCAzMCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4wMyIgZmlsbD0ibm9uZSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-30" />
        
        {/* Animated gradient accent line */}
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center h-full pt-8">
          {/* Animated subtitle */}
          <div className={`mb-5 transform transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <span className="inline-block px-5 py-2 bg-[#FAFAFA]/10 text-[#FAFAFA]/90 text-sm font-medium rounded-full backdrop-blur-md border border-[#FAFAFA]/10 shadow-xl">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Bejaia, Algeria | Est. 2020
            </span>
          </div>
          
          {/* Main heading with staggered animation */}
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#FAFAFA] max-w-3xl leading-tight tracking-tight transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
            <span className="relative">
              École Supérieure en Sciences et Technologies de l'Informatique et du Numérique
              <span className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full hidden md:block"></span>
            </span>
            <span className="block text-2xl md:text-3xl mt-4 text-[#FAFAFA]/90 font-bold">
              ESTIN SRC
              <span className="inline-block ml-2 text-sm align-top text-[#FAFAFA]/50 font-normal tracking-wider">DIGITAL EXCELLENCE</span>
            </span>
          </h1>
          
          {/* Description paragraph with animation */}
          <p className={`mt-6 text-[#FAFAFA]/80 max-w-xl text-lg leading-relaxed transition-all duration-1000 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
            Shaping the future of technology through excellence in education, innovation, and research in the digital sciences. Join Algeria's premier institution for computer science and digital technology.
          </p>
          
          {/* Call to action buttons with improved design and animation */}
          <div className={`flex flex-wrap gap-4 mt-10 transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
            <a 
              href="https://www.estin.dz" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center px-8 py-4 bg-[#FAFAFA] text-[#09090B] rounded-lg font-semibold hover:bg-gray-200 hover:shadow-xl transition-all duration-300 w-fit group relative overflow-hidden"
            >
              <span className="relative z-10">Explore ESTIN</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
              <ArrowRight className="ml-2 h-5 w-5 transition-all duration-300 group-hover:translate-x-1 relative z-10" />
            </a>
            
            <a 
              href="https://estin.dz/programme-de-formation/" 
              target="_blank"
              className="inline-flex items-center px-8 py-4 bg-transparent border border-[#FAFAFA]/30 text-[#FAFAFA] rounded-lg font-semibold hover:bg-[#FAFAFA]/10 hover:border-[#FAFAFA]/60 transition-all duration-300 w-fit group"
            >
              <span>Our Programs</span>
              <span className="ml-2 w-5 h-px bg-[#FAFAFA]/50 transform transition-all duration-300 group-hover:w-7"></span>
            </a>
          </div>
          
          {/* Stats section with counters and animations */}
          <div className={`flex flex-wrap gap-10 mt-12 transition-all duration-1000 delay-400 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-[#FAFAFA] relative">
                1000+
                <span className="absolute -top-3 -right-3 w-8 h-8 bg-blue-500/10 rounded-full blur-lg"></span>
              </span>
              <span className="text-sm text-[#FAFAFA]/70 mt-1">Students</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-[#FAFAFA] relative">
                50+
                <span className="absolute -top-3 -right-3 w-8 h-8 bg-indigo-500/10 rounded-full blur-lg"></span>
              </span>
              <span className="text-sm text-[#FAFAFA]/70 mt-1">Faculty</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-[#FAFAFA] relative">
                15+
                <span className="absolute -top-3 -right-3 w-8 h-8 bg-purple-500/10 rounded-full blur-lg"></span>
              </span>
              <span className="text-sm text-[#FAFAFA]/70 mt-1">Research Labs</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-[#FAFAFA] relative">
                100%
                <span className="absolute -top-3 -right-3 w-8 h-8 bg-green-500/10 rounded-full blur-lg"></span>
              </span>
              <span className="text-sm text-[#FAFAFA]/70 mt-1">Employment Rate</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced attribution with hover effects */}
      <div className="absolute bottom-5 right-5 z-10">
        <a 
          href="https://axmed.tech" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center text-xs text-[#FAFAFA]/80 hover:text-[#FAFAFA] transition-all duration-300 bg-[#09090B]/50 backdrop-blur-md px-4 py-2 rounded-full border border-[#FAFAFA]/10 group hover:bg-[#09090B]/70 hover:border-[#FAFAFA]/20 hover:shadow-lg hover:pr-5"
        >
          <span className="flex items-center justify-center w-4 h-4 bg-[#FAFAFA]/10 rounded-full mr-2 group-hover:bg-[#FAFAFA]/20">
            <span className="block w-1.5 h-1.5 bg-[#FAFAFA] rounded-full"></span>
          </span>
          <span>Designed by</span>
          <span className="ml-1 font-semibold">axmed.tech</span>
          <ExternalLink className="ml-1.5 h-3 w-3 opacity-70 group-hover:opacity-100 transform transition-all duration-300 group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
};

// Add this to your CSS or in a style tag
const styles = `
  @keyframes slow-zoom {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.05);
    }
  }
  
  .animate-slow-zoom {
    animation: slow-zoom 20s ease-in-out infinite alternate;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 15s ease infinite;
  }
`;

export default Hero;