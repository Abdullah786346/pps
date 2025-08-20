//import React from 'react';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HomeTiles from './components/HomeTiles';
import Mission from './components/Mission';
import Membership from './components/Membership';
import News from './components/News';
import Footer from './components/Footer';

// Pages
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Dashboard from './components/pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './components/pages/ForgotPassword';
import About from './components/pages/About';
import Commetties from './components/pages/Commetties';
import Eventup from './components/Eventup';
import Publicationspoul from './components/pages/Publicationspoul';
import BoardOfDirectors from './components/pages/BoardOfDirectors';
import  ExecutiveBoard from './components/pages/ExecutiveBoard'; // Fixed import

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <Routes>
        
          <Route
            path="/"
            element={
              <>
                <Hero />
                <section id="resources">
                  <Mission />
                </section>
                <section id="aabout">
                  <HomeTiles />
                </section>
                <section id="membership">
                  <Membership />
                </section>
                <section id="news">
                  <News />
                </section>
                <section id="contact">
                  <Footer />
                </section>
              </>
            }
          />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/commetties" element={<Commetties />} />
          <Route path="/Eventup" element={<Eventup />} />
          <Route path="/Publicationspoul" element={<Publicationspoul />} />
          <Route path="/board-of-director" element={<BoardOfDirectors />} />
          <Route path="/executive-board" element={<ExecutiveBoard />} />

          {/* Protected Route */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;