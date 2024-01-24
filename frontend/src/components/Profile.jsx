import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL, getToken } from "../utils/localStorage";
import logo from '../assets/profile.png';
function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Assuming you have an API endpoint to fetch user data
    const fetchData = async () => {
      try {
        const tokenStr = getToken();
        const response = await axios.get(`${API_BASE_URL}user/me`, { headers: { "Authorization": `Bearer ${tokenStr}` } });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      {userData ? (
        <div className="bg-white p-9 rounded-lg shadow-lg ">
          <div className="flex flex-col items-center">
            <img
              src={logo} // Assuming profile picture URL is provided in user data
              alt="Profile"
              className="w-24 h-24 object-cover rounded-full mb-4"
            />
            <div className="text-lg font-semibold mb-2">{userData.fullName}</div>
            <div className="text-gray-500 mb-2 ">{userData.email}</div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
