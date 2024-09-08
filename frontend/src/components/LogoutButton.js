import { useEffect } from "react";
import "./logout.css";
import { useNavigate } from "react-router-dom";

export default function LogoutButton(){
    const navigate = useNavigate();
    function handleClick(){
        localStorage.removeItem("token");
        navigate("/login");
        console.log("jas");
        
    }
    return(
        <div className="log-out">
            <button className="log-out-button" onClick={handleClick}>
                Log out
            </button>
        </div>
    )
}