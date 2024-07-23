import React from 'react'
import { useLocation } from 'react-router-dom'

function Navbar() {
    const location = useLocation()
    return (
        <nav className='h-14 flex justify-between items-center px-5 bg-blue-700 text-white'>
            <h1>Voosh</h1>
            <button onClick={() => { sessionStorage.clear() }} className={location.pathname == '/' ? 'bg-red-500 px-5 py-1 rounded-lg' : 'hidden'}>Logout</button>
        </nav>
    )
}

export default Navbar
