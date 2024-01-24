import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, setToken } from '../utils/localStorage';

// eslint-disable-next-line react/prop-types
const Signin = ({setIsLoggedIn}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate =useNavigate();
  
  const handleSignIn = async () => {
    try {
      // Replace 'your-api-endpoint' with the actual endpoint of your REST API
      const response = await axios.post(`${API_BASE_URL}user/signin`, { email, password });
      if (response.data.token==null){
        alert("Something went wrong");
        return;
      }
      const token= response.data.token;

      setToken(token);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      alert("Something went wrong");
      // Handle error and display appropriate message to the user
    }
  };

  return (
    <>
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 mt-20 rounded shadow-md w-96">
        <div className="text-2xl font-semibold mb-6">Sign In</div>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Create a New Account Link */}
        <div className="text-blue-500 mb-4 cursor-pointer">
          <a href="/signup">Create a new account</a>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSignIn}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 focus:outline-none"
        >
          Sign In
        </button>

        {/* Back Icon */}
        <div className="flex items-center justify-center mt-4">
          <svg
            onClick={() => navigate("/")}
            className="w-6 h-6 cursor-pointer text-gray-500 hover:text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          <span className="ml-2 cursor-pointer text-gray-500 hover:text-gray-700" onClick={() => navigate("/")}>
            Back to Home
          </span>
        </div>
      </div>
    </div>

    </>
  );
};

export default Signin;
