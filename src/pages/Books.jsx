import CourseCard from '../components/Courses/Cards/Cards';
import Navbar from '../components/Navbar/Navbar';
import UnderConstruction from './UnderConstruction'
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
      title: "Data Structures and Algorithms",
      description: "Master the essential concepts of DSA",
      duration: "12 weeks",
      students: 85,
      level: "2cp",
      imageUrl: "https://i.pinimg.com/736x/86/6c/24/866c2407ff76c5e6398392fcb7fbda47.jpg"
    },
    {
      id: 3,
      title: "Web Development Bootcamp",
      description: "Build modern web applications from scratch",
      duration: "16 weeks",
      students: 200,
      level: "1cs",
      imageUrl: "https://i.pinimg.com/736x/86/6c/24/866c2407ff76c5e6398392fcb7fbda47.jpg"
    },
    {
      id: 4,
      title: "Artificial Intelligence Fundamentals",
      description: "Explore the basics of AI and machine learning",
      duration: "10 weeks",
      students: 150,
      level: "1cs",
      imageUrl: "https://i.pinimg.com/736x/86/6c/24/866c2407ff76c5e6398392fcb7fbda47.jpg"
    },
    {
      id: 5,
      title: "Operating Systems",
      description: "Learn the core concepts of OS design and implementation",
      duration: "14 weeks",
      students: 120,
      level: "2cs",
      imageUrl: "https://i.pinimg.com/736x/86/6c/24/866c2407ff76c5e6398392fcb7fbda47.jpg"
    },
    {
      id: 6,
      title: "Database Systems",
      description: "Understand the principles of database design and management",
      duration: "10 weeks",
      students: 90,
      level: "1cp",
      imageUrl: "https://i.pinimg.com/736x/86/6c/24/866c2407ff76c5e6398392fcb7fbda47.jpg"
    }
  ];

  return (
    <>
    <Navbar />
    <UnderConstruction />
    </>
  );
};

export default CoursesGrid;