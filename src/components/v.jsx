import { useState, useEffect } from "react";
import { Globe } from "lucide-react";

const VisitCounter = () => {
  const [visits, setVisits] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchVisits = async () => {
      try {
        const response = await fetch(
          "https://visitcounter-estinsrc.onrender.com/dashboard", 
          { signal }
        );
        const data = await response.json();
        setVisits(data.totalVisits);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error("Error fetching visit data:", error);
        }
        setIsLoading(false);
      }
    };

    fetchVisits();

    return () => {
      controller.abort();
    };
  }, []);

  if (isLoading) {
    return (
      <div 
        className="flex items-center gap-1 bg-[#09090B] text-[#FAFAFA]/50 px-2 py-1 rounded-full text-xs border border-[#FAFAFA]/10"
        title="Loading visits"
      >
        <Globe className="w-3 h-3 mr-1 animate-pulse" />
        -
      </div>
    );
  }

  if (visits === null) return null;

  return (
    <div 
      className="flex items-center gap-1 bg-[#09090B] text-[#FAFAFA] px-2 py-1 rounded-full text-xs border border-[#FAFAFA]/20 
      hover:bg-[#FAFAFA]/10 transition-colors duration-200 cursor-help"
      title={`Total unique website visits: ${visits.toLocaleString()}`}
    >
      <Globe className="w-3 h-3 mr-1 text-[#FAFAFA]/70" />
      <span className="font-medium">{visits.toLocaleString()}</span>
    </div>
  );
};

export default VisitCounter;
