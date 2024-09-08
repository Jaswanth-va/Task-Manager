import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// async function checkToken(){
//   try {
//       const {data} = await axios
//   } catch (error) {
    
//   }
// }

function checkToken(){
  const token = localStorage.getItem('token');
  // const cookie = document.cookie
  if (token ) {
    return token;
  }
  return null;
}

export default function PrivateRoute(){
  const token = checkToken();   
  const navigate = useNavigate();
  async function verifyToken(){
    try {
      const {data} = await axios.get("http://localhost:5000/",{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data.token, "jaswanth");
      if(data.token){        
        localStorage.setItem('token', data.token);
      }
    } catch (error) {
      navigate("/login")
    }
  }
  useEffect(()=>{
    verifyToken();
  },[])
  return(
    token ? <Outlet/> : <Navigate to="/login"/> 
  )
}