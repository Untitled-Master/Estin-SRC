import React, { useState } from 'react';
import CourseCard from '../components/Courses/Cards/CardsQcm';
import Navbar from '../components/Navbar/Navbar';
import { Search, Filter } from 'lucide-react';

const CoursesGrid = () => {
  // Sample courses data
  const courses = [
    {
        id: 8,
        title: "Introduction to Operating System 2",
        description: "Your comprehensive archive of educational resources, providing access to a curated collection of TDs, examinations, and academic materials from leading institutions.",
        resources: 4,
        level: "1cp",
        imageUrl: "https://i.pinimg.com/736x/ef/c6/75/efc675b96f6ca9ec8ac8cba126c44976.jpg"
      },
    {
        id: 10,
        title: "Fundamental Electronics 1",
        description: "Your comprehensive archive of educational resources, providing access to a curated collection of TDs, examinations, and academic materials from leading institutions.",
        resources: 3,
        level: "1cp",
        imageUrl: "https://i.pinimg.com/736x/c1/11/51/c11151bd3df847968bd8bbc1a931a159.jpg"
    },
  ];

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevels, setSelectedLevels] = useState([]);

  // Filter courses based on search and selected levels
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(course.level);
    return matchesSearch && matchesLevel;
  });

  // Toggle level filter
  const toggleLevelFilter = (level) => {
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#09090B] py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Page Header */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">Available Qcms</h2>
            <p className="text-zinc-400">Explore a wide range of Qcms designed to enhance your skills and knowledge.</p>
            <hr className="border-zinc-800 my-4" />
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            {/* Search Bar */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 bg-zinc-900/50 backdrop-blur-xl rounded-xl border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-all duration-300"
              />
              <Search className="absolute right-3 top-3 w-5 h-5 text-zinc-500" />
            </div>

            {/* Level Filters */}
            <div className="flex flex-wrap gap-3">
              {['1cp', '2cp', '1cs', '2cs', '3cs'].map((level) => (
                <button
                  key={level}
                  onClick={() => toggleLevelFilter(level)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all duration-300 ${
                    selectedLevels.includes(level)
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800/70 hover:text-zinc-300'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  <span>{level}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {/* No Results Message */}
          {filteredCourses.length === 0 && (
            <div className="text-center text-zinc-400 py-12">
              <p>No courses found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CoursesGrid;