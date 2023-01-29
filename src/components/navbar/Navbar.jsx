import React from 'react'
import './navbar.scss';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Navbar = () => {
    var user = useSelector((state) => state.user.currentUser);

    return (
        <div className="navbar">
            <div className="left">
                <Link to="/home">
                    <div className="logo">
                        <span>Market</span>
                        <span>Place</span>
                    </div>
                </Link>
                <div className="city">
                    <LocationOnOutlinedIcon />
                    <span>{user.city}</span>
                </div>
                <div className="search">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder='Seach an item...' />
                </div>
            </div>
            <div className="right">
                <img src={user.dp} alt="" />
                <div className="name">
                    <span>{user.name}</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar