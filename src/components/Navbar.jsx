import React from 'react'

function Navbar() {
    return (
        <nav className='h-14 flex justify-between items-center px-5 bg-blue-700 text-white'>
            <h1>Voosh</h1>
            <button className='bg-red-500 px-5 py-1 rounded-lg'>Logout</button>
        </nav>
    )
}

export default Navbar
