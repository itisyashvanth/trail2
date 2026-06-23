import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import AvatarSetupPage from './pages/AvatarSetupPage';
import LandingPage from './pages/landing/LandingPage';
import SignInPage from './pages/SignInPage';
import PathPage from './pages/PathPage';
import GamesPage from './pages/GamesPage';
import QuizPage from './pages/QuizPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignInPage />} />

        {/* Existing App */}
        <Route path="/setup-avatar" element={<AvatarSetupPage />} />
        
        <Route path="/app" element={<AppShell />}>
          <Route index element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="games" element={<GamesPage />} />
          <Route path="games/quiz" element={<QuizPage />} />
          <Route path="path" element={<PathPage />} />
          <Route path="stocks" element={<div className="text-center mt-20 text-xl font-bold text-gray-400">Stocks Module Coming Soon</div>} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
