import React from 'react'
import { Navigate } from 'react-router-dom'

function Redirect() {
    return (<Navigate to='/login' />)
}

export default Redirect
