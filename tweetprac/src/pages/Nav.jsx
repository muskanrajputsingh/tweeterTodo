import React from 'react';
import './nav.css';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
const Nav = () => {
  const url = "https://tweetertodobackend.onrender.com";
  
  const [profile,setProfile]=useState([]);
  useEffect(() => {
    fetch(`${url}/api/profile`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
            return response.json();
        })
        .then(data => {
            setProfile(data);
        })
        .catch(err => {
            console.log(err);
        });
}, []);
  return (
    <>
      <nav>
        <div className="nav-left">
          <img src="https://res.cloudinary.com/dyntugwaq/image/upload/v1714491459/leaf5-removebg-preview_f4eb9e.png" height="50px" width="300px" alt="logo" />
          <ul>
            <li><i className="fa-solid fa-bell fa-60px"></i></li>
            <li><Link to="/" style={{color:"black"}}><i class="fa-solid fa-house"></i></Link></li>
            <li><Link to="/profile" style={{color:"black"}}><i class="fa-solid fa-user"></i></Link></li>
          </ul>
        </div>
        <div className="nav-right">
          <div className="search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="search" />
          </div>
          <div className="online">
            <div className="user">
            {
                profile.map((prof,index)=>(
                  <img key={index} src={prof.imag} height="90px" width="90px" alt="User profile" />
                ))
              }
             
            </div>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Nav
