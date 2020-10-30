import React,{useReducer} from 'react'
import AuthContext from './authContext'
import authReducer from './authReducer'
import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'


import {REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED,AUTH_ERROR,
LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT,CLEAR_ERRORS} from '../types'

const AuthState = props =>{
    const initialState={
        token:localStorage.getItem('token'),
        isAuthenticated:null,
        loading:true,
        user:null,
        error:null
    }
    const[state,dispatch]=useReducer(authReducer,initialState)

    const loadUser = async()=>{
        setAuthToken(localStorage.token)
        try{
            const res =await axios.get('/api/auth')

        dispatch({
        type:USER_LOADED,
        payload:res.data})
    }   
        catch(err){
        dispatch({type:AUTH_ERROR})
    }
    console.log('load user working')
}


    const register= async formData =>{
        console.log('register entered')
        const config = 
        {headers:{
            'Content-Type':'application/json'
        }}

        try{
            console.log('attempting post')
            const res = await axios.post('/api/users',formData,config)
            console.log('post worked')

        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data})

        loadUser()
        console.log('register is working')
    }
        catch(err){
            dispatch({
            type:REGISTER_FAIL,
            payload:err.response.data.msg
        })
        console.log('error in the register function')
      
    }
    }

    const login = async formData=>{
        const config={
            headers:
            {'Content-Type':'application/json'
        }
    }

        try{
            const res= await axios.post('/api/auth',formData,config)
        dispatch({ 
            type:LOGIN_SUCCESS,
            payload:res.data
        })

        loadUser()
    } catch(err){
        dispatch({
        type:LOGIN_FAIL,
        payload:err.response.data.msg
    })
}
    }

    const clearErrors=()=>dispatch({
        type:CLEAR_ERRORS
    })

    const logout=()=>dispatch({
        type:LOGOUT})


    return(
        <AuthContext.Provider
        value={{
            token:state.token,
            isAuthenticated:state.isAuthenticated,
            loading:state.loading,
            user:state.user,
            error:state.error,
            register,
            clearErrors,
            logout,
            loadUser,
            login
        }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState