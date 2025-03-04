import { useState, useEffect } from 'react';
import { BookOpen, FileText, Calendar, Users, ArrowRight, Code2, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';
import { useParams } from 'react-router-dom';

const CoursePage = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState({
    course: { name: '', description: '', imageUrl: '', stats: { totalResources: 0, institutions: 0, categories: 0 } },
    TD: [],
    Interrogation: [],
    Exams: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch resources from the API
    const fetchResources = async () => {
      try {
        const response = await fetch(`https://estinsrcsimpleapi.vercel.app/${id}.json`);
        const data = await response.json();
        setCourseData(data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
        <div className="text-white text-lg">Loading resources...</div>
      </div>
    );
  }

  const { course, TD, Interrogation, Exams } = courseData;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#09090B] py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Course Header */}
          <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-8 border border-zinc-800">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="relative group">
                <img
                  src={course.imageUrl}
                  alt="Course Image"
                  className="w-32 h-32 rounded-2xl object-cover border-2 border-zinc-700 group-hover:border-zinc-500 transition-all duration-300"
                />
                <button className="absolute bottom-2 right-2 p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors">
                  <BookOpen className="w-4 h-4 text-zinc-400" />
                </button>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {course.name}
                </h1>
                <div className="flex flex-col md:flex-row items-center gap-4 text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>ESTIN Students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Bejaia, Algeria</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>2023-2024 Academic Year</span>
                  </div>
                </div>
                <div className="mt-2 text-zinc-400">
                  <p>{course.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Resources Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* TDs Section */}
              <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-zinc-800">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  TDs
                </h2>
                <div className="space-y-4">
                  {TD.map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-zinc-400" />
                        <span className="text-white">{item.institution}</span>
                      </div>
                      <span className="text-zinc-500">→</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Interrogations Section */}
              <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-zinc-800">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Interrogations
                </h2>
                <div className="space-y-4">
                  {Interrogation.map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-zinc-400" />
                        <span className="text-white">{item.institution}</span>
                      </div>
                      <span className="text-zinc-500">→</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Exams Section */}
              <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-zinc-800">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Exams
                </h2>
                <div className="space-y-4">
                  {Exams.map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-zinc-400" />
                        <span className="text-white">{item.institution}</span>
                      </div>
                      <span className="text-zinc-500">→</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats and Info Panel */}
            <div className="space-y-8">
              {/* Stats Section */}
              <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-zinc-800">
                <h2 className="text-xl font-semibold text-white mb-6">Course Stats</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-zinc-400" />
                      <div>
                        <h3 className="text-sm font-medium text-white">Total Resources</h3>
                        <p className="text-xs text-zinc-400">
                          {course.stats.totalResources} files available
                        </p>
                      </div>
                    </div>
                    <span className="text-white">{course.stats.totalResources}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-zinc-400" />
                      <div>
                        <h3 className="text-sm font-medium text-white">Institutions</h3>
                        <p className="text-xs text-zinc-400">{course.stats.institutions} institutions</p>
                      </div>
                    </div>
                    <span className="text-white">{course.stats.institutions}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Code2 className="w-5 h-5 text-zinc-400" />
                      <div>
                        <h3 className="text-sm font-medium text-white">Categories</h3>
                        <p className="text-xs text-zinc-400">{course.stats.categories} categories</p>
                      </div>
                    </div>
                    <span className="text-white">{course.stats.categories}</span>
                  </div>
                </div>
              </div>

              {/* About the Course */}
              <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-zinc-800">
                <h2 className="text-xl font-semibold text-white mb-6">About the Course</h2>
                <div className="text-zinc-400">
                  <p>{course.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePage;