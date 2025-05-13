import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import CoursePage from './pages/CoursePage';
import Courses from './pages/Courses';
import Books from './pages/Books';
import DualJSONGenerator from './pages/gen';
import Account from './pages/account';
import Notification from './pages/Notification';
import DashboardPage from './pages/dash';
import LogsPage from './pages/logs'
import BookSubmissionForm from './pages/bookSubmit'
import QCMPage from './pages/qcm'
import HomePage from "./pages/Qcm/HomePage"
import QuizPage from "./pages/Qcm/QuizPage"
import Layout from "./components/Layout"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:id" element={<CoursePage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/books" element={<Books />} />
        <Route path="/genrate" element={<DualJSONGenerator />} />
        <Route path="/account" element={<Account />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/logs" element={<LogsPage />} />
        <Route path="/bookSubmit" element={<BookSubmissionForm />} />
        <Route path="/qcm" element={<QCMPage />} />
        <Route path="/quiz/:idd" element={<HomePage />} />
        <Route path="/quiz/:idd/:id" element={<QuizPage />} />


      </Routes>
    </Router>
  );
}

export default App;
