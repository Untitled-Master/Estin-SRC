import React, { useState } from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  return (
    <footer className="relative bg-[#09090B] text-[#FAFAFA] py-16 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMzAgMzAgTDYwIDMwIEw2MCA2MCBMMzAgNjAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIGZpbGw9Im5vbmUiPjwvcGF0aD4KPHBhdGggZD0iTTMwIDMwIEwzMCA2MCBMMCAzMCBMMCAzMCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4wMyIgZmlsbD0ibm9uZSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* School Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-[#FAFAFA]">ESTIN SRC</span>
              <span className="ml-2 text-sm text-[#FAFAFA]/50 tracking-wider">DIGITAL EXCELLENCE</span>
            </div>
            <p className="text-[#FAFAFA]/80 max-w-md leading-relaxed">
              École Supérieure en Sciences et Technologies de l'Informatique et du Numérique, committed to fostering innovation, research, and excellence in digital technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-[#FAFAFA]/10 pb-2">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Programs', 'Research', 'Admissions', 'About Us'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase().replace(' ', '-')}`} 
                    className="text-[#FAFAFA]/70 hover:text-[#FAFAFA] hover:pl-2 transition-all duration-300 inline-block relative group"
                  >
                    {link}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FAFAFA] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-[#FAFAFA]/10 pb-2">Contact</h4>
            <div className="space-y-2">
              <p className="text-[#FAFAFA]/70">Campus Road, Bejaia 06000</p>
              <p className="text-[#FAFAFA]/70">Algeria</p>
              <a 
                href="mailto:estinsrc@estin.dz" 
                className="text-[#FAFAFA]/80 hover:text-[#FAFAFA] transition-colors duration-300 block"
              >
                estinsrc@estin.dz
              </a>
              <p className="text-[#FAFAFA]/70">+213 34 XX XX XX</p>
            </div>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="mt-12 pt-8 border-t border-[#FAFAFA]/10 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            {[
              { Icon: Facebook, link: "#" },
              { Icon: Twitter, link: "#" },
              { Icon: Linkedin, link: "#" },
              { Icon: Instagram, link: "#" },
              { Icon: Mail, link: "#" }
            ].map(({ Icon, link }, index) => (
              <a 
                key={index} 
                href={link} 
                onMouseEnter={() => setHoveredIcon(index)}
                onMouseLeave={() => setHoveredIcon(null)}
                className={`text-[#FAFAFA]/70 hover:text-[#FAFAFA] transition-all duration-300 inline-block relative ${
                  hoveredIcon === index ? 'scale-125' : ''
                }`}
              >
                <Icon 
                  className={`h-5 w-5 transition-all duration-300 ${
                    hoveredIcon !== null && hoveredIcon !== index 
                    ? 'opacity-30 scale-90' 
                    : 'opacity-100'
                  }`} 
                />
                {hoveredIcon === index && (
                  <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#FAFAFA] rounded-full"></span>
                )}
              </a>
            ))}
          </div>
          <div className="text-sm text-[#FAFAFA]/50">
            © {new Date().getFullYear()} ESTIN. All Rights Reserved.
          </div>
        </div>
      </div>

      {/* Subtle animated gradient accent */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FAFAFA]/20 to-transparent opacity-50"></div>
    </footer>
  );
};

export default Footer;