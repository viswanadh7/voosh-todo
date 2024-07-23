import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

import { ToastContainer, toast } from 'react-custom-alert';
import 'react-custom-alert/dist/index.css';

function createNewUser(user) {
    return axios.post('http://localhost:8000/register', user)
}

function Register() {
    const navigate = useNavigate()
    const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', password: '' })
    const { mutate } = useMutation({
        mutationFn: () => createNewUser(newUser),
        onSuccess: () => {
            // toast.success('Registration successfull. Please login');
            // console.log("Registration successfull");
            navigate("/login");
        },
        onError: (error) => toast.error(error.response.data)
    });
    const { mutate: googleUserMutate } = useMutation({
        mutationFn: (newGoogleUser) => createNewUser(newGoogleUser),
        onSuccess: () => {
            // console.log("Registration successfull");
            navigate("/login");
        },
        onError: (error) => console.log(error.message)
    });
    function handleGoogleUser(decoded) {
        const newGoogleUser = { firstName: decoded.name, lastName: decoded.family_name, email: decoded.email }
        googleUserMutate(newGoogleUser)
    }
    return (
        <div className='flex justify-center w-screen'>
            <div className='w-full px-10 md:px-0 md:w-1/2 lg:w-1/3'>
                <h1 className='text-xl font-semibold mt-10 mb-3 text-blue-600'>Sign Up</h1>
                <form onSubmit={(e) => { e.preventDefault(); mutate() }} className='flex flex-col gap-5 p-5 border-2 border-blue-600 rounded-lg shadow-lg' action="">
                    <input onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} value={newUser.firstName} className='border px-2 py-1 rounded' type="text" name="" id="" placeholder='First Name' />
                    <input onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} value={newUser.lastName} className='border px-2 py-1 rounded' type="text" name="" id="" placeholder='Last Name' />
                    <input onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} value={newUser.email} className='border px-2 py-1 rounded' type="email" name="" id="" placeholder='Email' />
                    <input onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} value={newUser.password} className='border px-2 py-1 rounded' type="password" name="" id="" placeholder='Password' />
                    {/* <input className='border px-2 py-1 rounded' type="password" name="" id="" placeholder='Confirm Password' /> */}
                    <input className='bg-blue-600 text-white py-1 rounded' type="submit" value="SignUp" />
                    <Link to='/login' className='mx-auto'>Already have an account? <span className='text-blue-600 underline'>Login</span></Link>
                    <div className='flex justify-center'>
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                const decoded = jwtDecode(credentialResponse.credential)
                                handleGoogleUser(decoded)
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

export default Register
