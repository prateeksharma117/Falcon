import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./container/Home";
import { useEffect } from "react";
import { FetchUser } from "./Utils/FetchUser";



function App() {

  const navigate=useNavigate()

  useEffect(() => {
    const user=FetchUser()
    if (!user) navigate('/login')
  }, [])
  

  return (
    <>
        <Routes>
          <Route path="/*" element={<Home/>} />
          <Route path="login" element={<Login/>} />
        </Routes>
    </>
  );
}

export default App;
