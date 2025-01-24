import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Profile from './pages/account/Profile';
import Signup from './pages/users/Signup';
import Home from './pages/home/Home';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Router>
        <main className='bg-slate-100 min-h-screen'>
          <Routes>
            <Route path="/login"
              element={isAuthenticated ? <Home /> : <Signup />}
            />

            <Route path="/"
              element={
                <Home />
              }
            />
            
            {/* Rutas Protegidas */}
            <Route
              path="/profile/:id"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
