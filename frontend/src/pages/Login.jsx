import { useState,useContext } from "react";
import { useNavigate,Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Login(){

const {login} = useContext(AuthContext);

const navigate = useNavigate();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleLogin = async(e)=>{

e.preventDefault();

if(!email || !password){

toast.error("All fields are required");

return;

}

try{

const res = await API.post("/auth/login",{
email,
password
});

login(res.data.token);
// save user info
localStorage.setItem("user", JSON.stringify(res.data.user));

toast.success("Login successful");

navigate("/dashboard");

}catch(error){

toast.error("Invalid email or password");

}

};

return(

<div className="min-h-screen flex items-center justify-center bg-gray-100">

<form
onSubmit={handleLogin}
className="bg-white p-8 rounded-xl shadow-md w-96"
>

<h2 className="text-2xl font-bold mb-6 text-center">
Login
</h2>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="border p-3 rounded w-full"
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="border p-3 rounded w-full mt-4"
/>

<button
type="submit"
className="bg-blue-600 text-white w-full p-3 rounded mt-6 hover:bg-blue-700"
>
Login
</button>

<p className="text-center mt-4">

Don't have an account?

<Link to="/signup" className="text-blue-600 ml-1">
Signup
</Link>

</p>

</form>

</div>

);

}