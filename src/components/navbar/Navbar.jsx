import React from 'react'
import './navbar.scss';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="left">
                <Link to="/">
                    <div className="logo">
                        <span>Market</span>
                        <span>Place</span>
                    </div>
                </Link>
                <div className="city">
                    <LocationOnOutlinedIcon />
                    <span>Moradabad</span>
                </div>
                <div className="search">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder='Seach an item...' />
                </div>
            </div>
            <div className="right">
                <img src="https://avatars.githubusercontent.com/u/109113347?v=4" alt="" />
                <div className="name">
                    <span>ubaish</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar