import React from 'react'
import NavBar from './NavBar'
import Login from './Login'

function Home() {
  return (
    <div className='home'>
    <NavBar/>
    <div className='mt-5 pt-5'>
    <Login/>
    </div>
    </div>
  )
}

export default Home