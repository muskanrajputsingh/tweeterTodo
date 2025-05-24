import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import './Postt.css';
import Nav from '../Nav';

const PostTweet = () => {
  const url = 'http://localhost:14000';

    const [rooms, setrooms] = useState({
        content: '',
        imag:'',
      });
     
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
    
    
      const PostTweet = async (e) => {
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

  return (
    <>
    <Nav />
     <div className="postt-container">
        <div className="post-box">
            <form>
                <textarea name='content' rows={10} cols={60} value={rooms.content} onChange={handleChange} placeholder='Enter Your Thought...'></textarea><br />
                <label htmlFor="fileInput" style={{cursor:'pointer'}}>
                  <i className="fa-solid fa-camera"></i> Upload Photo
              </label> {rooms.imag && <span style={{color:"green",padding:"0px 8px"}}><i class="fa-solid fa-check"></i></span>}<br />
              <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  name='imag'
                  onChange={handleChange}
                  style={{ display: "none"}}
              />
             
               <br/> <button onClick={PostTweet}>TWEET</button>  
            </form>
        </div>
     </div>
    </>
  )
}

export default PostTweet