import Homepage from "./components/Homepage"
import {Routes, Route} from "react-router-dom";
import Problems from "./components/Problems";
import Submissions from "./components/Submissions";
import Profile from "./components/Profile";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { useState } from "react";
import Navbar from "./components/Navbar";
import { isLogin } from "./utils/localStorage";
import ProblemDetails from "./components/ProblemDetails";
import SubmissionsPage from "./components/SubmissionsPage";

function App() {
  const [isLoggedIn, setIsLoggedIn]= useState(isLogin());

  return (
      <div className="flex flex-col h-screen">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Routes> 
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/problems" element={<Problems />} />
        <Route exact path="/problems/:id" element={<ProblemDetails />} />
        <Route exact path="/submissions" element={<Submissions />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/signin" element={<Signin isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/submissions/:id" element={<SubmissionsPage />} />
      </Routes>
      </div>
  )
}
// no state management required

export default App
