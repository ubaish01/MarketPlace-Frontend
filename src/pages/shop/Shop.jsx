import React from 'react'
import './shop.scss'
import { Rating } from 'react-simple-star-rating'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getProducts, getSeller } from '../../redux/apiCalls';
import { useState } from 'react';


const Shop = () => {
    const params = useParams();
    const [shop, setShop] = useState({});
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();



    useEffect(() => {

        getProducts("moradabad", params.id)
            .then(res => {
                setProducts(res.data)
                console.log(products)
            })
            .catch(error => {
                console.log(error.message)
            })

        getSeller(params.id)
            .then(res => {
                setShop(res.data)
            })
            .catch(err => {
                console.log(err.message)
            })

    }, [])

    return (
        <div className="shop">
            <div className="top">
                <img src={shop.dp} alt="" />
                <span>
                    {shop.name}
                </span>
            </div>

            <div className="mid">
                <div className="desc">
                    <h3>About the seller</h3>
                    <p>{shop.description}</p>
                </div>

                <div className="info">
                    <span><b>Address</b>{` ${shop.address} (${shop.openingTime} to ${shop.closingTime} )`}</span>
                    <span><b>Contact</b>{` ${shop.email} |  ${shop.phone} `}</span>
                    <span><b>Products range</b> 30 to 50 types products Available</span>
                </div>
            </div>
            <h1>Available Products in our shop</h1>
            <div className="products">
                {
                    products.map(product =>
                        <div key={product._id} className="product">
                            <img src={product.photos[0]} alt="" />
                            <span className="name">{product.name}</span>
                            <span className="price">₹{product.price}</span>
                            <Rating
                                size={25}
                                allowFraction={true}
                                initialValue={3.5}
                                readonly={true}
                            />
                            <button onClick={(e)=>{e.preventDefault();navigate(`/product/${product._id}`)}} >view</button>
                        </div>)
                }
            </div>
        </div>
    )
}

export default Shop