import './App.css';
import Registration from './pages/Registration';
import Applications from './pages/Applications';
import Login from './pages/Login';
import Download from './pages/Download';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/download" element={<Download />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
