import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import BusinessDashboard from './pages/BusinessDashboard';
import AgilePage from './pages/AgilePage';
import ChatPage from './pages/ChatPage';
import CollaborationPage from './pages/CollaborationPage';
import DocsPage from './pages/DocsPage';
import GoalsPage from './pages/GoalsPage';
import ProjectsPage from './pages/ProjectsPage';
import SettingsPage from './pages/SettingsPage';
import TimePage from './pages/TimePage';
import WhiteboardPage from './pages/WhiteboardPage';

function App() {
  console.log('App component rendering');
  
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex space-x-4 py-4">
              <Link to="/" className="text-gray-700 hover:text-gray-900">Dashboard</Link>
              <Link to="/agile" className="text-gray-700 hover:text-gray-900">Agile</Link>
              <Link to="/chat" className="text-gray-700 hover:text-gray-900">Chat</Link>
              <Link to="/collaboration" className="text-gray-700 hover:text-gray-900">Collaboration</Link>
              <Link to="/docs" className="text-gray-700 hover:text-gray-900">Docs</Link>
              <Link to="/goals" className="text-gray-700 hover:text-gray-900">Goals</Link>
              <Link to="/projects" className="text-gray-700 hover:text-gray-900">Projects</Link>
              <Link to="/time" className="text-gray-700 hover:text-gray-900">Time</Link>
              <Link to="/whiteboard" className="text-gray-700 hover:text-gray-900">Whiteboard</Link>
            </div>
          </div>
        </nav>
        
        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <Routes>
              <Route path="/" element={<BusinessDashboard />} />
              <Route path="/agile" element={<AgilePage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/collaboration" element={<CollaborationPage />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/goals" element={<GoalsPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/time" element={<TimePage />} />
              <Route path="/whiteboard" element={<WhiteboardPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;