import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

const initialState = {
  email: null,
  token: null,
  id: '',
  loggedIn: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email
      state.token = action.payload.token
      state.id = action.payload.id
      state.loggedIn = true;
  },
    removeUser(state) {
        state.email = null
        state.token = null
        state.id = ''
        state.loggedIn = false
    },
    clearResults() {
      storage.removeItem('persist:root')
    }
  }
})

export const { setUser, removeUser, clearResults } = authSlice.actions;

export default authSlice.reducer;