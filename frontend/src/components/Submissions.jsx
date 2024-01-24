import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/localStorage";

function Submissions() {
  const [problemss, setProblemss]= useState(null);

  const getData = async () => {
    const { data } = await axios.get(`${API_BASE_URL}submissions/all`);
    setProblemss(data.sub);
  };
  const navigate= useNavigate();

  useEffect(() => {
    getData();
  },[]);
  const clickHandler= (id)=>{
    navigate(`/submissions/${id}`);
  }
  return (
    <div className="h-screen w-full bg-gray-100 flex justify-center">
    {problemss ?
    (
      <div className=" w-[1000px] mt-1 container mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Submissions</h1>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-white">
              <th className="py-2 px-4 border-b text-left">Problem title</th>
              <th className="py-2 px-4 border-b text-left">User email</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {problemss.map((problem, index) => (
              <tr onClick = {()=> clickHandler(problem._id)}  key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} `}>
                <td className="py-2 px-4 border-b font-semibold">{problem.problemId.title}</td>
                <td className="py-2 px-4 border-b">{problem.userId.email}</td>
                <td className={`py-2 px-4 border-b `}>
                  <p className={ `${!problem.status ? 'bg-red-500' :  'bg-green-500'} text-black rounded-lg px-4 py-1 w-[100px]`}>
                  {problem.status? "Correct" : "Wrong"}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
      : (
        <p className="flex items-center justify-center">Loading...</p>
      )}
    </div>
  )
}
export default Submissions;