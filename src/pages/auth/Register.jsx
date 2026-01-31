import React from 'react'
import { useState } from "react"
import RegisterImage from "../../assets/Registerpage.png"
import { RiGraduationCapFill } from "react-icons/ri";
import { MdOutlineFileUpload } from "react-icons/md";
import { Link } from 'react-router-dom';
import { registerUser } from "../../services/authService"
import { useNavigate } from "react-router-dom"


import './Register.css'

function Register() {
  const [role, setRole] = useState("")
  const [team, setTeam] = useState("")
  const [skill, setSkill] = useState("")
  const [photo, setPhoto] = useState(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const navigate = useNavigate()


  const handleFileChange = (e) => {
    setPhoto(e.target.files[0])
  }

  const handleNameBlur = () => {
        if(name.trim() === ""){
             setNameError("Required*")
        }
        else {
            setNameError("")
        }
  }

  const handleEmailBlur = () => {
    if(!email.includes("@")){
            setEmailError("Valid email required*")
    }else {
            setEmailError("")
    }
  }

  const handleSubmit = async(e) => {
        e.preventDefault()

        let valid = true

        if(name.trim() === ""){
            setNameError("Required*");
            valid = false;
        }
        if(!email.includes("@")){ 
            setEmailError("Valid Email Required*");
            valid = false;
        }    
        if(!role){
            alert("Please select role");
            valid = false;
        }

        if(role === "student" && !team){
            alert("Please Select team");
            valid = false
        }

        if(!photo){
            alert("Please upload profile photo")
            valid = false
        }

        if(!valid) return

        const formData = new FormData();
        formData.append("name", name)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("role", role)
        formData.append("team", team)
        formData.append("skill", skill)
        formData.append("photo", photo)

        try{
           const res = await registerUser(formData)
            alert("registration Successfull")
            navigate("/login")
        }catch(err){
            alert(err.response?.data?.messsage || "Registration Failed")
        }

    }
  return (
    <div>
      <div className="bg-container-register">
        <div className="left-box">
            <div className='left-image mt-4'>
                <img src={RegisterImage} alt='register-image' className='register-left-image'></img>
            </div>

            <div className='text-content-register'>
                <p className='join-the-community'>Join the community</p>
                <p className='register-description'>Collaborate with peers, contribute to research, and build your careers.</p>
            </div>
        </div>
        <div className="right-box">
            <div className='upper-part-form'>
                <RiGraduationCapFill size={40} />
                <span className='edu-growth-logo-heading'>EDU Growth</span>
                <p className='create-your-account'>Create your account</p>
                <p className='start-your-journey'>Start your journey with EDU Growth Portal</p>
            </div>

             <form id="myForm" onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label>Full Name</label>
                    <input type="text" value={name} className="form-control" onChange={(e) => setName(e.target.value)} onBlur={handleNameBlur} />
                   {nameError && <small className='text-danger'>{nameError}</small>}
                </div>

                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" value={email} className="form-control" onChange={(e) => setEmail(e.target.value)} onBlur={handleEmailBlur} />
                    {emailError && <small className='text-danger'>{emailError}</small>}
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <input type="password" value={password} className="form-control" onChange={(e) => setPassword(e.target.value)} />
                    <p id='passwordErrorMsg'></p>
                </div>

                <div className="mb-3">
                    <label>Select Your Role</label>
                    <select className="form-control" value={role} onChange={(e) => {
                        setRole(e.target.value)
                        setTeam("") 
                    }}>
                    <option value="">Choose role</option>
                    <option value="student">Student</option>
                    <option value="subadmin">Sub Admin</option>
                    <option value="admin">Admin</option>
                    </select>
                </div>

                
                {role !== "admin" && (
                    <div className="mb-3">
                    <label>Select Team</label>
                    <select
                        className="form-control"
                        value={team}
                        onChange={(e) => setTeam(e.target.value)}
                    >
                        <option value="">Choose your team</option>
                        <option value="research">Research Team</option>
                        <option value="linkedin">LinkedIn Team</option>
                        <option value="company">Company Approach Team</option>
                        <option value="events">Hackathon & Events Team</option>
                        <option value="tech">Tech Team</option>
                        <option value="notion">Notion & Sheets Team</option>
                        <option value="projects">Projects Team</option>
                    </select>
                    </div>
                )}

                 <div className="mb-3">
                    <label>Primary Skill</label>
                    <select className="form-control" value={skill} onChange={(e) => setSkill(e.target.value)}>
                    <option value="">Select your primary skill</option>
                    <option value="frontend">Frontend Development</option>
                    <option value="backend">Backend Development</option>
                    <option value="uiux">UI/UX Design</option>
                    <option value="data">Data Analysis</option>
                    <option value="ml">Machine Learning</option>
                    <option value="marketing">Marketing</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label>Profile Photo</label>

                    <div className="p-4 mt-3 mb-2 text-center select-image" onClick={() => document.getElementById("photoInput").click()}>
                        <p className="mb-1"><MdOutlineFileUpload size={25}/> <br></br><span>Click to upload</span></p>
                        {photo && <small>{photo.name}</small>}
                    </div>

                    <input type="file" id="photoInput" className='d-none' accept="image/*"  onChange={handleFileChange}/>
                </div>

        
                <button className="btn btn-primary w-100">Create Account</button>

            </form>
            <p className='mt-2 mb-3 already-have-an-account'>Already have an account?
                <Link to='/login' id=''>Sign in</Link>
            </p>

        </div>
      </div>
    </div>
  )
}

export default Register
