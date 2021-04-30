import React, { useState, useEffect, createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial State
const initialState = {
  users: []
}
//update

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [loading, setLoding] = useState(true)

  const getUsers = async() => {
    try {
        const response = await fetch("http://localhost:5000/users");
        setLoding(false)
        const data = await response.json()
        // console.log(data)
        dispatch({type: 'SET_USERS', payload: data});
    } catch(e) {
        setLoding(false)
        console.log("My error is ", e)
    }
     
}
useEffect(() => {
    getUsers()
},[])

  // Actions
  const removeUser = (Id) => {
    dispatch({
      type: 'REMOVE_USER',
      payload: Id
    })
  }

  const addUser = (user) => {
    dispatch({
      type: 'ADD_USER',
      payload: user
    })
  }

  const editUser = (user) => {
    dispatch({
      type: 'EDIT_USER',
      payload: user
    })
  }

  return (
    <GlobalContext.Provider value={{
      data: state.users,
      addUser,
      removeUser,
      editUser
    }}>
      {children}
    </GlobalContext.Provider>
  )
}