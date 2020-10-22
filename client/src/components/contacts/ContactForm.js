import React,{useState,useContext,useEffect} from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactForm = () => {
    const contactContext = useContext(ContactContext)
    const {addContact, current,clearCurrent,updateContact}= contactContext

    useEffect(()=>{
        if(current!==null){
            setContact(current)
        }else{
            setContact({
                name:'',
                email:'',
                type:'personal',
                phone:''
            })
        }
    },[contactContext,current])
    //the above are dependencies needed or error

    const [contact,setContact]=useState({
        name:'',email:'',phone:'',type:'personal'
    })

    const {name,email,phone,type}= contact

    const onChange= e =>
        setContact({...contact,[e.target.name]:e.target.value})
    
    const onSubmit= e =>{
        e.preventDefault()
        if(current ===null){
            addContact(contact)
        } else{
            updateContact(contact)
        }}
             

    const onClear=()=>{
        clearCurrent()
    }
    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-primary'>{current? 'Edit Contact':'Add Contact'}</h2>
            <input 
            type='text' 
            name='name' 
            value={name} 
            placeholder='Name' 
            onChange={onChange}/>
            <input 
            type='text' 
            name='email' 
            value={email} 
            placeholder='Email' 
            onChange={onChange}/>
            <input 
            type='text' 
            name='phone' 
            value={phone} 
            placeholder='Phone' 
            onChange={onChange}
            />
            <h5>Contact Type</h5>
    <input 
    type='radio' 
    name='type' 
    value='personal' 
    checked={type ==='personal'} 
    onChange={onChange}
    />{''}
    Personal{''}
    <input 
    type='radio' 
    name='type' 
    value='professional' 
    checked={type==='professional'} 
    onChange={onChange}
    />{''}
    Professional{''}
            <div>
    <button className='btn btn-primary btn-block'>{current? 'Update Contact':'Add Contact'}</button>
            </div>
            {current && <button className='btn-block btn-light'onClick={onClear}>Clear</button>}
        </form>
    )
}

export default ContactForm