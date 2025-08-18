import CourseCard from '../Cards/Cards';

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
      title: "ASDS",
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
    },
    {
      id: 7,
      title: "Analysis 2",
      description: "Advanced calculus course exploring limit development, function expansions, and Riemann integration through formal sums and partitions.",
      institution: 8,
      resources: 14,
      level: "1cp",
      imageUrl: "https://i.pinimg.com/736x/f9/07/ad/f907ad47428d4f18f39d2a274c9f6fef.jpg"
    },
    {
      id: 8,
      title: "Introduction to Operating System 2",
      description: "Your comprehensive archive of educational resources, providing access to a curated collection of TDs, examinations, and academic materials from leading institutions.",
      institution: 8,
      resources: 13,
      level: "1cp",
      imageUrl: "https://i.pinimg.com/736x/ef/c6/75/efc675b96f6ca9ec8ac8cba126c44976.jpg"
    }
  ];

  return (
    <div className="bg-[#09090B]">
        <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-[#ffffff] mb-8">Available Courses: </h2>
        <hr />
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses && courses.map(course => (
            <CourseCard key={course.id} course={course} />
            ))}
        </div>
        </div>
    </div>
  );
};

export default CoursesGrid;
