import React, { useState, useEffect } from 'react';
import { Download, Plus, Trash } from 'lucide-react';

const DualJSONGenerator = () => {
  // State for detailed course details (original format)
  const [course, setCourse] = useState({
    name: 'Fundamental Electronics 1',
    description: 'Your comprehensive archive of educational resources, providing access to a curated collection of TDs, examinations, and academic materials from leading institutions.',
    imageUrl: 'https://i.pinimg.com/736x/c1/11/51/c11151bd3df847968bd8bbc1a931a159.jpg',
    stats: {
      totalResources: 0,
      institutions: 0,
      categories: 0,
    },
  });

  // State for simple course details (new format)
  const [simpleCourse, setSimpleCourse] = useState({
    id: 10,
    title: 'Fundamental Electronics 1',
    description: 'Your comprehensive archive of educational resources, providing access to a curated collection of TDs, examinations, and academic materials from leading institutions.',
    institution: 16,
    resources: 0,
    level: "1cp",
    imageUrl: 'https://i.pinimg.com/736x/c1/11/51/c11151bd3df847968bd8bbc1a931a159.jpg'
  });

  // State for resources
  const [TD, setTD] = useState([]);
  const [Interrogation, setInterrogation] = useState([]);
  const [Exams, setExams] = useState([]);
  const [Resumes, setResumes] = useState([]);
  const [Books, setBooks] = useState([]);

  // State for new resource input
  const [newResource, setNewResource] = useState({
    type: 'TD',
    institution: '',
    link: '',
  });

  // State for active JSON tab
  const [activeTab, setActiveTab] = useState('detailed');

  // Ensure fields are synchronized on initial load
  useEffect(() => {
    syncCourseFields();
  }, []);

  // Function to synchronize all shared fields between both formats
  const syncCourseFields = () => {
    // Update simple course based on detailed course
    setSimpleCourse(prev => ({
      ...prev,
      title: course.name,
      description: course.description,
      imageUrl: course.imageUrl
    }));
    
    // Update detailed course based on simple course
    setCourse(prev => ({
      ...prev,
      name: simpleCourse.title,
      description: simpleCourse.description,
      imageUrl: simpleCourse.imageUrl
    }));
  };

  // Auto-calculate stats whenever resources change
  useEffect(() => {
    // Calculate total resources
    const totalResources = TD.length + Interrogation.length + Exams.length + Resumes.length + Books.length;
    
    // Get unique institutions
    const allInstitutions = new Set();
    [...TD, ...Interrogation, ...Exams, ...Resumes, ...Books].forEach(resource => {
      allInstitutions.add(resource.institution);
    });
    
    // Count categories (resource types) that have at least one entry
    const categories = [TD, Interrogation, Exams, Resumes, Books].filter(array => array.length > 0).length;
    
    // Update stats for detailed course format
    setCourse(prev => ({
      ...prev,
      stats: {
        totalResources,
        institutions: allInstitutions.size,
        categories,
      }
    }));
    
    // Update resources count for simple course format
    setSimpleCourse(prev => ({
      ...prev,
      resources: totalResources
    }));
  }, [TD, Interrogation, Exams, Resumes, Books]);

  // Handle input changes for detailed course format
  const handleDetailedInputChange = (e) => {
    const { name, value } = e.target;
    if (!name.startsWith('stats.')) {
      setCourse((prev) => ({ ...prev, [name]: value }));
      
      // Sync title and description to simple course format
      if (name === 'name') {
        setSimpleCourse(prev => ({ ...prev, title: value }));
      } else if (name === 'description') {
        setSimpleCourse(prev => ({ ...prev, description: value }));
      } else if (name === 'imageUrl') {
        setSimpleCourse(prev => ({ ...prev, imageUrl: value }));
      }
    }
  };

  // Handle input changes for simple course format
  const handleSimpleInputChange = (e) => {
    const { name, value } = e.target;
    setSimpleCourse((prev) => ({ ...prev, [name]: value }));
    
    // Sync name and description to detailed course format
    if (name === 'title') {
      setCourse(prev => ({ ...prev, name: value }));
    } else if (name === 'description') {
      setCourse(prev => ({ ...prev, description: value }));
    } else if (name === 'imageUrl') {
      setCourse(prev => ({ ...prev, imageUrl: value }));
    }
  };

  // Add a new resource
  const addResource = () => {
    if (!newResource.institution || !newResource.link) return;

    const resource = {
      institution: newResource.institution,
      link: newResource.link,
    };

    switch (newResource.type) {
      case 'TD':
        setTD((prev) => [...prev, resource]);
        break;
      case 'Interrogation':
        setInterrogation((prev) => [...prev, resource]);
        break;
      case 'Exams':
        setExams((prev) => [...prev, resource]);
        break;
      case 'Resumes':
        setResumes((prev) => [...prev, resource]);
        break;
      case 'Books':
        setBooks((prev) => [...prev, resource]);
        break;
      default:
        break;
    }

    // Reset new resource input
    setNewResource({ type: 'TD', institution: '', link: '' });
  };

  // Remove a resource
  const removeResource = (type, index) => {
    switch (type) {
      case 'TD':
        setTD((prev) => prev.filter((_, i) => i !== index));
        break;
      case 'Interrogation':
        setInterrogation((prev) => prev.filter((_, i) => i !== index));
        break;
      case 'Exams':
        setExams((prev) => prev.filter((_, i) => i !== index));
        break;
      case 'Resumes':
        setResumes((prev) => prev.filter((_, i) => i !== index));
        break;
      case 'Books':
        setBooks((prev) => prev.filter((_, i) => i !== index));
        break;
      default:
        break;
    }
  };

  // Generate detailed JSON
  const generateDetailedJSON = () => {
    return JSON.stringify({ course, TD, Interrogation, Exams, Resumes, Books }, null, 2);
  };

  // Generate simple JSON
  const generateSimpleJSON = () => {
    return JSON.stringify(simpleCourse, null, 2);
  };

  // Download JSON based on active tab
  const downloadJSON = () => {
    const jsonData = activeTab === 'detailed' ? generateDetailedJSON() : generateSimpleJSON();
    const filename = activeTab === 'detailed' ? 'detailed-course.json' : 'simple-course.json';
    
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#09090B] py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Dual Course JSON Generator</h1>

        {/* Course Details Form */}
        <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-8 border border-zinc-800">
          <h2 className="text-xl font-bold text-white mb-6">Course Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Detailed Course Form (Left) */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Detailed Format</h3>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Course Name</label>
                <input
                  type="text"
                  name="name"
                  value={course.name}
                  onChange={handleDetailedInputChange}
                  className="w-full px-4 py-2 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all duration-300"
                  placeholder="Enter course name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Description</label>
                <textarea
                  name="description"
                  value={course.description}
                  onChange={handleDetailedInputChange}
                  className="w-full px-4 py-2 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all duration-300"
                  placeholder="Enter course description"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={course.imageUrl}
                  onChange={handleDetailedInputChange}
                  className="w-full px-4 py-2 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all duration-300"
                  placeholder="Enter image URL"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Total Resources</label>
                  <input
                    type="number"
                    value={course.stats.totalResources}
                    readOnly
                    className="w-full px-4 py-2 bg-zinc-800/30 rounded-xl border border-zinc-700 text-zinc-400 focus:outline-none cursor-not-allowed"
                  />
                  <p className="text-xs text-zinc-500 mt-1">Auto-calculated</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Institutions</label>
                  <input
                    type="number"
                    value={course.stats.institutions}
                    readOnly
                    className="w-full px-4 py-2 bg-zinc-800/30 rounded-xl border border-zinc-700 text-zinc-400 focus:outline-none cursor-not-allowed"
                  />
                  <p className="text-xs text-zinc-500 mt-1">Auto-calculated</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Categories</label>
                  <input
                    type="number"
                    value={course.stats.categories}
                    readOnly
                    className="w-full px-4 py-2 bg-zinc-800/30 rounded-xl border border-zinc-700 text-zinc-400 focus:outline-none cursor-not-allowed"
                  />
                  <p className="text-xs text-zinc-500 mt-1">Auto-calculated</p>
                </div>
              </div>
            </div>
            
            {/* Simple Course Form (Right) */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-green-400 mb-4">Simple Format</h3>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">ID</label>
                <input
                  type="number"
                  name="id"
                  value={simpleCourse.id}
                  onChange={handleSimpleInputChange}
                  className="w-full px-4 py-2 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all duration-300"
                  placeholder="Enter course ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={simpleCourse.title}
                  onChange={handleSimpleInputChange}
                  className="w-full px-4 py-2 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all duration-300"
                  placeholder="Enter course title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Description</label>
                <textarea
                  name="description"
                  value={simpleCourse.description}
                  onChange={handleSimpleInputChange}
                  className="w-full px-4 py-2 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all duration-300"
                  placeholder="Enter course description"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Institution ID</label>
                  <input
                    type="number"
                    name="institution"
                    value={simpleCourse.institution}
                    onChange={handleSimpleInputChange}
                    className="w-full px-4 py-2 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all duration-300"
                    placeholder="Institution ID"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Resources</label>
                  <input
                    type="number"
                    value={simpleCourse.resources}
                    readOnly
                    className="w-full px-4 py-2 bg-zinc-800/30 rounded-xl border border-zinc-700 text-zinc-400 focus:outline-none cursor-not-allowed"
                  />
                  <p className="text-xs text-zinc-500 mt-1">Auto-calculated</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Level</label>
                  <input
                    type="text"
                    name="level"
                    value={simpleCourse.level}
                    onChange={handleSimpleInputChange}
                    className="w-full px-4 py-2 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all duration-300"
                    placeholder="Course level"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={simpleCourse.imageUrl}
                  onChange={handleSimpleInputChange}
                  className="w-full px-4 py-2 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all duration-300"
                  placeholder="Enter image URL"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Add Resources Form */}
        <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-8 border border-zinc-800">
          <h2 className="text-xl font-bold text-white mb-6">Add Resources</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Resource Type</label>
                <select
                  name="type"
                  value={newResource.type}
                  onChange={(e) => setNewResource((prev) => ({ ...prev, type: e.target.value }))}
                  className="w-full px-4 py-2 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all duration-300"
                >
                  <option value="TD">TD</option>
                  <option value="Interrogation">Interrogation</option>
                  <option value="Exams">Exams</option>
                  <option value="Resumes">Resumes</option>
                  <option value="Books">Books</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Institution</label>
                <input
                  type="text"
                  name="institution"
                  value={newResource.institution}
                  onChange={(e) => setNewResource((prev) => ({ ...prev, institution: e.target.value }))}
                  className="w-full px-4 py-2 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all duration-300"
                  placeholder="Enter institution"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Link</label>
                <input
                  type="text"
                  name="link"
                  value={newResource.link}
                  onChange={(e) => setNewResource((prev) => ({ ...prev, link: e.target.value }))}
                  className="w-full px-4 py-2 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all duration-300"
                  placeholder="Enter link"
                />
              </div>
            </div>
            <button
              onClick={addResource}
              className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-xl flex items-center gap-2 hover:bg-blue-500/20 transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              <span>Add Resource</span>
            </button>
          </div>
        </div>

        {/* Resources List */}
        <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-8 border border-zinc-800">
          <h2 className="text-xl font-bold text-white mb-6">Resources</h2>
          <div className="space-y-6">
            {['TD', 'Interrogation', 'Exams', 'Resumes', 'Books'].map((type) => (
              <div key={type}>
                <h3 className="text-lg font-semibold text-white mb-4">{type}</h3>
                <div className="space-y-4">
                  {(type === 'TD' 
                    ? TD 
                    : type === 'Interrogation' 
                      ? Interrogation 
                      : type === 'Exams' 
                        ? Exams 
                        : type === 'Resumes'
                          ? Resumes
                          : Books).map((resource, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl border border-zinc-700"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-white">{resource.institution}</span>
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          {resource.link}
                        </a>
                      </div>
                      <button
                        onClick={() => removeResource(type, index)}
                        className="p-2 bg-zinc-700 rounded-full hover:bg-zinc-600 transition-all duration-300"
                      >
                        <Trash className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* JSON Preview and Download */}
        <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-8 border border-zinc-800">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('detailed')}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 ${
                activeTab === 'detailed' 
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30' 
                  : 'bg-zinc-800/50 text-zinc-400 border border-zinc-700'
              }`}
            >
              <span>Detailed JSON</span>
            </button>
            <button
              onClick={() => setActiveTab('simple')}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 ${
                activeTab === 'simple' 
                  ? 'bg-green-500/20 text-green-400 border border-green-400/30' 
                  : 'bg-zinc-800/50 text-zinc-400 border border-zinc-700'
              }`}
            >
              <span>Simple JSON</span>
            </button>
          </div>
          
          <h2 className="text-xl font-bold text-white mb-6">
            {activeTab === 'detailed' ? 'Detailed JSON Preview' : 'Simple JSON Preview'}
          </h2>
          
          <pre className="bg-zinc-800/50 p-4 rounded-xl text-sm text-zinc-400 overflow-auto max-h-96">
            {activeTab === 'detailed' ? generateDetailedJSON() : generateSimpleJSON()}
          </pre>
          
          <button
            onClick={downloadJSON}
            className="mt-6 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-xl flex items-center gap-2 hover:bg-blue-500/20 transition-all duration-300"
          >
            <Download className="w-4 h-4" />
            <span>Download {activeTab === 'detailed' ? 'Detailed' : 'Simple'} JSON</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DualJSONGenerator;