import { useState, useEffect } from 'react';
import { Search, Filter, RefreshCw, Calendar, BookOpen } from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';

const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'added', 'pending'
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch logs from the API
    const fetchLogs = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch('https://estinsrcsimpleapi.vercel.app/logs.json');
        const data = await response.json();
        setLogs(data.logs || []);
      } catch (error) {
        console.error('Error fetching logs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  // Filter logs based on current filter and search term
  const filteredLogs = logs.filter((log) => {
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'added' && log.status === 'added') ||
      (filter === 'pending' && log.status === 'pending');
    
    const matchesSearch = 
      log.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.module && log.module.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  // Get current date in readable format
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
        <div className="text-white text-lg flex items-center gap-2">
          <RefreshCw className="w-5 h-5 animate-spin" />
          Loading logs...
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#09090B] py-20">
        <div className="max-w-3xl mx-auto px-4">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-white mb-3">Subject Logs</h1>
            <div className="flex items-center justify-center gap-2 text-zinc-400">
              <Calendar className="w-4 h-4" />
              <span>Last updated: {currentDate}</span>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-4 mb-10 border border-zinc-800">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 text-zinc-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search subjects..."
                  className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex">
                <button
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-l-xl ${
                    filter === 'all' 
                      ? 'bg-zinc-700 text-white' 
                      : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                  }`}
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
                <button
                  className={`flex-1 sm:flex-none px-4 py-2 ${
                    filter === 'added' 
                      ? 'bg-green-900/50 text-green-400' 
                      : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                  }`}
                  onClick={() => setFilter('added')}
                >
                  Added
                </button>
                <button
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-r-xl ${
                    filter === 'pending' 
                      ? 'bg-red-900/50 text-red-400' 
                      : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                  }`}
                  onClick={() => setFilter('pending')}
                >
                  Pending
                </button>
              </div>
            </div>
          </div>

          {/* Logs List */}
          {filteredLogs.length > 0 ? (
            <div className="space-y-4">
              {filteredLogs.map((log, index) => (
                <div 
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-zinc-800 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      {log.status === 'added' ? (
                        <span className="text-green-400">✅</span>
                      ) : (
                        <span className="text-red-400">❌</span>
                      )}
                      {log.subject}
                    </h2>
                    <div className="text-sm text-zinc-500 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {log.date}
                    </div>
                  </div>
                  
                  {log.module && (
                    <div className="flex items-center gap-2 mb-3 text-zinc-400">
                      <BookOpen className="w-4 h-4" />
                      <span>{log.module}</span>
                    </div>
                  )}
                  
                  {log.notes && (
                    <p className="text-zinc-300 mt-2">{log.notes}</p>
                  )}

                  {log.status === 'added' ? (
                    <div className="mt-4 text-sm text-green-400 bg-green-900/20 py-2 px-3 rounded-lg inline-block">
                      This subject has been added with all required resources.
                    </div>
                  ) : (
                    <div className="mt-4 text-sm text-red-400 bg-red-900/20 py-2 px-3 rounded-lg inline-block">
                      This subject is pending and waiting for resources.
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-zinc-800 text-center">
              <div className="flex justify-center mb-4">
                <Filter className="w-12 h-12 text-zinc-500 opacity-30" />
              </div>
              <p className="text-zinc-400 text-lg">No subjects found{searchTerm ? ' matching your search' : ''}</p>
              <p className="text-zinc-600 mt-2">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LogsPage;