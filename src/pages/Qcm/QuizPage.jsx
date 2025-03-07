import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BookOpen, FileText, Calendar, Users, CheckCircle, XCircle, Clock, Award, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar/Navbar';

function QuizPage() {
  const { id } = useParams();
  const { idd } = useParams();
  const navigate = useNavigate();
  
  const [courseData, setCourseData] = useState({
    course: { 
      name: '', 
      description: '', 
      imageUrl: '', 
      stats: { 
        totalResources: 0, 
        institutions: 0, 
        categories: 0 
      } 
    }
  });
  
  const [quizData, setQuizData] = useState({
    questions: []
  });
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(1200); // 10 minutes in seconds
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Fetch course data
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`https://estinsrcsimpleapi.vercel.app/${idd}.json`);
        const data = await response.json();
        setCourseData(data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    // Fetch quiz data
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`https://estinsrcsimpleapi.vercel.app/${idd}/${id}.json`);
        const data = await response.json();
        setQuizData(data);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseData();
    fetchQuizData();
  }, [id]);

  useEffect(() => {
    // Timer countdown
    if (timeRemaining > 0 && !quizSubmitted && !isLoading) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !quizSubmitted && !isLoading) {
      handleSubmit();
    }
  }, [timeRemaining, quizSubmitted, isLoading]);

  const handleAnswerSelect = (questionIndex, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answer
    });
  };

  const handleSubmit = () => {
    // Calculate score
    let correctAnswers = 0;
    quizData.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct_answer) {
        correctAnswers++;
      }
    });

    const calculatedScore = Math.round((correctAnswers / quizData.questions.length) * 100);
    setScore(calculatedScore);
    setQuizSubmitted(true);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
        <div className="text-white text-lg">Loading quiz...</div>
      </div>
    );
  }

  const { course } = courseData;
  const { questions } = quizData;
  const passingScore = 70; // Default passing score

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-[#09090B] py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Quiz Header */}
        <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-8 border border-zinc-800">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative group">
              <img
                src={course.imageUrl || "/placeholder.svg?height=150&width=150"}
                alt="Course Image"
                className="w-32 h-32 rounded-2xl object-cover border-2 border-zinc-700 group-hover:border-zinc-500 transition-all duration-300"
              />
              <button className="absolute bottom-2 right-2 p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors">
                <BookOpen className="w-4 h-4 text-zinc-400" />
              </button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">
                {course.name} - Quiz {id}
              </h1>
              <div className="flex flex-col md:flex-row items-center gap-4 text-zinc-400">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>{questions.length} Questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>20 Minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>Pass: {passingScore}%</span>
                </div>
              </div>
              <div className="mt-2 text-zinc-400">
                <p>{course.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Questions Section */}
          <div className="lg:col-span-2 space-y-8">
            {!quizSubmitted ? (
              <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-zinc-800">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    Question {currentQuestion + 1} of {questions.length}
                  </h2>
                  <div className="flex items-center gap-2 text-white bg-zinc-800 px-4 py-2 rounded-lg">
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(timeRemaining)}</span>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-white text-lg">{questions[currentQuestion]?.question}</p>
                </div>

                <div className="space-y-4">
                  {questions[currentQuestion] && Object.entries(questions[currentQuestion].choices).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => handleAnswerSelect(currentQuestion, key)}
                      className={`w-full flex items-center p-4 rounded-xl transition-colors text-left ${
                        selectedAnswers[currentQuestion] === key
                          ? 'bg-blue-600/20 border border-blue-500'
                          : 'bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700'
                      }`}
                    >
                      <div className="w-6 h-6 mr-4 flex items-center justify-center rounded-full border border-zinc-600">
                        <span className="text-white">{key}</span>
                      </div>
                      <span className="text-white">{value}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                    className={`px-6 py-2 rounded-lg border ${
                      currentQuestion === 0
                        ? 'border-zinc-700 bg-zinc-800/50 text-zinc-500 cursor-not-allowed'
                        : 'border-zinc-600 bg-zinc-800 text-white hover:bg-zinc-700'
                    }`}
                  >
                    Previous
                  </button>

                  {currentQuestion < questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQuestion(currentQuestion + 1)}
                      className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                    >
                      Submit Quiz
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-zinc-800">
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                  Quiz Results
                  {score >= passingScore ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500" />
                  )}
                </h2>

                <div className="bg-zinc-800/50 rounded-xl p-6 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-zinc-400">Your Score</span>
                    <span className={`text-xl font-bold ${
                      score >= passingScore ? 'text-green-500' : 'text-red-500'
                    }`}>{score}%</span>
                  </div>
                  <div className="w-full bg-zinc-700 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full ${
                        score >= passingScore ? 'bg-green-600' : 'bg-red-600'
                      }`}
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-zinc-500">
                    <span>0%</span>
                    <span>{passingScore}%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {questions.map((question, qIndex) => (
                    <div key={qIndex} className="border border-zinc-800 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-white font-medium">Question {qIndex + 1}</p>
                          <p className="text-white">{question.question}</p>
                        </div>
                        {selectedAnswers[qIndex] === question.correct_answer ? (
                          <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                        )}
                      </div>

                      <div className="space-y-2">
                        {Object.entries(question.choices).map(([key, value]) => (
                          <div
                            key={key}
                            className={`p-3 rounded-lg flex items-center ${
                              key === question.correct_answer
                                ? 'bg-green-600/20 border border-green-700'
                                : key === selectedAnswers[qIndex] && key !== question.correct_answer
                                ? 'bg-red-600/20 border border-red-700'
                                : 'bg-zinc-800/50 border border-zinc-700'
                            }`}
                          >
                            <div className="w-6 h-6 mr-3 flex items-center justify-center rounded-full border border-zinc-600">
                              <span className="text-white">{key}</span>
                            </div>
                            <span className="text-white">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-center gap-4">
                  <Link to="/" className="px-6 py-2 rounded-lg bg-zinc-700 text-white hover:bg-zinc-600">
                    Back to Home
                  </Link>
                  <button
                    onClick={() => {
                      setQuizSubmitted(false);
                      setSelectedAnswers({});
                      setCurrentQuestion(0);
                      setTimeRemaining(600);
                      setScore(0);
                    }}
                    className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Stats and Info Panel */}
          <div className="space-y-8">
            {/* Quiz Progress */}
            {!quizSubmitted && (
              <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-zinc-800">
                <h2 className="text-xl font-semibold text-white mb-6">Quiz Progress</h2>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-zinc-400">Progress</span>
                    <span className="text-sm text-zinc-400">
                      {Object.keys(selectedAnswers).length} / {questions.length} answered
                    </span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(Object.keys(selectedAnswers).length / questions.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {questions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestion(index)}
                      className={`w-full py-2 text-center rounded ${
                        currentQuestion === index
                          ? 'bg-blue-600 text-white'
                          : selectedAnswers[index] !== undefined
                          ? 'bg-zinc-700 text-white'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quiz Stats */}
            <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-zinc-800">
              <h2 className="text-xl font-semibold text-white mb-6">Quiz Stats</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-zinc-400" />
                    <div>
                      <h3 className="text-sm font-medium text-white">Times Attempted</h3>
                      <p className="text-xs text-zinc-400">
                        Total attempts by students
                      </p>
                    </div>
                  </div>
                  <span className="text-white">42</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-zinc-400" />
                    <div>
                      <h3 className="text-sm font-medium text-white">Average Score</h3>
                      <p className="text-xs text-zinc-400">Among all students</p>
                    </div>
                  </div>
                  <span className="text-white">76%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-zinc-400" />
                    <div>
                      <h3 className="text-sm font-medium text-white">Difficulty</h3>
                      <p className="text-xs text-zinc-400">Based on scores</p>
                    </div>
                  </div>
                  <span className="text-white">Medium</span>
                </div>
              </div>
            </div>

            {/* Quiz Instructions */}
            <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-zinc-800">
              <h2 className="text-xl font-semibold text-white mb-6">Instructions</h2>
              <div className="text-zinc-400 space-y-4">
                <p>• You have 10 minutes to complete this quiz.</p>
                <p>• Each question has only one correct answer.</p>
                <p>• You can navigate between questions using the Next/Previous buttons or the question numbers.</p>
                <p>• Your score will be calculated once you submit the quiz or when time runs out.</p>
                <p>• A score of {passingScore}% or higher is required to pass this quiz.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default QuizPage;
