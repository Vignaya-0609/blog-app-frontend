import React from 'react'
import NavBar from './NavBar'
import SignUp from "./SignUp";
function Register() {
  return (
    <div className='home'>
    <NavBar/>
    <div className='mt-5 pt-5'>
    <SignUp/>
    </div>
    </div>
  )
}

export default Register