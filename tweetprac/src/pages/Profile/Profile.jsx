import React, { useState, useEffect } from 'react';
import Nav from '../Nav';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const url = "https://tweetertodobackend.onrender.com";

    const [det , setDet] = useState({});
    const [tweet, setTweet] = useState([]);
    const [addProf,setAddProf]=useState([]);
    const [profile, setProfile] = useState({
        imag: '',
    });
   const[news,setnews]=useState([]);
    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch('https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=6ea5886e20694e2991df8eef2c8707e5');
              const data = await response.json();
              const selectedArticles = data.articles.filter((_, index) => index % 2 === 0);
              const slicedArticles = selectedArticles.slice(0, 4);
              setnews(slicedArticles);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
      fetchData(); // Fetch data initially
      const intervalId = setInterval(fetchData, 5000); // Fetch data every 5 seconds
      return () => clearInterval(intervalId); // Cleanup function to clear interval
      }, []);

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
        fetch(`${url}/api/profile`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                return response.json();
            })
            .then(data => {
                setAddProf(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

   
    const handleChange = (e) => {
      const file = e.target.files[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            setProfile({ ...profile, imag: reader.result });
         };
         reader.readAsDataURL(file);
      }
   };

   const deletee=(id)=>{
    const conf = window.confirm("Are You Sure? You Want To Delete");
    if(conf){
        axios.delete(`${url}/api/detail/${id}`)
     .then(res=>{
        console.log("deleted");
        window.location.href="/profile"
     }).catch(err=>console.log(err))
    }
   }
   
   useEffect(() => {
    fetch(`${url}/api/register`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
            return response.json();
        })
        .then(data => {
            console.log('User data fetched:', data); 
            if (data.length > 0) {
                setDet(data[0]); 
            }
        })
        .catch(err => {
            console.log(err);
        });
}, []);

  const updateDet=()=>{
    window.location.href=`/updatedetail/${det._id}`
  }

  return (
        <>
            <Nav />
            <div className="container">
                <div className="left-sidebar">
                    <div className="links">
                        {/* <a href="latest news"><i className="fa-regular fa-newspaper"></i>Latest News</a> */}
                        <a href="#"><i className="fa-solid fa-user-group"></i>Friends</a>
                        <a href="#"><i className="fa-solid fa-people-group"></i>Group</a>
                        <Link to="/profile"><i className="fa-regular fa-user"></i>My Profile</Link>
                        <a href="#"><i className="fa-regular fa-address-card"></i>My Post</a>
                        <a href="#"><i className="fa-solid fa-gear"></i>Settings</a>
                        <Link to="/post"><i className="fa-solid fa-square-plus"></i><b>Post</b></Link>
                    </div>
                    <div className="shortcut ab">
                   <p><i style={{color:"#03324a"}} class="fa-regular fa-newspaper"></i> Latest News</p>
                    {news.map((article, index) => (
                     <a key={index} href={article.url} target="_blank">
                      {article.urlToImage ? (
                        <img src={article.urlToImage} height="250px" width="400px" alt="News" />
                      ) : (
                        <img src="placeholder-image-url" height="250px" width="400px" alt="not found" />
                      )}
                    <h6>{article.title}</h6> 
                    </a>
          ))}
        </div>
                </div>
                <div className="center">
                    <h3 style={{ color: "gray", paddingLeft: "10px" }}><i class="fa-regular fa-address-card"></i> My Post</h3>
                    {tweet.map((room, index) => (
                        <div className="post-container" key={index}>
                            <div className="user-profile">
                              {addProf.map((prof,index)=>(
                                  <img key={index} src={prof.imag} height="200px" width="180px" alt="User profile" />
                              ))}
                                <div>
                                    <p>{det.username}</p>
                                    <span>{room.tweetDate}</span>
                                </div>
                            </div>
                            <p className="post-text">{room.content}
                                <br /><a href="#">#easy tutorials</a><a href="#">#youtube channel</a></p>
                            <img src={room.imag} className="post-img" alt="Post image" />
                            <div className="add-post-link">
                                <a href="#"><i className="fa-regular fa-comment"></i>12 Comments</a>
                                <a href="#"><i className="fa-regular fa-thumbs-up"></i>24 Likes</a>
                                <a href="#" onClick={e=>deletee(room._id)}><i class="fa-solid fa-trash"></i>delete</a>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="right-sidebar">
                    <div className="right-box">
                        <div className="profile-circle">
                         {addProf.map((prof, index) => (
                         <img key={index} src={prof.imag} style={{ cursor: 'pointer',height:"190px",width:"190px",borderRadius:"50%" }} />
                         ))}
                            <input
                               id='fileInput'
                                type="file"
                                accept="image/*"
                                name='imag'
                                onChange={handleChange}
                                style={{ display: 'none' }}
                            />
                         {profile.imag && <span style={{color:"green",padding:"5px 8px",fontWeight:"800"}}><i class="fa-solid fa-check"></i></span>}
                        </div>
                        <br />
                        <div className="edit-prof">
                        {addProf.map((prof,index)=>(
                                 <Link to={`/update/${prof._id}`}><button key={index}>Edit Photo</button></Link>
                                 ))}
                        </div>
                        
                
                        <div className="prof-detail">
                            <center>
                                <table>
                                    <tbody>
                                         <>
                                         
                                         <tr>
                                            <td><b>Username</b></td>
                                            <td>{det.username}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Email</b></td>
                                            <td><b>{det.email}</b></td>
                                        </tr>
                                        <tr>
                                            <td><b>Phone</b></td>
                                            <td><b>{det.phone}</b></td>
                                        </tr>
                                        <tr>
                                            <td><b>Posts</b></td>
                                            <td><b>{tweet.length}</b></td>
                                        </tr>
                                      
                                       </>                  
                                    </tbody>
                                </table>
                                <br />
                                <button onClick={updateDet}>Edit Details</button>
                             </center>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;











 // const picUpload = async () => {
    //     try {
    //         const response = await axios.post('http://localhost:7000/api/profile', profile);
    //         console.log('Profile added:', response.data);
    //         window.alert("Profile uploaded");
    //         setProfile({ ...profile, imag: '' });
    //     } catch (error) {
    //         console.error('Error:', error);
    //         window.alert("Failed to upload profile");
    //     }
    // };





