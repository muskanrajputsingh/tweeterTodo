import React, { useState } from 'react';
import './Registration.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Registration = () => {
  const url = "https://tweetertodobackend.onrender.com";
  const [user, setUser] = useState({ 
    username: "", 
    email: "", 
    phone: "", 
    password: "" });

  const handleInputs = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { username, email, phone, password } = user;
    try {
      const res = await axios.post(`${url}/api/register`, { username, email, phone, password });

      if (res.status === 200) {
        setUser({ username: "", email: "", phone: "", password: "" });
        toast.success("Registration Successful", { duration: 2000 });
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      toast.error("Invalid Username or Password");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="reg-box-1">
      <div className='container-reg-1'>
        <section id="content-reg-1">
          <form>
            <h1>Create An Acount</h1>
            <div>
              <input type="text" placeholder="Username" required="" name='username' value={user.username} onChange={handleInputs} />
            </div>
            <div>
              <input type="email" placeholder="Email" required="" name='email' value={user.email} onChange={handleInputs} />
            </div>
            <div>
              <input type="tel" placeholder="Phone" required="" name='phone' value={user.phone} onChange={handleInputs} />
            </div>
            <div>
              <input type="password" placeholder="Password" required="" name='password' value={user.password} onChange={handleInputs} />
            </div>
            <div>
              <input type="submit" value="Register" onClick={postData} />
            </div>
            <p>Already have an account? <Link to="/login">Login Here</Link></p>
          </form>
        </section>
      </div>
      </div>
    </>
  )
}

export default Registration;
