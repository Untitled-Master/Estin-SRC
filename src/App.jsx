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

      </Routes>
    </Router>
  );
}

export default App;
