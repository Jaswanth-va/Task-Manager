import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./register.css";
import {useNavigate} from "react-router-dom"

export default function RegisterPage(){
    const [name, setName] = useState("");
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [token, setToken] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [signupError, setSignupError] = useState(null);
    const navigate = useNavigate();
    function handleClick(e){
        e.preventDefault();
        setErrors(validate());
        setIsSubmit(true);
    }
    function validate(){
        const errors = {};
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!name) errors.name = "name is required";
        if(!email) {
            errors.email = "Email is required"
        }else if(!regex.test(email)){
            errors.email = "Enter a valid email"
        }
        if(!password) {
            errors.password = "Password is required";
        }
        else if(password.length<8){ 
            errors.password = "Password must be atleast 8 characters long";
        }
        if(confirmPassword.length>0 && password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
            errors.password = "Passwords do not match";
        }
        return (errors);
    }
    async function signUp(){
        try {
        const {data} =  await axios.post("https://task-manager-backend-lahn.onrender.com/api/v1/auth/register",{name,email,password});
        if(data.token){
            localStorage.setItem('token', data.token);
        }        
        setToken(data.token);
        setSignupError(null);
        navigate("/");
        } catch (error) {
            setSignupError(error.response.data.msg);
        }        
    }
    useEffect(()=>{
        if(Object.keys(errors).length===0 && isSubmit){
            console.log(name, email, password);
            setIsSubmit(false);
            setErrors({});
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            signUp();
        }
    },[errors])
    return(
        <div  className="signup-page">
           {signupError && <div className="signup-error"><p>{signupError}</p></div>}
        <div className="signup-card">
            <form className="signup-form">
                <input className="signup-input" type="text" value={name} placeholder="User name"
                onChange={(e)=>{setName(e.target.value)}}/>
                {errors.name && <p className="form-error">{errors.name}</p>}
                <input className="signup-input" type="email" value={email} placeholder="Email"
                onChange={(e)=>{setEmail(e.target.value)}}/>
                {errors.email && <p className="form-error">{errors.email}</p>}

                <input className="signup-input" type="password" value={password} placeholder="Password"
                onChange={(e)=>{setPassword(e.target.value)}}/>
                {errors.password && <p className="form-error">{errors.password}</p>}    

                 <input className="signup-input" type="password" value={confirmPassword} placeholder="Confirm password"
                onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                {errors.confirmPassword && <p className="form-error">{errors.confirmPassword}</p>}
                <button className="signup-button" onClick={handleClick}>Sign up</button>
                <p>Already a user  <Link to="/login"> login</Link></p>
            </form>
        </div>
    </div>
    )
}



