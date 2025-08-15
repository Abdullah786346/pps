import React, { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  const navItems = [
    { name: 'Home',
      dropdownItems: [
    { name: 'Our Mission', path: '/#mission' },
    { name: 'PPS Objectives', path: '/#objectives' },
    ]  },
    {
      name: 'About',
      dropdownItems: [
        
        { name: 'Board of Directors', path: '/board-of-director' },
    
        { name: 'Executive Board', path: '/executive-board' }
      ]
    },
    {
      name: 'Membership',
      dropdownItems: [
        { name: 'Benefits', path: '/#benefits' },
        { name: 'Apply Now', path: '/#apply' }
      ]
    },
    {
      name: 'Events',
      dropdownItems: [
        { name: 'Past Events', path: '/#past-events' },
        { name: 'Upcoming Events', path: '/#upcoming-events' }
      ]
    },
    {
      name: 'Resources',
      dropdownItems: [
        { name: 'Society Newsletter', path: '/#newsletter' },
        { name: 'Download', path: '/#download' }
      ]
    },
    { name: 'Contact', path: '/#contact' }
  ];

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
              {navItems.map((item, index) => (
                <div key={index} className="relative group">
                  {item.path ? (
                    <Link 
                      to={item.path} 
                      onClick={closeMobileMenu}
                      className="py-2 px-4 text-darkgrey hover:bg-brown hover:text-purewhite rounded-lg font-medium text-center block"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="py-2 px-4 text-darkgrey hover:bg-brown hover:text-purewhite rounded-lg font-medium text-center w-full md:w-auto"
                    >
                      <div className="flex items-center justify-center">
                        {item.name}
                        <svg 
                          className={`ml-1 h-4 w-4 transition-transform ${
                            openDropdown === item.name ? 'rotate-180' : ''
                          }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </button>
                  )}
                  
                  {/* Dropdown Menu */}
                  {item.dropdownItems && (
                    <div 
                      className={`${
                        (isMenuOpen && openDropdown === item.name) 
                          ? 'block' 
                          : 'hidden'
                      } md:group-hover:block md:absolute md:left-0 md:mt-0 w-full md:w-48 rounded-lg shadow-lg bg-white z-50`}
                    >
                      <div className="py-1">
                        {item.dropdownItems.map((dropdownItem, idx) => (
                          <Link
                            key={idx}
                            to={dropdownItem.path}
                            onClick={closeMobileMenu}
                            className="block px-4 py-2 text-darkgrey hover:bg-brown hover:text-purewhite text-center md:text-left"
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 md:mt-0 md:ml-8 flex">
              <button
                onClick={() => {
                  closeMobileMenu();
                  window.location.href = "https://forms.gle/yiwfSe5x5RGpR1u3A";
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