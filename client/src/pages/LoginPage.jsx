import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login(){
    const[email,setEmail]= useState('')
    const[password,setPassword]= useState('')
    const navigate = useNavigate(); 
    
    async function loginUser(event) {
        event.preventDefault()
        const response = await fetch ('http://localhost:1337/api/login', {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            }),
        })

        const data = await response.json()

        if (data.status === 'ok') {
            console.log('login ok')
            navigate('/pages/home')
        } 
        else {
            console.log('login error')
        }
       
        console.log(data)
    }


    return(
        <div 
        // className="flex items-center justify-center min-h-screen"
        >
            <div 
            // className="w-full max-w-md p-5"
            >
            <form onSubmit={loginUser} className="flex flex-col p-5 space-y-5 border border-gray-200 rounded-lg shadow-xl bg-black/80 backdrop-blur-xl">
            <p className="text-[25px] tracking-[3px] text-gray-100 font-bold text-center">Login</p>

                <div>
                    <label for="email" className="w-full mb-2 font-semibold text-gray-100 sm:w-24 sm:mb-0">Email:</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="Email" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                    <label for="password" className="w-full mb-2 font-semibold text-gray-100 sm:w-24 sm:mb-0">Password:</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" placeholder="Password" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <button type="submit" className="px-4 py-2 mt-4 font-semibold text-white transition duration-300 bg-blue-500 rounded hover:bg-blue-600">
                Login
                </button>

                <div className="text-center">
                        <label className="font-semibold text-gray-100">All ready have an account : </label>
                        <a onClick={() => navigate('/pages/register')} 
                           className="ml-2 font-semibold duration-100 text-gray-100 hover:text-blue-200 ">
                            Register
                        </a>
                </div>

            </form>
            </div>
        </div>
    )
}

export default Login;