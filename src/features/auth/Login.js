import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../../Firebase/firebase'
import { setUser } from '../../features/auth/authSlice'

const initialState = {
  email: '',
  password: '',
}

export const Login = () => {
  const [values, setValues] = useState(initialState)
  const [queryState, setQueryState] = useState('')
  const dispatch = useDispatch();
  const handleChange = e => {
    const { name, value } = e.target;
    setValues({...values, [name]: value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setQueryState('pending')
    const auth = getAuth(app)
    createUserWithEmailAndPassword(auth, values.email, values.password)
    .then(({user}) => {
        dispatch(setUser({
            email: user.email,
            token: user.refreshToken,
            id: user.uid,
        }))
        setQueryState('success')
    })
    .catch((e) => {
        console.log(e.message)
        setQueryState('error')
    })
  }
  const handleLogin = () => {
    setQueryState('pending')
    const auth = getAuth()
    signInWithEmailAndPassword(auth, values.email, values.password)
    .then(({user}) => {
        dispatch(setUser({
            email: user.email,
            token: user.refreshToken,
            id: user.uid,
        }))
        setValues(initialState)
        setQueryState('success')
    })
    .catch((e) => {
        console.log(e.message)
        setQueryState('error')
    })
  }
  return (
    <div>
      <form>
        <input 
          type="text" 
          name="email" 
          placeholder="Email" 
          value={values.email} 
          onChange={handleChange} 
          disabled={queryState === 'pending' ? true : false}/>
        <input 
          type="text" 
          name="password" 
          placeholder="Password" 
          value={values.password} 
          onChange={handleChange} 
          disabled={queryState === 'pending' ? true : false}/>
        <button type="submit" 
          onClick={handleSubmit}
          disabled={queryState === 'pending' ? true : false}  
        >Create</button>
        <button type="button" 
          onClick={handleLogin}
          disabled={queryState === 'pending' ? true : false}
        >Log In</button>
      </form>
    </div>
  )
}
