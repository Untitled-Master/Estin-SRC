import React, { useState } from 'react';
import { Download, Plus, Trash } from 'lucide-react';

const JSONGenerator = () => {
  // State for course details
  const [course, setCourse] = useState({
    name: '',
    description: '',
    imageUrl: '',
    stats: {
      totalResources: 0,
      institutions: 0,
      categories: 0,
    },
  });

  // State for resources
  const [TD, setTD] = useState([]);
  const [Interrogation, setInterrogation] = useState([]);
  const [Exams, setExams] = useState([]);

  // State for new resource input
  const [newResource, setNewResource] = useState({
    type: 'TD',
    institution: '',
    link: '',
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('stats.')) {
      const statKey = name.split('.')[1];
      setCourse((prev) => ({
        ...prev,
        stats: { ...prev.stats, [statKey]: parseInt(value) || 0 },
      }));
    } else {
      setCourse((prev) => ({ ...prev, [name]: value }));
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
      default:
        break;
    }
  };

  // Generate JSON
  const generateJSON = () => {
    return JSON.stringify({ course, TD, Interrogation, Exams }, null, 2);
  };

  // Download JSON
  const downloadJSON = () => {
    const blob = new Blob([generateJSON()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'course.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#09090B] py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Course JSON Generator</h1>

        {/* Course Details Form */}
        <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-8 border border-zinc-800">
          <h2 className="text-xl font-bold text-white mb-6">Course Details</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Course Name</label>
              <input
                type="text"
                name="name"
                value={course.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all duration-300"
                placeholder="Enter course name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Description</label>
              <textarea
                name="description"
                value={course.description}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all duration-300"
                placeholder="Enter image URL"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Total Resources</label>
                <input
                  type="number"
                  name="stats.totalResources"
                  value={course.stats.totalResources}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Institutions</label>
                <input
                  type="number"
                  name="stats.institutions"
                  value={course.stats.institutions}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Categories</label>
                <input
                  type="number"
                  name="stats.categories"
                  value={course.stats.categories}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all duration-300"
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
            {['TD', 'Interrogation', 'Exams'].map((type) => (
              <div key={type}>
                <h3 className="text-lg font-semibold text-white mb-4">{type}</h3>
                <div className="space-y-4">
                  {(type === 'TD' ? TD : type === 'Interrogation' ? Interrogation : Exams).map((resource, index) => (
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
          <h2 className="text-xl font-bold text-white mb-6">JSON Preview</h2>
          <pre className="bg-zinc-800/50 p-4 rounded-xl text-sm text-zinc-400 overflow-auto">
            {generateJSON()}
          </pre>
          <button
            onClick={downloadJSON}
            className="mt-6 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-xl flex items-center gap-2 hover:bg-blue-500/20 transition-all duration-300"
          >
            <Download className="w-4 h-4" />
            <span>Download JSON</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JSONGenerator;