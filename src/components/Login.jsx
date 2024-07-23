import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import instance from '../utils/instance';

import { ToastContainer, toast } from 'react-custom-alert';
import 'react-custom-alert/dist/index.css';

function sendLoginUser(user) {
    return instance.post('/login', user)
}
function sendGoogleUser(user) {
    return instance.post('/google-login', user)
}
function Login() {
    const navigate = useNavigate()
    const [userLogin, setUserLogin] = useState({ email: "", password: "" })

    const { mutate } = useMutation({
        mutationFn: () => sendLoginUser(userLogin),
        onSuccess: (response) => { sessionStorage.setItem('userID', response.data); console.log("login success"); navigate('/') },
        onError: (error) => toast.error(error.response.data)
    });

    const { mutate: googleUserLogin } = useMutation({
        mutationFn: (user) => sendGoogleUser(user),
        onSuccess: (response) => {
            sessionStorage.setItem("userID", response.data);
            console.log("login success");
            navigate("/");
        },
        onError: (error) => console.log(error.message)
    });
    return (
        <div className='flex justify-center w-screen'>
            <div className='w-full px-10 md:px-0 md:w-1/2 lg:w-1/3'>
                <h1 className='text-xl font-semibold mt-10 mb-3 text-blue-600'>Login</h1>
                <form onSubmit={(e) => { e.preventDefault(); mutate() }} className='flex flex-col gap-5 p-5 border-2 border-blue-600 rounded-lg shadow-lg' action="">
                    <input required onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })} value={userLogin.email} className='border px-2 py-1 rounded' type="email" name="" id="" placeholder='Email' />
                    <input required onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })} value={userLogin.password} className='border px-2 py-1 rounded' type="password" name="" id="" placeholder='Password' />
                    <input className='bg-blue-600 text-white py-1 rounded' type="submit" value="Login" />
                    <Link to='/register' className='mx-auto'>Dont have an account? <span className='text-blue-600 underline'>Sign Up</span></Link>
                    <div className="flex justify-center">
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                const decoded = jwtDecode(credentialResponse.credential)
                                googleUserLogin({ email: decoded.email })
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </div>
                </form>
            </div>
            <ToastContainer floatingTime={5000} />
        </div>
    )
}

export default Login
