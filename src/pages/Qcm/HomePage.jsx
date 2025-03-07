"use client";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  BookOpen,
  FileText,
  Clock,
  Award,
  ChevronRight,
  Users,
  Bookmark,
} from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";

function HomePage() {
  const { idd } = useParams();
  const [courseData, setCourseData] = useState({
    course: {
      name: "",
      description: "",
      imageUrl: "",
      stats: {
        totalResources: 0,
        institutions: 0,
        categories: 0,
      },
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Fetch course data
    const fetchCourseData = async () => {
      if (!idd) return; // Prevent unnecessary fetch if idd is undefined
      try {
        const response = await fetch(
          `https://estinsrcsimpleapi.vercel.app/${idd}.json`,
        );
        if (!response.ok) throw new Error("Failed to fetch course data");
        const data = await response.json();
        setCourseData(data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchQuizData = async () => {
      if (!idd) return;
      try {
        const response = await fetch(
          `https://estinsrcsimpleapi.vercel.app/${idd}/main.json`,
        );
        if (!response.ok) throw new Error("Failed to fetch quiz data");
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchCourseData();
    fetchQuizData();
  }, [idd]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
          <div className="text-[#FAFAFA] text-lg font-medium">
            Loading course data...
          </div>
        </div>
      </div>
    );
  }

  const { course } = courseData;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#09090B] py-24">
        <div className="max-w-6xl mx-auto px-4">
          {/* Course Header */}
          <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-12 border border-zinc-800 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-blue-600/30 blur-3xl"></div>
              <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl"></div>
            </div>

            <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-600/20 rounded-2xl blur-xl group-hover:bg-blue-600/30 transition-all duration-700 -z-10"></div>
                <img
                  src={course.imageUrl || "/placeholder.svg?height=150&width=150"}
                  alt="Course Image"
                  className="w-36 h-36 rounded-2xl object-cover border-2 border-zinc-700/50 group-hover:border-blue-500/50 transition-all duration-500 shadow-lg"
                />
                <div className="absolute bottom-2 right-2 p-2 bg-zinc-800/80 rounded-full hover:bg-blue-600 transition-colors duration-300">
                  <BookOpen className="w-5 h-5 text-[#FAFAFA]" />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="inline-block px-3 py-1 bg-blue-600/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-medium mb-3">
                  Operating Systems
                </div>
                <h1 className="text-4xl font-bold text-[#FAFAFA] mb-3 tracking-tight">
                  {course.name}
                </h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-zinc-400 mb-4">
                  <div className="flex items-center gap-2 bg-zinc-800/50 px-3 py-1.5 rounded-lg">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span>{course.stats.totalResources} Resources</span>
                  </div>
                  <div className="flex items-center gap-2 bg-zinc-800/50 px-3 py-1.5 rounded-lg">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span>{course.stats.institutions} Institutions</span>
                  </div>
                  <div className="flex items-center gap-2 bg-zinc-800/50 px-3 py-1.5 rounded-lg">
                    <Bookmark className="w-4 h-4 text-blue-400" />
                    <span>{course.stats.categories} Categories</span>
                  </div>
                </div>
                <div className="mt-3 text-zinc-300 max-w-2xl">
                  <p>{course.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section Title */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#FAFAFA]">
              Available Quizzes
            </h2>
            <p className="text-zinc-400 mt-1">
              Test your knowledge with these interactive quizzes
            </p>
          </div>

          {/* Available Quizzes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Link
                key={quiz.id}
                to={`/quiz/${idd}/${quiz.id}`}
                className="relative bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-lg border border-zinc-800 hover:border-zinc-700 transition-all duration-300 overflow-hidden group block" // Added 'block' display
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                <div
                  className={`absolute top-4 right-4 px-2 py-1 rounded-md text-xs font-medium ${
                    quiz.difficulty === "Easy"
                      ? "bg-green-600/20 text-green-400 border border-green-500/20"
                      : quiz.difficulty === "Medium"
                        ? "bg-yellow-600/20 text-yellow-400 border border-yellow-500/20"
                        : "bg-red-600/20 text-red-400 border border-red-500/20"
                  }`}
                >
                  {quiz.difficulty}
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-semibold text-[#FAFAFA] mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    {quiz.title}
                  </h2>
                  <p className="text-zinc-400 mb-6 h-12">{quiz.description}</p>

                  <div className="grid grid-cols-2 gap-2 mb-6">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <FileText className="w-4 h-4 text-zinc-500" />
                      <span className="text-sm">{quiz.questions} Questions</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Clock className="w-4 h-4 text-zinc-500" />
                      <span className="text-sm">{quiz.timeLimit} Minutes</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Award className="w-4 h-4 text-zinc-500" />
                      <span className="text-sm">{quiz.avgScore}% Avg</span>
                    </div>
                  </div>

                  {/* Remove the old Link */}
                  {/* <div className="flex justify-between items-center">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activeQuiz === quiz.id
                          ? "bg-blue-500 animate-pulse"
                          : "bg-zinc-600"
                      }`}
                    ></div>
                    <Link
                      to={`/quiz/${idd}/${quiz.id}`}
                      className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-[#FAFAFA] rounded-lg hover:bg-blue-700 transition-colors group-hover:shadow-lg group-hover:shadow-blue-900/20"
                    >
                      Start Quiz
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div> */}
                </div>
              </Link>
            ))}
          </div>

          {/* Additional section */}
          <div className="mt-16 bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-lg p-8 border border-zinc-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-semibold text-[#FAFAFA] mb-2">
                  Ready to test your knowledge?
                </h3>
                <p className="text-zinc-400">
                  Choose any quiz above to begin your learning journey
                </p>
              </div>
              <Link
                to={`/quiz/${idd}/1`} // Corrected this link as well
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-[#FAFAFA] rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2"
              >
                Start First Quiz
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default HomePage;
