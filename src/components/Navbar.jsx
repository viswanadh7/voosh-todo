import React from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../utils/Auth'

function Navbar() {
    const location = useLocation()
    const auth = useAuth()
    return (
        <nav className='h-14 flex justify-between items-center px-5 bg-blue-700 text-white'>
            <h1 className='text-2xl font-semibold'>Voosh</h1>
            <button onClick={() => { auth.logout(); window.location.reload() }} className={location.pathname == '/home' ? 'bg-red-500 px-5 py-1 rounded-lg' : 'hidden'}>Logout</button>
        </nav>
    )
}

export default Navbar
