import React from 'react';
import './UpdateProfile.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../Nav';

const UpdateProfile = () => {
    const url = "https://tweetertodobackend.onrender.com";

    const { id } = useParams();
    const [tweet, setTweet] = useState([]);
    const [values, setValues] = useState({
        imag: '',
        showCheck: false // Initialize showCheck as false
    });

    useEffect(() => {
        fetch(`${url}/api/detail`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                return response.json();
            })
            .then(data => {
                setTweet(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios.get(`${url}/api/profile/${id}`)
            .then(response => {
                const data = response.data;
                setValues({
                    imag: data.imag || '',
                    showCheck: false 
                });
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValues({ ...values, imag: reader.result, showCheck: true });
            };
            reader.readAsDataURL(file);
        }
    }

    const picUpload = (e) => {
        e.preventDefault();
        axios.put(`${url}/api/profile/${id}`, values)
            .then(res => {
                console.log("Profile photo uploaded successfully");
                window.location.href = "/profile";
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <Nav />
            <div className="update-container">
                <div className="update-prof-box">
                    <div className="right-sidebar">
                        <div className="right-box">
                            <div className="profile-circle">
                                <img src={values.imag} alt="" style={{ cursor: 'pointer', height: "190px", width: "190px", borderRadius: "50%" }} /><br />
                                {values.showCheck && <span style={{ color: "green", padding: "5px 8px", fontWeight: "800" }}><i className="fa-solid fa-check"></i></span>}
                                <input
                                    id='fileInput'
                                    type="file"
                                    accept="image/*"
                                    name='imag'
                                    onChange={handleChange}
                                    style={{ display: 'none' }}
                                />
                            </div>
                            <div className="btns-profile">
                                <label htmlFor="fileInput">
                                    <p> <i className="fa-solid fa-camera"></i> Select Photo</p><br />
                                </label>
                                <button onClick={picUpload}>Upload</button>
                            </div>
                            <h6>Click above to upload profile</h6>
                            <div className="prof-detail">
                                <center>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td><b>Username</b></td>
                                                <td><b>muskan singh</b></td>
                                            </tr>
                                            <tr>
                                                <td><b>Email</b></td>
                                                <td><b>Muskan@gmail.com</b></td>
                                            </tr>
                                            <tr>
                                                <td><b>Phone</b></td>
                                                <td><b>84658638394</b></td>
                                            </tr>
                                            <tr>
                                                <td><b>Posts</b></td>
                                                <td><b>{tweet.length}</b></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <br />
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateProfile;
