import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Function to close mobile menu
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg py-4 px-4 md:px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          
          {/* Logo and Brand */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center">
              <img
                src="/assets/logo.jpg"
                alt="Logo"
                className="w-12 h-12 object-cover mr-3 rounded"
              />
              <div>
                <div className="text-xl font-bold text-darkgrey">Poultry Professionals Society PPS</div>
                <div className="text-sm text-crimson">Competency is the Excellency</div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links and Login */}
          <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full md:w-auto mt-4 md:mt-0`}>
            <div className="flex flex-col md:flex-row md:space-x-8 w-full text-center">
              <Link 
                to="/" 
                onClick={closeMobileMenu}
                className="py-2 px-4 text-darkgrey hover:bg-brown hover:text-purewhite rounded-lg font-medium text-center"
              >
                Home
              </Link>
              <Link 
                to="/#about" 
                onClick={closeMobileMenu}
                className="py-2 px-4 text-darkgrey hover:bg-brown hover:text-purewhite rounded-lg font-medium text-center"
              >
                About
              </Link>
              <Link 
                to="/#membership" 
                onClick={closeMobileMenu}
                className="py-2 px-4 text-darkgrey hover:bg-brown hover:text-purewhite rounded-lg font-medium text-center"
              >
                Membership
              </Link>
              <Link 
                to="/#news" 
                onClick={closeMobileMenu}
                className="py-2 px-4 text-darkgrey hover:bg-brown hover:text-purewhite rounded-lg font-medium text-center"
              >
                Events
              </Link>
              <Link 
                to="/#resources" 
                onClick={closeMobileMenu}
                className="py-2 px-4 text-darkgrey hover:bg-brown hover:text-purewhite rounded-lg font-medium text-center"
              >
                Resources
              </Link>
              <Link 
                to="/#contact" 
                onClick={closeMobileMenu}
                className="py-2 px-4 text-darkgrey hover:bg-brown hover:text-purewhite rounded-lg font-medium text-center"
              >
                Contact
              </Link>
            </div>

            <div className="mt-4 md:mt-0 md:ml-8 flex">
            <button
  onClick={() => {
    closeMobileMenu();
    window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSfb7ogqT7BzBaB8Q6MXXGWSx6WLKG9Lmp0wSQz1AgnyN5bpZQ/viewform";
  }}
  className="bg-crimson hover:bg-darkgrey text-purewhite font-bold py-2 px-6 rounded-lg w-full md:w-auto"
>
  Member Login
</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;