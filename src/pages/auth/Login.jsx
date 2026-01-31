import React from 'react'
import { useState } from 'react';
import './Login.css';
import { loginUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import RightImg from "../../assets/sign-in-img.png"
import { RiGraduationCapFill } from "react-icons/ri";

function Login() {
    const [role, setRole] = useState("student")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();



    const handleEmailBlur = ()=> {
        if(!email.includes("@")){
            setEmailError("Valid email required*")
        }
        else{
            setEmailError("")
        }
    }

    const handlePasswordBlur = () => {
        if(password.length < 6){
            setPasswordError("Minimum 6 characters required*");
        }else {
            setPasswordError("");
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        let valid = true;

        if(!email.includes("@")){
            setEmailError("Valid Email Error");
            valid = false;
        }
        if(password.length < 6){
            setPasswordError("Minimum 6 characters required*")
            valid = false;
        }

        if (!valid) return
        try{

           const res = await loginUser({ email, password, role })

           console.log("LOGIN RESPONSE:", res.data)

            localStorage.setItem("token", res.data.token)
            localStorage.setItem("user", JSON.stringify(res.data.user))

            navigate("/dashboard")
        }catch(err){
            console.log(err)

            const msg = err.response?.data?.message || err.message || "Login failed"
            alert(msg);
        }   
    }
  return (
    <div>
        <div className='bg-container-sign-in p-3'>
            <div className='left-box-sigin'>
                <div className='upper-part-form'>
                    <RiGraduationCapFill size={40} />
                    <span className='edu-growth-logo-heading'>EDU Growth</span>
                    <p className='welcome-back'>Welcome back</p>
                    <p className='sigin-to-your-acc'>Sign in to your account to continue</p>

                    <div className="role-toggle mb-3">
                        <button type="button" className={role === "student" ? "role-btn active" : "role-btn"}
                        onClick={() => setRole("student")}>Student</button>

                        <button type="button" className={role === "subadmin" ? "role-btn active" : "role-btn"}
                        onClick={() => setRole("subadmin")}>Sub-Admin</button>

                        <button type='button' className={role === "admin"? "role-btn-active" : "role-btn"}
                        onClick={() => setRole("admin")}>Admin</button>
                    </div>
                </div>
                <form id='myForm' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Email</label>
                        <input type="email"  className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={handleEmailBlur}/>
                        {emailError && <small className='text-danger'>{emailError}</small>}
                    </div>

                     <div className="mb-3">
                        <label>Password</label>
                        <input type="password" value={password}  className="form-control" onChange={(e) => setPassword(e.target.value)} onBlur={handlePasswordBlur} />
                        {passwordError && <small className='text-danger'>{passwordError}</small>}
                    </div>
                <button className="btn btn-primary w-100">Sign in as {role}</button>

            </form>
            <p className='mt-2 mb-3already-have-an-account'>Don't have an account?
                <Link to='/register' id='sign-in'>Sign up</Link>
            </p>
            </div>
            <div className='right-box-sigin'>
                <div className='right-image mt-4'>
                    <img src={RightImg} alt='sigin-image' className='signin-right-image'></img>
                </div>
                
                <div className='text-content-register'>
                    <p className='accelerate-your-growth text-center'>Accelerate Your Growth</p>
                    <p className='sigin-description text-center'>Access research, projects, events, and career opportunities all in one place.</p>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Login
