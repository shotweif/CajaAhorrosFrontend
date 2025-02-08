import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Profile from './pages/account/Profile';
import Signup from './pages/users/Signup';
import Home from './pages/home/Home';
import NotFound from './pages/notFound/NotFound';
import AboutUs from './pages/others/AboutUs';
import InfoPage from './pages/others/InfoPage';

function App() {
  let { isAuthenticated } = useAuth();

  return (
    <>
      <Router>
        <main className='bg-gray-100 min-h-screen'>
          <Routes>
            <Route path="/login"
              element={isAuthenticated ? <Home /> : <Signup />}
            />

            <Route path="/" element={ <Home /> } />
            <Route path="/about-us" element={ <AboutUs /> } />
            <Route path="/banknet" element={ <InfoPage /> } />


            {/* Rutas Protegidas */}
            <Route
              path="/profile/:id"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            {/* Rutas 404 */}
            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/404" element={<NotFound />} /> 

          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
