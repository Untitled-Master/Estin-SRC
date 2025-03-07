import { Link } from "react-router-dom"
import { BookOpen, Home, Search, Settings } from "lucide-react"

function Layout({ children }) {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-500" />
              <Link to="/" className="text-white font-bold text-lg">
                OS Quiz Platform
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-zinc-400 hover:text-white flex items-center gap-2">
                <Home className="w-5 h-5" />
                <span className="hidden md:inline">Home</span>
              </Link>
              <button className="text-zinc-400 hover:text-white flex items-center gap-2">
                <Search className="w-5 h-5" />
                <span className="hidden md:inline">Search</span>
              </button>
              <button className="text-zinc-400 hover:text-white flex items-center gap-2">
                <Settings className="w-5 h-5" />
                <span className="hidden md:inline">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </>
  )
}

export default Layout

