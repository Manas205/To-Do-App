import {useState} from "react"
import axios from "axios"
function RegisterForm()
{
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [message,setMessage]=useState("")
    const handleRegister=async()=>
    {
        try
        {
            await axios.post("https://to-do-app-i0ay.onrender.com/api/auth/register",{
                name,
                email,
                password
            });
            setMessage("User registered successfully")
            setName("")
            setEmail("")
            setPassword("")
        }
        catch(error)
        {
            console.log(error)
            setMessage(error.message)
        }
    }
    return(
    <div>
        <h2>Register</h2>
        <input placeholder="Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />
        <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={handleRegister}>Register</button>
        <p>{message}</p>
    </div>
)
};

export default RegisterForm