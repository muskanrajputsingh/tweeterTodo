import './App.css';
import Home from './pages/home-tweet/Home';
import PostTweet from './pages/post-tweeet/PostTweet';
import Profile from './pages/Profile/Profile';
import { Route,Routes} from 'react-router-dom';
import UpdateProfile from './pages/UpdateProfile/UpdateProfile';
import Registration from './pages/Registration/Registration';
import Login from './pages/Login/Login';
import UpdateDetail from './pages/UpdateDetail/UpdateDetail';

function App() {

  return (
    <>
    <Routes>
       <Route exact path='/' element={<Home/>} />
        <Route path='/post' element={<PostTweet/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/update/:id' element={<UpdateProfile/>} />
        <Route path='/register' element={<Registration/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/updatedetail/:id' element={<UpdateDetail />} />
    </Routes>
    </>
  )
}

export default App
