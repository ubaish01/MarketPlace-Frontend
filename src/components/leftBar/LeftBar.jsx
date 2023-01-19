import React, { useState } from 'react'
import Modal from 'react-modal';
import Select from 'react-select'
import './leftbar.scss'
import { useNavigate } from "react-router-dom";
import mensWear from "../../assets/icons/tshirt-icon.png"
import womensWear from "../../assets/icons/woman-gown-icon.png"
import footWear from "../../assets/icons/shoe-icon.png"
import grocery from "../../assets/icons/grocery-icon.png"
import cosmetics from "../../assets/icons/lipstick-icon.png"
import stationary from "../../assets/icons/stationary-icon.png"
import googles from "../../assets/icons/google-icon.png"
import sports from "../../assets/icons/sports-icon.png"

import referAndEarn from "../../assets/icons/refer-and-earn-icon.png"
import editProfile from "../../assets/icons/setting-icon.png"
import aboutUs from "../../assets/icons/about-us-icon.png"
import logOut from "../../assets/icons/logout-icon.png"


const LeftBar = () => {
    const userType = "seller";// working fine

    const navigate = useNavigate();
    const [productModalOpen, setProductModalOpen] = useState(false);
    const [profileModal, setProfileModal] = useState(false);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();

    const closeAddProductModal = () => {
        setProductModalOpen(false);
    }
    const openAddProductModal = () => {
        setProductModalOpen(true);
    }
    const closeProfiletModal = () => {
        setProfileModal(false);
    }
    const openProfiletModal = () => {
        setProfileModal(true);
    }
    function handleColors(data) {
        setSelectedColors(data);
    }
    function handleSize(data) {
        setSelectedSizes(data);
    }
    function handleCategory(data) {
        setSelectedCategory(data);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const colorsList = [
        { value: "red", label: "Red" },
        { value: "green", label: "Green" },
        { value: "yellow", label: "Yellow" },
        { value: "blue", label: "Blue" },
        { value: "white", label: "White" },
        { value: "NA", label: "Not Applicable" }
    ];
    const sizeList = [
        { value: "S", label: "S" },
        { value: "M", label: "M" },
        { value: "L", label: "L" },
        { value: "XL", label: "Xl" },
        { value: "XXL", label: "XXL" },
        { value: "NA", label: "Not Applicable" }
    ];
    const category = [
        { value: "MENS_WEAR", label: "Mens Wear" },
        { value: "WOMENS_WEAR", label: "Women's Wear" },
        { value: "FOOTWEAR", label: "FootWear" },
        { value: "GROCERY", label: "Grocery" },
        { value: "COSMETICS", label: "Cosmetics" },
        { value: "EYE_WEAR", label: "Eye Wear" },
        { value: "STATIONARY", label: "Stationary" },
        { value: "SPORTS", label: "Sports " }
    ];
    const categories = [
        {
            name: "Men's Wear",
            icon: mensWear
        },
        {
            name: "Women's Wear",
            icon: womensWear
        },
        {
            name: "Footwear",
            icon: footWear
        },
        {
            name: "Grocery",
            icon: grocery
        },
        {
            name: "Cosmetics",
            icon: cosmetics
        },
        {
            name: "Stationary",
            icon: stationary
        },
        {
            name: "Eye Wear",
            icon: googles
        },
        {
            name: "Sports",
            icon: sports
        },
    ]

    return (
        <div className="leftbar">
            <div className="categories">
                <h3>Categories</h3>
                <div className="category-items">
                    {
                        categories.map(category =>
                            <div className="category-item">
                                <img src={category.icon} alt="" />
                                <span>{category.name}</span>
                            </div>

                        )
                    }
                </div>
            </div>
            <div class="break" />
            <div className="categories">
                <h3>Options</h3>
                <div className="category-items">
                    <div className="category-item">
                        <img src={referAndEarn} alt="" />
                        <span>Refer And Earn</span>
                    </div>
                    <div className="category-item">
                        <img src={aboutUs} alt="" />
                        <span>About Us</span>
                    </div>
                    <div className="category-item"  onClick={openProfiletModal}>
                        <img src={editProfile} alt="" />
                        <span>Edit Profile</span>
                    </div>
                    {
                        userType==="seller"
                        &&
                        
                    <div className="category-item" onClick={openAddProductModal}>
                    <img src={editProfile} alt="" />
                    <span>Add Product</span>
                </div>
                    }
                    <div className="category-item">
                        <img src={logOut} alt="" />
                        <span>LogOut</span>
                    </div>
                </div>
            </div>

            <div>
                <Modal
                    isOpen={productModalOpen}
                    style={customStyles}
                >
                    <div className="product-modal">
                        <div>
                            <h3>Add a Product</h3>
                            <button onClick={closeAddProductModal}>X</button>
                        </div>
                        <form >
                            <input type="text" placeholder='Product name' />
                            <div className="dropdown-container">
                                <Select
                                    options={category}
                                    placeholder="Select a Category"
                                    value={selectedCategory}
                                    onChange={handleCategory}
                                    isSearchable={true}
                                />
                            </div>
                            <div className="dropdown-container">
                                <Select
                                    options={colorsList}
                                    placeholder="Available colors"
                                    value={selectedColors}
                                    onChange={handleColors}
                                    isSearchable={true}
                                    isMulti
                                />
                            </div>
                            <div className="dropdown-container">
                                <Select
                                    options={sizeList}
                                    placeholder="Available size"
                                    value={selectedSizes}
                                    onChange={handleSize}
                                    isSearchable={true}
                                    isMulti
                                />
                            </div>
                            <input type="text" placeholder='Price' />
                            <div className="prd-img">
                                <label>Select minimum 3 photos</label>
                                <input type="file" />
                            </div>
                            <button>Add Product</button>
                        </form>
                    </div>

                </Modal>
            </div>
            <div>
                <Modal
                    isOpen={profileModal}
                    style={customStyles}
                >
                    <div className="product-modal">
                        <div>
                            <h3>Edit Your Profile</h3>
                            <button onClick={closeProfiletModal}>X</button>
                        </div>
                        <form >
                            <input type="text" placeholder='Name' />
                            <input type="email" placeholder='email' />
                            <input type="text" placeholder='Contact' />
                            <input type="text" placeholder='City' />
                            <input type="text" placeholder='Price' />
                            {
                                userType==="seller"
                                &&
                                <>
                            <input type="text" placeholder='About the Shop' />
                            <input type="text" placeholder='Address' />
                            <input type="text" placeholder='Opening Time' />
                            <input type="text" placeholder='Closing Time' />

                                </>
                            }
                            <div className="prd-img">
                                <label>Select Your Profile image</label>
                                <input type="file" />
                            </div>
                            <button>Update Profile</button>
                        </form>
                    </div>

                </Modal>
            </div>

        </div>

    )
}

export default LeftBar