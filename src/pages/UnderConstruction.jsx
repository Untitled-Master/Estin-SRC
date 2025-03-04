import React, { useState, useEffect } from 'react';
import { Construction, Clock, Send } from 'lucide-react';

const UnderConstruction = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="relative h-screen overflow-hidden bg-[#09090B] flex items-center justify-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[1, 2, 3, 4].map((item) => (
          <div 
            key={item}
            className={`absolute bg-[#FAFAFA]/5 rounded-full blur-2xl transform transition-all duration-1000 animate-pulse ${
              isLoaded 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-50'
            }`}
            style={{
              width: `${Math.random() * 250 + 100}px`,
              height: `${Math.random() * 250 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
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

        {/* Construction Illustration */}
        <div 
          className={`mb-8 flex justify-center items-center opacity-0 transform transition-all duration-1000 delay-200 ${
            isLoaded 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-6'
          }`}
        >
          <Construction 
            className="w-24 h-24 text-[#FAFAFA]/30 animate-bounce" 
            strokeWidth={1} 
          />
        </div>

        {/* Main Content */}
        <div 
          className={`mb-10 opacity-0 transform transition-all duration-1000 delay-300 ${
            isLoaded 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-6'
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#FAFAFA] mb-4">
            Website Under Construction
          </h1>
          <p className="text-lg md:text-xl text-[#FAFAFA]/80 max-w-xl mx-auto mb-6">
            We're working hard to bring you an exceptional digital experience. 
            Stay tuned for something amazing!
          </p>

          {/* Estimated Launch Countdown */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            <Clock className="w-6 h-6 text-[#FAFAFA]/50" />
            <span className="text-[#FAFAFA]/70">Estimated Launch: idk to be honet</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;