import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import CoursePage from './pages/CoursePage';
import Courses from './pages/Courses';
import Books from './pages/Books';
import JSONGenerator from './pages/gen';
import Account from './pages/account';
import Notification from './pages/Notification';
import UnderConstruction from './pages/UnderConstruction'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:id" element={<CoursePage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/books" element={<Books />} />
        <Route path="/genrate" element={<JSONGenerator />} />
        <Route path="/account" element={<Account />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
