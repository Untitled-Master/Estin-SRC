import React, { useState } from 'react';
import CourseCard from '../components/Courses/Cards/Cards';
import Navbar from '../components/Navbar/Navbar';
import { Search, Filter } from 'lucide-react';

const CoursesGrid = () => {
  // Sample courses data
  const courses = [
    {
      id: 1,
      title: "Architecture of Computer 1",
      description: "Explore comprehensive architecture resources, design patterns, and system blueprints for modern software development",
      institution: 3,
      resources: 13,
      level: "1cp",
      imageUrl: "https://i.pinimg.com/736x/00/8d/51/008d519f343170e129883ddd654c1974.jpg"
    },
    {
      id: 2,
      title: "Analysis 1",
      description: "A deep dive into mathematical analysis, calculus, and analytical methods, with rigorous proofs, problem-solving techniques, and real-world applications.",
      institution: 3,
      resources: 13,
      level: "1cp",
      imageUrl: "https://i.pinimg.com/736x/bc/e4/cd/bce4cd39bc29b28192f3bdccea342a3b.jpg"
    },
    {
      id: 3,
      title: "ASDD",
      description: "Your comprehensive archive of educational resources, providing access to a curated collection of TDs, examinations, and academic materials from leading institutions.",
      institution: 3,
      resources: 13,
      level: "1cp",
      imageUrl: "https://i.pinimg.com/736x/bf/ed/de/bfedde62e6ae794b51ae0a42d4d5eb3b.jpg"
    },
    {
      id: 4,
      title: "Electricity 1",
      description: "Your comprehensive archive of educational resources, providing access to a curated collection of TDs, examinations, and academic materials from leading institutions.",
      institution: 6,
      resources: 11,
      level: "1cp",
      imageUrl: "https://i.pinimg.com/originals/91/c5/06/91c50656703c120d5313b5df399403ed.gif"
    },
    {
      id: 5,
      title: "English",
      description: "Your comprehensive archive of educational resources, providing access to a curated collection of TDs, examinations, and academic materials from leading institutions.",
      institution: 3,
      resources: 7,
      level: "1cp",
      imageUrl: "https://i.pinimg.com/736x/2c/ab/22/2cab22f7d693aa2e42b8f96a5ffe1686.jpg"
    },
    {
      id: 6,
      title: "Algebra 1",
      description: "Your comprehensive archive of educational resources, providing access to a curated collection of TDs, examinations, and academic materials from leading institutions.",
      institution: 8,
      resources: 15,
      level: "1cp",
      imageUrl: "https://i.pinimg.com/736x/4a/d2/75/4ad275686aa68998cfcbd139707d8847.jpg"
    }
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
            <h2 className="text-3xl font-bold text-white mb-2">Available Courses</h2>
            <p className="text-zinc-400">Explore a wide range of courses designed to enhance your skills and knowledge.</p>
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