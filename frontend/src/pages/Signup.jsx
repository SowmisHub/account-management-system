import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

export default function Signup(){

const navigate = useNavigate();

const [form,setForm] = useState({
name:"",
email:"",
password:""
});

const [errors,setErrors] = useState({});

const validate = () => {

let newErrors = {};

if(!form.name.trim())
newErrors.name = "Name is required";

if(!form.email.trim())
newErrors.email = "Email is required";

if(!form.password)
newErrors.password = "Password is required";

if(form.password.length < 6)
newErrors.password = "Password must be at least 6 characters";

setErrors(newErrors);

return Object.keys(newErrors).length === 0;

};

const handleChange = (e)=>{

setForm({
...form,
[e.target.name]:e.target.value
});

};

const handleSubmit = async(e)=>{

e.preventDefault();

if(!validate()) return;

try{

await API.post("/auth/signup",form);

toast.success("Account created successfully");

navigate("/");

}catch(error){

toast.error(
error.response?.data?.message || "Signup failed"
);

}

};

return(

<div className="min-h-screen flex items-center justify-center bg-gray-100">

<form
onSubmit={handleSubmit}
className="bg-white p-8 rounded-xl shadow-md w-96"
>

<h2 className="text-2xl font-bold mb-6 text-center">
Create Account
</h2>

<input
type="text"
name="name"
placeholder="Full Name"
value={form.name}
onChange={handleChange}
className="border p-3 rounded w-full"
/>

{errors.name && (
<p className="text-red-500 text-sm mt-1">
{errors.name}
</p>
)}

<input
type="email"
name="email"
placeholder="Email"
value={form.email}
onChange={handleChange}
className="border p-3 rounded w-full mt-4"
/>

{errors.email && (
<p className="text-red-500 text-sm mt-1">
{errors.email}
</p>
)}

<input
type="password"
name="password"
placeholder="Password"
value={form.password}
onChange={handleChange}
className="border p-3 rounded w-full mt-4"
/>

{errors.password && (
<p className="text-red-500 text-sm mt-1">
{errors.password}
</p>
)}

<button
type="submit"
className="bg-blue-600 text-white w-full p-3 rounded mt-6 hover:bg-blue-700"
>
Signup
</button>

<p className="text-center mt-4">

Already have an account?

<Link to="/" className="text-blue-600 ml-1">
Login
</Link>

</p>

</form>

</div>

);

}