import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
    return (
        <div className='flex justify-center w-screen'>
            <div className='w-1/3'>
                <h1 className='text-xl font-semibold mt-10 mb-3 text-blue-600'>Login</h1>
                <form className='flex flex-col gap-5 p-5 border-2 border-blue-600 rounded-lg shadow-lg' action="">
                    <input className='border px-2 py-1 rounded' type="email" name="" id="" placeholder='Email' />
                    <input className='border px-2 py-1 rounded' type="password" name="" id="" placeholder='Password' />
                    <input className='bg-blue-600 text-white py-1 rounded' type="submit" value="Login" />
                    <Link to='/register' className='mx-auto'>Dont have an account? <span className='text-blue-600 underline'>Sign Up</span></Link>
                    <button className='bg-blue-600 text-white w-1/2 mx-auto rounded py-1'>Login with <span className='font-semibold'>Google</span></button>
                </form>
            </div>
        </div>
    )
}

export default Login
