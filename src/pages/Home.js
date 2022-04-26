import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut, getAuth } from "firebase/auth";
import { app } from '../Firebase/firebase'
import { clearResults } from '../features/auth/authSlice'



const Home = () => {

  const user = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    await dispatch(clearResults())
    const auth = getAuth(app)
    signOut(auth);
    navigate('/login')
  }
  return (
    <div className="login">
      <div className="flex-col">
        <div>Home</div>
        <hr/>
        <p>User: {user?.email}</p>
        <button onClick={handleLogOut}>Log out</button>
      </div>
    </div>

  )
}

export default Home