import React from 'react';
import './Home.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Nav from '../Nav';
const Home = () => {

  const url = 'http://localhost:14000';

    const [rooms, setrooms] = useState({
        content: '',
        imag:'',
       });
      const [tweet,setTweet]=useState([]);
      const [news,setnews]=useState([]);
      const [adds,setadds]=useState([]);
      const [like,setlike]=useState(25);
      const [currentDate, setCurrentDate] = useState(new Date());
      const [addprof,setAddProf]=useState([])
      const [det , setDet] = useState({});

       const handleChange = (e) => {
        const { name, value, files } = e.target;
    
        if (files && files.length > 0) {
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = () => {
                setrooms({ ...rooms, [name]: value, imag: reader.result });
            };
        } else {
            setrooms({ ...rooms, [name]: value, imag: '' }); 
        }
    };
    
    
      const PostButton = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(`${url}/api/detail`, rooms);
          console.log('New tweet added:', response.data);
          window.alert("tweet successfull");

          setrooms({
            content: '',
            imag:'',
          });
          window.location.href="/"
        } catch (error) {
          console.error('Error:', error);
          window.alert("failed")
        }
      };

      useEffect(()=>{
        fetch(`${url}/api/detail`)
        .then(response=>{
        if(!response.ok){
            throw new Error('failed to fetch')
        }
        return response.json()
        })
        .then(data=>{
            setTweet(data);
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch(`https://newsapi.org/v2/everything?q=keyword&apiKey=6ea5886e20694e2991df8eef2c8707e5`);
              const data = await response.json();
              const selectedArticles = data.articles.filter((_, index) => index % 2 === 0);
              setnews(selectedArticles.slice(0, 4));
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchData(); // Initial fetch
      const intervalId = setInterval(fetchData, 5000); // Fetch data every 5 seconds

      return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

    useEffect(()=>{
      fetch('https://newsapi.org/v2/everything?q=keyword&apiKey=6ea5886e20694e2991df8eef2c8707e5')
      .then(response=>{
        if(!response.ok){
            throw new Error('failed to fetch')
        }
        return response.json()
        })
        .then(data=>{
            const selectedArticles = data.articles.filter((_, index) => index % 2 === 0);
            const slicedArticles = selectedArticles.slice(0,2);
            setadds(slicedArticles);
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    const likeCount=()=>{
      setlike(like + 1) ;
    }

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentDate(new Date());
      }, 1000);
  
      return () => clearInterval(interval); 
    }, []);
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    const time = currentDate.toLocaleTimeString();

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

  
  return (
    <>
      <Nav />
      <div className="container">
        <div className="left-sidebar">
          <div className="links">
            <a href="#"><i className="fa-solid fa-user-group"></i>Friends</a>
            <a href="#"><i className="fa-solid fa-people-group"></i>Group</a>
            <Link to="/profile"><i class="fa-regular fa-user"></i>My Profile</Link>
            <a href="#"><i class="fa-regular fa-address-card"></i>My Post</a>
            <a href="#"><i class="fa-solid fa-gear"></i>Settings</a>
            <Link to="/post"><i class="fa-solid fa-square-plus"></i><b>Post</b></Link>
          </div>
          <div className="shortcut">
          <p><i style={{color:"#0c1b4b"}} class="fa-regular fa-newspaper"></i> Latest News</p>
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
          <div className="post-container">
            <div className="user-profile">
              {
                addprof.map((prof,index)=>(
                  <img key={index} src={prof.imag} height="180px" width="200px" alt="User profile" />
                ))
              }
             
              <div>
                <p>{det.username}</p>
                <small>public <i className="fa-solid fa-caret-down"></i></small>
              </div>
            </div>

            <div className="post-input">
              <textarea rows="6" name='content' onChange={handleChange} value={rooms.content}  placeholder={`What's in your mind ${det.username}!`}></textarea>
              <div className="add-post-link">
              <div className='phot' style={{ padding: "6px 10px" }}>
              <label htmlFor="fileInput">
                  <i className="fa-solid fa-camera"></i> Upload Photo
              </label>
              <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  name='imag'
                  onChange={handleChange}
                  style={{ display: "none" }}
              />
              {rooms.imag && <span style={{color:"green",padding:"0px 8px"}}><i class="fa-solid fa-check"></i></span>}
              </div>

               <a href="#"><i className="fa-solid fa-face-smile-beam"></i>feeling/activity</a>
                <div><button onClick={PostButton}>Post</button></div> 
              </div>
            </div>
          </div>

{/* //1st */}
         {
         tweet.map((room,index)=>(
            <div className="post-container" key={index}>
            <div className="user-profile">
            {
                addprof.map((prof,index)=>(
                  <img key={index} src={prof.imag} height="180px" width="200px"  />
                ))
              }

              <div>
                <p>{det.username}</p>
                <span>{room.tweetDate}</span>
              </div>
            </div>
            <p className="post-text">{room.content}
            <br/><a href="#">#easy tutorials</a><a href="#">#youtube channel</a></p>
            {room.imag && (
            <img src={room.imag} height={100} width={200} className="post-img" alt="Post image" />
            )}

             <div className="add-post-link">
                <a href="#"><i class="fa-regular fa-comment"></i>12 Comments</a>
                <a href="#"><i class="fa-regular fa-thumbs-up" onClick={likeCount}></i>{like} Likes</a>
              </div>
          </div>
         ))
         }

        </div>
      
      
      <div className="right-sidebar">
        <div className="sidebar-title">
          <h4>Events</h4>
          <a href="#">See All</a>
        </div>
        <div className="event">
          <div className="leftevent">
            <h3>{day}</h3>
            <span>{month}</span>
          </div>
          <div className="rightevent">
            <h4>{year}</h4>
            <p><i class="fa-regular fa-clock"></i> {time}</p>
            <a href="#">more info</a>
          </div>
        </div>
        <div className='add1'>
        <div className="sidebar-title">
          <h4>advertisement</h4>
          <a href="#">close</a>
        </div>
       
        {adds.map((article, index) => (
            <div className="sidebar-ads" key={index}>
            <a href={article.url} target="_blank"><img src={article.urlToImage} alt="Advertisement" /></a>
            <h6>{article.title}</h6>
          </div>
          ))}
        </div>
        </div>
      </div>
    </>
  )
}

export default Home;




//   useEffect(()=>{
  //     fetch('https://newsapi.org/v2/top-headlines?country=in&apiKey=6ea5886e20694e2991df8eef2c8707e5')
  //     .then(response=>{
  //     if(!response.ok){
  //         throw new Error('failed to fetch')
  //     }
  //     return response.json()
  //     })
  //     .then(data=>{
  //         // setnews(data);
  //         // if (data.articles) {
  //         //   setnews(data.articles.slice(0, 3));
  //         // }
  //         const selectedArticles = data.articles.filter((_, index) => index % 2 === 0);
  //         const slicedArticles = selectedArticles.slice(0,4);
  //         setnews(slicedArticles);
  //     })
  //     .catch(err=>{
  //         console.log(err)
  //     })
  // },[])
