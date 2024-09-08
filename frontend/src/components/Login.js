import {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import "./login.css";
import { useNavigate } from "react-router-dom";
const url = "http://localhost:3000";

export default function LoginPage({}){
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const navigate = useNavigate();
    function handleLogin(e){
        e.preventDefault();
        setErrors(validate());
        setIsSubmit(true);
    }
    function validate(){
        const errors = {};
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!email) {
            errors.email = "Email is required"
        }else if(!regex.test(email)){
            errors.email = "Enter a valid email"
        }
        if(!password) {
            errors.password = "Password is required";
        }
        return (errors);
    }
    async function login(){
            try {
                const {data} =  await axios.post(`${url}/api/v1/auth/login`,{email,password});
                if(data.token){
                    localStorage.setItem('token', data.token);
                }
                setToken(data.token);
                setLoginError(null);
                navigate("/");
            } catch (error) {
                setLoginError(error.response.data.msg);
                console.log(error);
            }           
        }                
    useEffect(()=>{
        if(Object.keys(errors).length===0 && isSubmit){
            console.log(email, password);
            setIsSubmit(false);
            setErrors({});
            setEmail("");
            setPassword("");
            login();
        }
    },[errors])
    return(
        <div  className="login-page">
            {loginError && <div className="login-error"><p>{loginError}</p></div>}
            <div className="login-card">

                <form className="login-form">
                    <input className="login-input" type="email" value={email} placeholder="Email"
                    onChange={(e)=>{setEmail(e.target.value)}}/>
                    {errors.email && <p className="form-error">{errors.email}</p>}


                    <input className="login-input" type="password" value={password} placeholder="Password"
                    onChange={(e)=>{setPassword(e.target.value)}}/>

                    {errors.password && <p className="form-error">{errors.password}</p>}    


                    <button className="login-button" onClick={handleLogin}>login</button>
                <p>Don't have an account <Link to="/register">register</Link></p>
                </form>

            </div>
        </div>
    )
}
