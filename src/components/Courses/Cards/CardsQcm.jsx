import React from 'react';
import { BookOpen, FileQuestion, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
      {/* Course Image */}
      <div className="relative h-40 rounded-xl overflow-hidden mb-4">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/90 via-[#09090B]/50 to-transparent" />
        <div className="absolute bottom-2 left-2 px-3 py-1 bg-zinc-800/50 backdrop-blur-sm rounded-full text-sm text-white">
          {course.level}
        </div>
      </div>

      {/* Course Title and Description */}
      <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
      <p className="text-sm text-zinc-400 mb-4">{course.description}</p>

      {/* Course Stats */}
      <div className="flex items-center justify-between text-zinc-400 text-sm">
        <div className="flex items-center gap-2">
          <FileQuestion className="w-4 h-4" />
          <span>{course.students || course.resources} {course.students ? "Students" : "Qcms"}</span>
        </div>
      </div>

      {/* Explore Button */}
      <button onClick={() => navigate(`/quiz/${course.id}`)} className="w-full mt-4 px-4 py-2 bg-white/5 hover:bg-white/10 border border-zinc-700 rounded-xl text-white font-medium flex items-center justify-center gap-2 transition-all duration-300">
        <span>Explore</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default CourseCard;