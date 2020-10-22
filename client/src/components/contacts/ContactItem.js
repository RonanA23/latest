import React,{useContext} from 'react'
import ContactContext from '../../context/contact/contactContext'



 const ContactItem = ({contact}) => {
     const contactContext = useContext(ContactContext)
     const {deleteItem,setCurrent,clearCurrent}= contactContext
     
     const {id,name,email,phone,type}= contact

const deleteContact =()=>{
    deleteItem(id)
    clearCurrent()
}


    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                {name}{''}
            <span 
            style= {{float:'right'}} 
            className={
                'badge'+
                (type==='professional'?'badge-success':'badge-primary')
            }
            >
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
            </h3>
            <ul className='list'>
                {email &&(
                    <li><i className='fas fa-envelope-open'/>{email}</li>)}
                {phone &&(
                    <li><i className='fas fa-phone'/>{phone}</li>)}
                
            </ul>
            <p>
                <button className='btn btn-dark btn-small' onClick={()=>setCurrent(contact)}>Edit</button>
                <button className='btn btn-danger btn-small' onClick={deleteContact}>Delete</button>
            </p>
    
    
        </div>
    )
}

export default ContactItem
