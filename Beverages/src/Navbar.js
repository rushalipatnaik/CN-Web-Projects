import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className='navbar'>
      <div className='nav-center'>
        <a href='/'><p className='logo'>Bever</p></a>
        <ul className='nav-links'>
          <a href='/'>
            home &nbsp;
          </a>
          <a href='/about'>
            about
          </a>
        </ul>
      </div>
    </nav>
  )
}