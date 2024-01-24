/* eslint-disable react/prop-types */
import { useState } from 'react';
import { logout } from '../utils/localStorage';
import { Link, useNavigate } from 'react-router-dom';
const Navbar = ({isLoggedIn, setIsLoggedIn}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate= useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const onLogin = ()=>{
    // login page
    navigate("/signin")
  };
  const onLogout = ()=>{
    // logout function, isloggedin false
    logout();
    setIsLoggedIn(false);
    navigate("/");
  };
  const onProblems = ()=>{
    //problems page
    navigate("/problems");
  };
  const onProfile = ()=>{
    // profile page
    navigate("profile");
  };
  const onSubmissions = ()=>{
    //submissions page
    navigate("submissions");
  };
  const onExplore = ()=>{
    //home page
    alert("functionality to be introduced");
  };


  return (
    <nav className="bg-white text-gray-800 p-4 flex items-center justify-between shadow text-[18px]">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
        <img src="https://user-images.githubusercontent.com/63964149/152531278-5e01909d-0c2e-412a-8acc-4a06863c244d.png" alt="Logo" className="w-8 h-8 mr-2" />
        <span className='text-xl font-semibold'>Peetcode</span>
        </Link>
      {/* Navigation Options - Desktop */}
      <div className="hidden md:flex space-x-4 px-10">
        <button onClick={onProblems} className="hover:bg-gray-200 px-3 py-2 rounded">Problems</button>
        <button onClick={onSubmissions} className="hover:bg-gray-200 px-3 py-2 rounded">Submissions</button>
        {isLoggedIn && <button onClick={onProfile} className="hover:bg-gray-200 px-3 py-2 rounded">Profile</button>}
        
      </div>
      </div>
      <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn && ( <span className=" px-5 ">Hi, User</span>)}
              {isLoggedIn ? (
                <button onClick={onLogout} className="hover:bg-gray-200 px-3 py-2 rounded ">Logout</button>
              ) : (
                <button onClick={onLogin} className="hover:bg-gray-200 px-3 py-2 rounded ">Login</button>
              )}
              <button onClick={onExplore} className="bg-yellow-500 text-yellow-800 px-4 py-2 rounded-full">
                Premium
              </button>
        </div>
        
      {/* Hamburger Menu - Mobile */}
      <div className="md:hidden flex">
        {isLoggedIn && ( <span className=" px-10 ">Hi, User</span>)}
      
        <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
          {isMenuOpen ? <svg  className="w-4 h-4" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="100" x2="100" y2="0" strokeWidth="6" stroke="black"/>
            <line x1="0" y1="0" x2="100" y2="100" strokeWidth="6" stroke="black"/>
          </svg> :
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
          }
        </button>
        </div>              
      {/* Hamburger Menu Content - Mobile */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 right-0 w-40 bg-white px-4  pb-2">
          <div className="flex flex-col space-y-2 ">
            
            <button onClick={onProblems} className="text-left hover:bg-gray-200 px-3 py-2 rounded">Problems</button>
            <button onClick={onSubmissions} className="text-left hover:bg-gray-200 px-3 py-2 rounded">Submissions</button>
            {isLoggedIn && <button onClick={onProfile} className="text-left hover:bg-gray-200 px-3 py-2 rounded">Profile</button>}
              {isLoggedIn ? (
                <button onClick={onLogout} className=" text-left hover:bg-gray-200 px-3 py-2 rounded ">Logout</button>
              ) : (
                <button onClick={onLogin} className=" text-left hover:bg-gray-200 px-3 py-2 rounded">Login</button>
              )}
              <button onClick={onExplore} className=" text-left bg-yellow-500 text-yellow-800 px-3 py-1 rounded-md">
                Premium
              </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
