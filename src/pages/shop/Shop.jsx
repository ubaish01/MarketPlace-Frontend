import React from 'react'
import './shop.scss'
import { Rating } from 'react-simple-star-rating'
import Modal from 'react-modal';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { GetProducts, getProducts, GetSeller, getSeller, GetSellerReviews, PostReview } from '../../redux/apiCalls';
import { useState } from 'react';
import { avgRating } from '../../helperFunctions';
import { useSelector } from 'react-redux';
import Select from 'react-select'



const Shop = () => {
    var user = useSelector((state) => state.user.currentUser);

    const params = useParams();
    const [shop, setShop] = useState({});
    const [products, setProducts] = useState([]);
    // const [purchasedProducts, setPurchasedProducts] = useState([]);
    const navigate = useNavigate();
    const [openReviewModal, setOpenReviewModal] = useState(false);
    const [sellerReviews, setSellerReviews] = useState([])

    const [briefAboutSeller, setBriefAboutSeller] = useState();
    const [inputSellerRating, setInputSellerRating] = useState();
    const [todayData, setTodaysDate] = useState();
    const [purchasedProducts, setPurchasedProducts] = useState();
    const [reviewDescription, setReviewDescription] = useState();

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



    useEffect(() => {
        getProducts();
        getSeller();

    }, [])

    const getProducts = () => {
        GetProducts("moradabad", params.id)
            .then(res => {
                setProducts(res.data)
                console.log(products)
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    const getSeller = () => {
        GetSeller(params.id)
            .then(res => {
                setShop(res.data)
                console.log(res.data._id)
                getSellerReviews(res.data._id);
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    const getSellerReviews = (sellerId) => {
        GetSellerReviews(sellerId)
            .then(res => {
                setSellerReviews(res.data.allReviews);
                console.log(res.data)
            })
            .catch(err => {
                console.log(err.message);
                alert(err.message)
            })
    }

    const postReview = (e) => {
        e.preventDefault();

        const body = {
            "seller_id": shop._id,
            "reviewer_name": user.name,
            "one_liner": briefAboutSeller,
            "reviewer_dp": user.dp,
            "rating": inputSellerRating,
            "submitted_date": todayData,
            "desc": reviewDescription,
            "purchased_products": [purchasedProducts]
        }

        PostReview(body)
        .then(res=>{
            setOpenReviewModal(false);
            alert(res.data.message);
        })
        .catch(err=>{
            setOpenReviewModal(false);
            alert(err.message);
        })


    }

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
                            <span className="name">{product.title}</span>
                            <span className="price">₹{product.price}</span>
                            <Rating
                                size={25}
                                allowFraction={true}
                                initialValue={avgRating(product.ratings)}
                                readonly={true}
                            />
                            <button onClick={(e) => { e.preventDefault(); navigate(`/product/${product._id}`) }} >view</button>
                        </div>)
                }
            </div>
            <div className="reviews-container">
                <div className="write-a-review">
                    <h1>Review this seller</h1>
                    <p>Share your thoughts with other customers</p>
                    <button onClick={()=>{setOpenReviewModal(true)}}>Write a seller review</button>
                </div>
                <div className="reviews">
                    {
                        sellerReviews.map(review =>
                            <div className="review" key={review._id}>
                                <div className='upper' >
                                    <img src={review.reviewer_dp} alt="" />
                                    <h3>{review.reviewer_name}</h3>
                                </div>
                                <div className='review-mid'>
                                    <Rating
                                        size={30}
                                        allowFraction={true}
                                        initialValue={review.rating}
                                        readonly={true}
                                    />
                                    <div>{review.one_liner}</div>
                                </div>
                                <div>
                                    Review submited on
                                    <b> {review.submitted_date}</b>
                                </div>
                                <div className='review-desc'>{review.desc}</div>
                                <div className="purchased-products">Purchased Products are
                                    {
                                        review.purchased_products.map(product =>
                                            <b key={product}> {product},</b>
                                        )
                                    }
                                </div>
                                <div className='original-images' >
                                    <img src="https://images-do.nyc3.cdn.digitaloceanspaces.com/lAVtCJXFVr/product_images/1638351540.AP0015.jpeg" alt="" />
                                    <img src="https://images-do.nyc3.cdn.digitaloceanspaces.com/lAVtCJXFVr/product_images/1638351540.AP0015.jpeg" alt="" />
                                    <img src="https://images-do.nyc3.cdn.digitaloceanspaces.com/lAVtCJXFVr/product_images/1638351540.AP0015.jpeg" alt="" />
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <Modal
                isOpen={openReviewModal}
                style={customStyles}
            >
                <div className="product-modal">
                    <div>
                        <h3>Write a review for this seller</h3>
                        <button onClick={() => { setOpenReviewModal(false) }} >X</button>
                    </div>
                    <form >
                        <input type="text" placeholder='Describe seller in brief' onChange={(e) => { setBriefAboutSeller(e.target.value) }} />
                        <input type="number" min={1} max={5} placeholder='Rate seller out of 5' onChange={(e) => { setInputSellerRating(e.target.value) }} />
                        <input type="text" placeholder='Todays date ' onChange={(e) => { setTodaysDate(e.target.value) }} />
                        <input type="text" placeholder='Purchased products by you ' onChange={(e) => { setPurchasedProducts(e.target.value) }} />

                        {/* <div className="dropdown-container">
                            <Select
                                options={products}
                                placeholder="Product purchased by you "
                                value={purchasedProducts}
                                // onChange={handleSize}
                                isSearchable={true}
                                isMulti
                            />
                        </div> */}
                        <input type="text" placeholder='explain why you like/dislike seller ' onChange={(e) => { setReviewDescription(e.target.value) }} />
                        <div className="prd-img">
                            <label style={{ marginBottom: "8px" }}>Upload product image if any bought by you</label>
                            <input type="file" />
                        </div>
                        <button onClick={(e) => { postReview(e) }} >Post this Review</button>
                    </form>
                </div>

            </Modal>
        </div>
    )
}

export default Shop