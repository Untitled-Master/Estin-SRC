import Navbar from '../components/Navbar/Navbar';
import BetaFeatureStage from '../components/BetaFeatureStage'
import { useState } from 'react';
import { Camera, MapPin, Calendar, Mail, Bell, Shield, Key, User, Moon, Code2, Users } from 'lucide-react';

const Account = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
    <Navbar />
    <BetaFeatureStage />
    <div className="min-h-screen bg-[#09090B] py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-8 border border-zinc-800">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative group">
              <img 
                src="https://avatars.githubusercontent.com/u/128633214?s=400&u=d571e7b84a3e389d48c9a2e964a03eb0a9c26abd&v=4"
                alt="Profile"
                className="w-32 h-32 rounded-2xl object-cover border-2 border-zinc-700 group-hover:border-zinc-500 transition-all duration-300"
              />
              <button className="absolute bottom-2 right-2 p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors">
                <Camera className="w-4 h-4 text-zinc-400" />
              </button>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">
                BELMEHNOUF AHMED
              </h1>
              <div className="flex flex-col md:flex-row items-center gap-4 text-zinc-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>a_belmehnouf@estin.dz</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Jijel, Algeria</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Born 11/04/2007</span>
                </div>
              </div>
              <div className="mt-2 text-zinc-400">
                <a href="https://github.com/Untitled-Master" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex items-center gap-2 hover:text-white transition-colors justify-center md:justify-start">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  github.com/Untitled-Master
                </a>
              </div>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="mt-6 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-zinc-700 rounded-xl font-medium text-white transition-all duration-200"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-zinc-800">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Name (English)</label>
                    <div className="text-white">BELMEHNOUF AHMED</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Name (Arabic)</label>
                    <div className="text-white">بلمحنوف أحمد</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Date of Birth</label>
                    <div className="text-white">11/04/2007</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Place of Birth</label>
                    <div className="text-white">الطاهير الطاهير</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Address</label>
                  <div className="text-white">ص.برقم17وجانة-الطاهير</div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Wilaya</label>
                  <div className="text-white">Jijel (18)</div>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-zinc-800">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security
              </h2>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-colors">
                  <div className="flex items-center gap-3">
                    <Key className="w-5 h-5 text-zinc-400" />
                    <span className="text-white">Change Password</span>
                  </div>
                  <span className="text-zinc-500">→</span>
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-colors">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-zinc-400" />
                    <span className="text-white">Two-Factor Authentication</span>
                  </div>
                  <span className="text-zinc-500">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Preferences Panel */}
          <div className="space-y-8">
            <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-zinc-800 h-fit">
              <h2 className="text-xl font-semibold text-white mb-6">Preferences</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-zinc-400" />
                    <div>
                      <h3 className="text-sm font-medium text-white">Notifications</h3>
                      <p className="text-xs text-zinc-400">Receive email updates</p>
                    </div>
                  </div>
                  <button className="bg-zinc-700 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out">
                    <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out"></span>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Moon className="w-5 h-5 text-zinc-400" />
                    <div>
                      <h3 className="text-sm font-medium text-white">Dark Mode</h3>
                      <p className="text-xs text-zinc-400">Toggle theme</p>
                    </div>
                  </div>
                  <button className="bg-zinc-700 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out">
                    <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out"></span>
                  </button>
                </div>
              </div>
            </div>

            {/* Clubs Section - Moved here */}
            <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-zinc-800">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Club Memberships
              </h2>
              <div className="space-y-4">
                {/* ByteCraft Club */}
                <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-500/10 p-3 rounded-xl">
                        <Code2 className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">ByteCraft</h3>
                        <p className="text-zinc-400">Development Department</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium">
                      Active
                    </span>
                  </div>
                  <div className="mt-4 text-sm text-zinc-400">
                    <p>Contributing to innovative software development projects and collaborative coding initiatives.</p>
                  </div>
                </div>

                {/* Nexus Club */}
                <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-purple-500/10 p-3 rounded-xl">
                        <Code2 className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">Nexus</h3>
                        <p className="text-zinc-400">Development Department</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm font-medium">
                      Active
                    </span>
                  </div>
                  <div className="mt-4 text-sm text-zinc-400">
                    <p>Engaging in cutting-edge development projects and technical skill enhancement.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Account;
