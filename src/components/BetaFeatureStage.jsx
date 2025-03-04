import { useState, useEffect } from 'react';
import { Zap, Eye, Code, Grid, ArrowRight, Layers } from 'lucide-react';

const BetaFeatureStage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const sections = {
    overview: {
      icon: <Grid className="w-6 h-6" />,
      title: "Beta Feature Overview",
      content: "We're introducing an exciting new feature that represents our commitment to innovation and user-driven development. This beta stage is your opportunity to explore, provide feedback, and help shape the future of our platform."
    },
    features: {
      icon: <Layers className="w-6 h-6" />,
      title: "Key Capabilities",
      content: "Our beta feature offers a comprehensive suite of tools designed to enhance your experience. From advanced analytics to intuitive interfaces, we're pushing the boundaries of what's possible."
    },
    participation: {
      icon: <Eye className="w-6 h-6" />,
      title: "Beta Participation",
      content: "As a beta participant, you'll have exclusive access to cutting-edge functionality. Your insights and feedback are crucial in refining and optimizing the feature before its full release."
    }
  };

  return (
    <div className="relative bg-[#09090B] text-[#FAFAFA] overflow-hidden">
      {/* Animated Background */}
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
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div 
          className={`text-center mb-12 opacity-0 transform transition-all duration-700 ${
            isLoaded 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-4'
          }`}
        >
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Zap className="w-6 h-6 text-yellow-500 animate-pulse" />
            <h2 className="text-sm font-medium tracking-wider text-[#FAFAFA]/70 uppercase">
              Beta Feature
            </h2>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#FAFAFA]">
            The Account Feature is still in Beta
          </h1>
          <p className="text-lg text-[#FAFAFA]/80 max-w-2xl mx-auto mt-4">
            but this is how it would look like.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BetaFeatureStage;