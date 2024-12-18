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
        <main className=''>
          <Routes>
            <Route path="/login"
              element={isAuthenticated ? <Navigate to="/" /> : <Signup />}
            />

            <Route path="/"
              element={
                // <PrivateRoute>
                <Home />
                // </PrivateRoute>
              }
            />
            
            <Route
              path="/profile"
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
