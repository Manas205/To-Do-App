import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
function LoginUser()
{
    const navigate=useNavigate()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [message,setMessage]=useState("")
    const handleLogin=async()=>
    {
        try {
            await axios.post("https://to-do-app-i0ay.onrender.com/api/auth/login",
                {email,
                password},
                {
                    withCredentials:true
                }
            )
            setMessage("Logged in successfully")
            setEmail("")
            setPassword("")
            navigate('/tasks')
        } catch (error) {
            setMessage(
        error.response?.data?.message || "Login failed"
    );
        }
    }
    return(
        <div>
            <h2>Login</h2>
            <input placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <p>{message}</p>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}
export default LoginUser