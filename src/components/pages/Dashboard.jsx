// src/components/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showFormPrompt, setShowFormPrompt] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFormSubmission = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(userRef);
        
        if (docSnap.exists() && docSnap.data().formSubmitted) {
          setFormSubmitted(true);
        } else {
          // Show prompt after 2 seconds if not submitted
          setTimeout(() => {
            setShowFormPrompt(true);
          }, 2000);
        }
        setLoading(false);
      }
    };

    checkFormSubmission();
  }, []);

  const handleLogout = () => {
    auth.signOut();
    navigate('/login');
  };

  const handleFormSubmission = async () => {
    if (auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userRef, { formSubmitted: true }, { merge: true });
      setFormSubmitted(true);
      setShowFormPrompt(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 p-4 relative">
      {/* Google Form Prompt */}
      {showFormPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 md:p-8 animate-fade-in">
            <div className="text-center mb-6">
              <div className="bg-amber-100 text-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Welcome to Registration Form</h2>
              <p className="text-gray-600 mt-2">
                Please complete our registration form to finalize your membership
              </p>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700 text-center">
                This one-time form takes less than 2 minutes to complete.
              </p>
              
              <div className="flex flex-col gap-4">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfb7ogqT7BzBaB8Q6MXXGWSx6WLKG9Lmp0wSQz1AgnyN5bpZQ/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-amber-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-amber-700 transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  </svg>
                  Open Registration Form
                </a>
                
                <button
                  onClick={handleFormSubmission}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  I've Completed the Form
                </button>
                
                <button
                  onClick={() => setShowFormPrompt(false)}
                  className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition"
                >
                  Remind Me Later
                </button>
              </div>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                Note: You'll need to complete this form to join PPS.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Content */}
      <div className={`w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center transition-all duration-300 ${showFormPrompt ? 'opacity-30' : 'opacity-100'}`}>
        {!formSubmitted ? (
          <>
            <div className="mx-auto mb-6">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-3">Welcome!</h1>
            <p className="text-gray-600 mb-6">
              {showFormPrompt ? 'Complete the registration form to continue' : 'Please complete the registration form to access all features'}
            </p>
            
            {!showFormPrompt && (
              <button
                onClick={() => setShowFormPrompt(true)}
                className="bg-amber-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-amber-700 transition duration-300 mb-8 w-full"
              >
                Complete Registration Form
              </button>
            )}
            
            <div className="bg-gray-50 p-4 rounded-lg text-left">
              <h3 className="font-medium text-gray-800 mb-2">Account Status</h3>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${formSubmitted ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                <span>{formSubmitted ? 'Form Completed' : 'Form Pending'}</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mx-auto mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-3">Welcome Back!</h1>
            <p className="text-gray-600 mb-6">Thank you for completing our registration form. We'll contact you soon.</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-amber-50 p-4 rounded-lg">
                <div className="text-amber-600 font-bold text-xl">15</div>
                <div className="text-gray-600 text-sm">New Messages</div>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <div className="text-amber-600 font-bold text-xl">3</div>
                <div className="text-gray-600 text-sm">Notifications</div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg text-left mb-6">
              <h3 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Registration Status
              </h3>
              <p className="text-sm text-gray-600">Completed on {new Date().toLocaleDateString()}</p>
            </div>
          </>
        )}
        
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-lg font-medium hover:from-amber-600 hover:to-amber-700 transition duration-300 shadow-md hover:shadow-lg w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;