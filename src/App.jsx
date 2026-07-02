import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PlayerProvider } from './contexts/PlayerContext';
import { TrackContextMenuProvider } from './contexts/TrackContextMenuContext';
import { ProtectedRoute, GuestRoute } from './components/ProtectedRoute';
import { AppLayout } from './layouts/AppLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { Home } from './pages/Home';
import { Library } from './pages/Library';
import { Publish } from './pages/Publish';
import { Premium } from './pages/Premium';
import { Download } from './pages/Download';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export default function App() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <TrackContextMenuProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
                <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
              </Route>

              <Route element={<AppLayout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/premium" element={<Premium />} />
                <Route path="/download" element={<Download />} />
                <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
                <Route path="/publish" element={<ProtectedRoute><Publish /></ProtectedRoute>} />
              </Route>

              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </BrowserRouter>
        </TrackContextMenuProvider>
      </PlayerProvider>
    </AuthProvider>
  );
}
