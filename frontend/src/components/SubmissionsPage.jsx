import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/localStorage";

function SubmissionsPage() {
  const navigate = useNavigate();
  const getCurrentIdFromUrl = () => {
    const pathname = window.location.href;
    const lastSlashIndex = pathname.lastIndexOf("/");
    const id = pathname.substring(lastSlashIndex + 1);
    return id;
  };

  const id = getCurrentIdFromUrl();
  const [sub, setSub] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}submissions/${id}`);
        setSub(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [id]);

  const goBack = () => {
    navigate("/submissions");
  };

  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col items-center">
      {sub ? (
        <div className="w-full max-w-screen-sm mt-1 p-4 sm:p-6 bg-white shadow-lg rounded-lg">
          <div className="flex justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold mb-2">{sub.problemId.title}</h2>
              <p className="text-gray-600">Submitted by: {sub.userId.email} </p>
            </div>
            <button onClick={goBack} className="text-gray-500 hover:text-black">
              Back
            </button>
          </div>
          <div className="h-[calc(100vh-220px)] overflow-auto bg-black text-white p-4 rounded-lg mt-4">
            <pre>
              <code>{sub.code}</code>
            </pre>
          </div>
        </div>
      ) : (
        <p className="flex items-center justify-center">Loading...</p>
      )}
    </div>
  );
}

export default SubmissionsPage;
