import React,{useReducer} from 'react'
import axios from 'axios'
import {v4 as uuidv4} from 'uuid';
import ContactContext from './contactContext'
import contactReducer from './contactReducer'

import{
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../types'

const ContactState = props =>{
      const initialState={
          contacts: [
        {id:1, name:'David Icke',email:'dave@gmail.com',phone:'0863175029',type:'personal'},
        {id:2,name:'Alex Jones',email:'infowars@hotmail.com',phone:'0879175529',type:'professional'},
        {id:3,name:'Bill Cooper',email:'bill@palehorse.com',phone:'7863805029',type:'professional'}
    ],
    current:null
      }
      const [state, dispatch]= useReducer(contactReducer,initialState)

const addContact= contact =>{
      contact.id= uuidv4()
      dispatch({type:ADD_CONTACT,payload:contact})

    }

const deleteItem = id =>{
    dispatch({type:DELETE_CONTACT,payload:id})
}

const setCurrent =(contact)=>{
    dispatch({type:SET_CURRENT,payload:contact})
}

const clearCurrent =()=>{
    dispatch({type:CLEAR_CURRENT})
}

const updateContact=(contact)=>{
    dispatch({type:UPDATE_CONTACT,payload:contact})
}

return(
    <ContactContext.Provider
    value={{
        contacts: state.contacts,
        current: state.current,
        addContact,
        deleteItem,
        setCurrent,
        clearCurrent,
        updateContact
    }}
    >
        {props.children}
    </ContactContext.Provider>
)
}


export default ContactState