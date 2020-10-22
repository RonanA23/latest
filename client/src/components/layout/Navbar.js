import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'


const Navbar = ({icon,title}) => {
    return (
        <div className='navbar bg-primary'>
            <h1>
            <i className={icon}/> {title}
            </h1>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About</Link></li>
            </ul>
            
            
            
            
        </div>
    )
}

Navbar.propType={
    icon:PropTypes.object.isRequired,
    title:PropTypes.object.isRequired,
}

Navbar.defaultProps={
    icon:"fas fa-id-card-alt",
    title:'Contact Keeper'
}

export default Navbar
