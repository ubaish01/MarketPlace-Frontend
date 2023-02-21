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
import logOutIcon from "../../assets/icons/logout-icon.png"
import { useDispatch } from 'react-redux';
import { logout } from "../../redux/userRedux";
import { useSelector } from "react-redux";
import { createNewProduct, updateUser, verifyOtp } from '../../redux/apiCalls';
import axios from 'axios';
import { verified } from "../../redux/userRedux";
import Loading from '../loading/Loading';





const LeftBar = () => {
    var user = useSelector((state) => state.user.currentUser);
    const [isSeller, setIsSeller] = useState(user.isSeller)
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [city, setCity] = useState(user.city);
    const [description, setDescription] = useState(user.description);
    const [address, setAddress] = useState(user.address);
    const [openingTime, setOpeningTIme] = useState(user.openingTime);
    const [closingTime, setClosingTime] = useState(user.closingTime);
    const [profileImage, setProfileImage] = useState();
    const [profileImageUrl, setProfileImageUrl] = useState(user.dp);
    const [productImageUrl, setProductImageUrl] = useState();
    const [inputOtp, setInputOtp] = useState();

    const [productName, setProductName] = useState();
    const [productPrice, setProductPrice] = useState();
    const [productImage, setProductImage] = useState();
    const [productColors, setProductColors] = useState();
    const [productSizes, setProductSizes] = useState();

    const navigate = useNavigate();
    const [productModalOpen, setProductModalOpen] = useState(false);
    // const [verifyMailModal,setVerifyMailModal] = useState(true);
    const [profileModal, setProfileModal] = useState(false);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const [isLoading,setIsLoading] = useState(false);


    const dispatch = useDispatch();

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
        var items = [];
        data.map(item => {
            items.push(item.value);
        })
        setProductColors(items);
    }
    function handleSize(data) {
        setSelectedSizes(data);
        var items = [];
        data.map(item => {
            items.push(item.value);
        })
        setProductSizes(items);
    }
    function handleCategory(data) {
        setSelectedCategory(data);
    }

    const sendOtp = (e) => {
        e.preventDefault();
        console.log(inputOtp)
        console.log("sending..")
    }
    const verifyMail = (e) => {
        setIsLoading(true);
        e.preventDefault();
        const body = {
            "otp": inputOtp,
            "user_id": user._id,
            "isSeller": user.isSeller
        }
        console.log(body)


        verifyOtp(body)
            .then(() => {
                dispatch(verified(true));
                console.log("after dispatch")
                alert("Account verified successfully")
                window.location.reload(true);
                setIsLoading(false);
            })
            .catch(() => {
                console.log("Something went wrong")
            })

            setIsLoading(false);



    }

    const createProduct = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const data = new FormData();
        data.append("file", productImage);
        data.append("upload_preset", "marketplace");
        data.append("cloud_name", "dds67aw2r");
        await fetch("https://api.cloudinary.com/v1_1/dds67aw2r/image/upload", {
            method: "POST",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                setProductImageUrl(data.url);
                console.log(productImageUrl);
                const body = {
                    "title": productName,
                    "category": selectedCategory.value.toLowerCase(),
                    "color": productColors,
                    "size": productSizes,
                    "price": productPrice,
                    "photos": [productImageUrl],
                    "seller_id": user._id,
                    "seller_name": user.name,
                    "city": user.city,
                }

                console.log(body);
                createNewProduct(body)
                    .then(response => {
                        alert(response.data.message);
                        setProfileModal(false);
                        setIsLoading(true);
                    })
                    .catch(err => {
                        alert(err.message);
                        setProfileModal(false);
                    })

            })
            .catch(err => {
                console.log(err);
            })

            setIsLoading(false);



    }

    const updateDetails = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if(profileImage)
        {
        const data = new FormData();
        data.append("file", profileImage);
        data.append("upload_preset", "marketplace");
        data.append("cloud_name", "dds67aw2r");
        await fetch("https://api.cloudinary.com/v1_1/dds67aw2r/image/upload", {
            method: "POST",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                setProfileImageUrl(data.url);
                const body = {
                    "id": user._id,
                    "name": name,
                    "email": email,
                    "phone": phone,
                    "city": city,
                    "address": address,
                    "description": description,
                    "openingTime": openingTime,
                    "closingTime": closingTime,
                    "isSeller": isSeller,
                    "dp": data.url
                }

                setIsLoading(false);
                updateUser(dispatch, body);
                setProfileModal(false);
            })
            .catch(err => {
                console.log(err);
            })
            
        }
        else
        {
            const body = {
                "id": user._id,
                "name": name,
                "email": email,
                "phone": phone,
                "city": city,
                "address": address,
                "description": description,
                "openingTime": openingTime,
                "closingTime": closingTime,
                "isSeller": isSeller,
                "dp": user.dp
            }

            updateUser(dispatch, body);
            setProfileModal(false);
            setIsLoading(false);

        }

        setIsLoading(false);



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
        { label: "Red", value: "RED" },
        { label: "Green", value: "GREEN" },
        { label: "Yellow", value: "YELLOW" },
        { label: "Blue", value: "BLUE" },
        { label: "White", value: "WHITE" },
        { label: "Not Applicable", value: "NA" }
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
            label: "Men's Wear",
            value: "mens_wear",
            icon: mensWear
        },
        {
            label: "Women's Wear",
            value: "womens_wear",
            icon: womensWear
        },
        {
            label: "Footwear",
            value: "footwear",
            icon: footWear
        },
        {
            label: "Grocery",
            value: "grocery",
            icon: grocery
        },
        {
            label: "Cosmetics",
            value: "cosmetics",
            icon: cosmetics
        },
        {
            label: "Stationary",
            value: "stationary",
            icon: stationary
        },
        {
            label: "Eye Wear",
            value: "eye_wear",
            icon: googles
        },
        {
            label: "Sports",
            value: "sports",
            icon: sports
        },
    ]

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <div className="leftbar">
            <div className="categories">
                <h3>Categories</h3>
                <div className="category-items">
                    {
                        categories.map(category =>
                            <div key={category.value} onClick={() => { navigate(`/${category.value}`) }} className="category-item">
                                <img src={category.icon} alt="" />
                                <span>{category.label}</span>
                            </div>

                        )
                    }
                </div>
            </div>
            <div className="break" />
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
                    <div className="category-item" onClick={openProfiletModal}>
                        <img src={editProfile} alt="" />
                        <span>Edit Profile</span>
                    </div>
                    {
                        isSeller
                        &&

                        <div className="category-item" onClick={openAddProductModal}>
                            <img src={editProfile} alt="" />
                            <span>Add Product</span>
                        </div>
                    }
                    <div className="category-item" onClick={() => { handleLogout() }}>
                        <img src={logOutIcon} alt="" />
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
                            <input type="text" placeholder='Product name' onChange={(e) => { setProductName(e.target.value) }} />
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
                            <input type="number" placeholder='Price' onChange={(e) => { setProductPrice(e.target.value) }} />
                            <div className="prd-img">
                                <label>Select minimum 3 photos</label>
                                <input type="file" onChange={(e) => { setProductImage(e.target.files[0]) }} />
                            </div>
                            <button onClick={(e) => { createProduct(e) }}>Add Product</button>
                        </form>
                    </div>

                </Modal>
            </div>
            <div>
                <Modal
                    isOpen={!user.isVerified}
                    style={{
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                        },
                    }}
                >
                    <div className="product-modal" >
                        <div>
                            <h3>Verify your email ! Please !</h3>
                        </div>
                        <form>
                            <input type="text" placeholder='Enter the otp sent on your registered mail!' onChange={(e) => { setInputOtp(e.target.value) }} />
                            <button onClick={(e) => { verifyMail(e) }}>Verify</button>
                            <button onClick={(e) => { sendOtp(e) }}>Resend Otp</button>
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
                            <input type="text" placeholder='Name' value={name} onChange={(e) => { setName(e.target.value) }} />
                            <input type="email" placeholder='email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            <input type="text" placeholder='Contact' value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                            <input type="text" placeholder='City' value={city} onChange={(e) => { setCity(e.target.value) }} />
                            {
                                isSeller
                                &&
                                <>
                                    <input type="text" placeholder='About the Shop' value={description} onChange={(e) => { setDescription(e.target.value) }} />
                                    <input type="text" placeholder='Address' value={address} onChange={(e) => { setAddress(e.target.value) }} />
                                    <input type="text" placeholder='Opening Time' value={openingTime} onChange={(e) => { setOpeningTIme(e.target.value) }} />
                                    <input type="text" placeholder='Closing Time' value={closingTime} onChange={(e) => { setClosingTime(e.target.value) }} />

                                </>
                            }
                            <div className="prd-img">
                                <label>Select Your Profile image</label>
                                <input type="file" onChange={(e) => { setProfileImage(e.target.files[0]) }} />
                            </div>
                            <button onClick={(e) => { updateDetails(e) }}>Update Profile</button>
                        </form>
                    </div>

                </Modal>
            </div>

            {
                isLoading
                ?
                <Loading />
                :
                ""
            }



        </div>

    )
}

export default LeftBar