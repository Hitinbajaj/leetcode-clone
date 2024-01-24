import axios from "axios";
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { API_BASE_URL, getToken } from "../utils/localStorage";

function ProblemDetails() {
  const getCurrentIdFromUrl = () => {
    const pathname = window.location.href;
    const lastSlashIndex = pathname.lastIndexOf("/");
    const id = pathname.substring(lastSlashIndex + 1);
    return id;
  };

  const id = getCurrentIdFromUrl();
  const [problem, setProblem] = useState({});
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput]= useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${API_BASE_URL}problems/${id}`);
      setProblem(response.data);
    };
    getData();
  }, [id]);

  const handleRun = async() => {
    // Implement run functionality here
    
    try{
        const tokenStr= getToken();
        console.log(input);

        const response = await axios.post(`${API_BASE_URL}execute/`, { input, code },{ headers: {"Authorization" : `Bearer ${tokenStr}`} });
        console.log(response.data);
        const fileUrl = response.data.result.run_status.output;
        console.log(fileUrl);
        alert("Program will take 10-20 seconds to compile and execute :)")
        fetch(fileUrl)
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text(); // or response.json() if it's a JSON file
        })
        .then(data => {
            setOutput(data);
            console.log('File content:', data);
            // Now you can use the file content as needed
        })
        .catch(error => {
            console.error('Error fetching file:', error);
        });

    }catch(err){
        alert("something went wrong / please log in");
    }
  };

  const handleSubmit =async () => {
    // Implement submit functionality here
    try{
        const tokenStr= getToken();
        const response = await axios.post(`${API_BASE_URL}submissions/submit`, { problemId:id, code },{ headers: {"Authorization" : `Bearer ${tokenStr}`} });
        alert(response.data);
    }catch(err){
        alert("something went wrong");
    }
  };

  return (
    <div className="sm:flex h-screen ">
      
      <div className="bg-gray-100 p-6  sm:w-1/2 rounded shadow-lg">
        <div>
            <h2 className="text-2xl font-bold mb-4">{problem.title}</h2>

            <p className="text-black text-[18px] mb-2">{problem.description}.</p>
            <p className="text-gray-700 mb-2 mt-6">
            <span className="font-semibold">Difficulty:</span> {problem.difficulty}
            </p>
            <p className="text-gray-700 mb-2">
            <span className="font-semibold">Acceptance:</span> {problem.acceptance}
            </p>
            <p className="text-gray-700 mb-2">
            <span className="font-semibold">Example Input:</span> {problem.exampleIn}
            </p>
            <p className="text-gray-700 mb-4">
            <span className="font-semibold">Example Output:</span> {problem.exampleOut}
            </p>
        </div>
        <div className="flex mt-20">
        <div className="bg-gray-100 p-6 flex-grow">
          {/* Input box */}
          <h3 className="text-xl font-bold mb-4">Input</h3>
          <textarea
            className="w-full h-32 p-2 border rounded"
            placeholder="Enter input here..."
            style={{resize: "none"}}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
        </div>
        
        <div className="bg-gray-100 p-6 flex-grow">
          {/* Output box */}
          <h3 className="text-xl font-bold mb-4">Output</h3>
          <textarea
            className="w-full h-32 p-2 border rounded"
            placeholder="Output will appear here..."
            value={output}
            style={{resize: "none"}}
            readOnly
          ></textarea>
        </div>
      </div>

      </div>
      <div className="flex-grow  bg-gray-100 sm:w-1/2 ">
        <Editor
          width="100%"
          height="550px"
          theme="vs-dark"
          defaultLanguage={"c++"}
          defaultValue={"// Code C++ here //"}
          onChange={(value) => setCode(value)}
        />
        <div className="p-3 flex justify-center items-center">
            <button
            className="bg-gray-800 text-white px-4 py-2 rounded mr-4"
            onClick={handleRun}
            >
            Run
            </button>
            <button
            className="bg-green-600 text-white px-4 py-2 rounded mr-4"
            onClick={handleSubmit}
            >
            Submit
            </button>
        </div>
      </div>
    </div>
  );
}

export default ProblemDetails;
