import React, { useState, useEffect } from 'react';
import './UpdateDetail.css';
import axios from 'axios';
import Nav from '../Nav';
import { useParams } from 'react-router-dom';

const UpdateDetail = () => {
    const url = "https://tweetertodobackend.onrender.com";

    const { id } = useParams();
    const [tweet, setTweet] = useState([]);
    const [profile, setProfile] = useState([]);
    const [values, setValues] = useState({
        username: '',
        email: '',
        phone:'',
     });
  
     useEffect(() => {
      axios.get(`${url}/api/register/${id}`)
         .then(res => {
            const data = res.data;
            console.log(data); // Log the response data to verify its structure
            setValues({
               username: data.username || '',
               email: data.email || '',
               phone:data.phone || '',
              
            });
         })
         .catch(err => console.log(err));
   }, [id]);
   
   const handleChange = (e) => {
      const { name, value } = e.target;
      console.log(name, value); // Log the name and value to verify
      setValues(prevValues => ({
         ...prevValues,
         [name]: value
      }));
   };
   
     const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${url}/api/register/${id}`, values)
           .then(res => {
              window.location.href = "/profile";
           })
           .catch(err => console.log(err));
     };
  

    useEffect(() => {
        // Fetch user photo
        axios.get(`${url}/api/profile`)
            .then(response => {
                const data = response.data;
                if (data.length > 0) {
                    setProfile(data[0]); 
                }
            })
            .catch(err => {
                console.log(err);
            });

        // Fetch user tweets/posts
        fetch(`${url}/api/detail`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                return response.json();
            })
            .then(data => {
                setTweet(data); // Set user tweets/posts data
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Nav />
            <div className="update-container">
                <div className="update-prof-box">
                    <div className="right-sidebar">
                        <div className="right-box">
                            <div className="profile-circle">
                                <img src={profile.imag} alt="" style={{ cursor: 'pointer', height: "190px", width: "190px", borderRadius: "50%" }} /><br />
                            </div>

                            <div className="prof-detail">
                                <center>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td><b>Username</b></td>
                                                <td><input type='text' name='username' value= {values.username} onChange={handleChange}/></td>
                                            </tr>
                                            <tr>
                                                <td><b>Email</b></td>
                                                <td><input type="email" value= {values.email} onChange={handleChange}/></td>
                                            </tr>
                                            <tr>
                                                <td><b>Phone</b></td>
                                                <td><input type='tel' value= {values.phone} onChange={handleChange}/></td>
                                            </tr>
                                            <tr>
                                                <td><b>Posts</b></td>
                                                <td><b>{tweet.length}</b></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <br />
                                    <button onClick={handleSubmit}>Edit Details</button>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateDetail;
