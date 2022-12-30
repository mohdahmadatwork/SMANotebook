import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import AlertContext from '../context/alert/AlertContext'
export default function Login() {
    const context = useContext(AlertContext)
    const {showAlert} = context;
    const [credentials,setCredentials] = useState({email:"",password:""});
    let navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json = await response.json();
        console.log(json)
        if(json.success){
            localStorage.setItem('auth-token',json.authtoken);
            navigate("/");
            showAlert("Login successfully as "+credentials.email,"success")
        }else{
            alert("Invalid Credentials")
        }
        setCredentials({email:"",password:""})
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <div className='container' onSubmit={handleLogin}>
            <h1 className='my-3'>Login to continue to SMANotebook</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label" >Email address</label>
                    <input type="email" className="form-control" id="email1" name="email"aria-describedby="emailHelp" onChange={onChange} value={credentials.email} required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={credentials.password} required />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}
