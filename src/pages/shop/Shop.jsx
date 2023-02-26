import React from 'react'
import './shop.scss'
import { Rating } from 'react-simple-star-rating'
import Modal from 'react-modal';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { GetProducts, getProducts, GetSeller, getSeller, GetSellerReviews, PostReview } from '../../redux/apiCalls';
import { useState } from 'react';
import { avgRating, showDate } from '../../helperFunctions';
import { useSelector } from 'react-redux';
import Select from 'react-select'
import Loading from '../../components/loading/Loading';



const Shop = () => {
    var user = useSelector((state) => state.user.currentUser);
    var productList = []


    const params = useParams();
    const [shop, setShop] = useState({});
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState();
    // const [purchasedProducts, setPurchasedProducts] = useState([]);
    const navigate = useNavigate();
    const [openReviewModal, setOpenReviewModal] = useState(false);
    const [sellerReviews, setSellerReviews] = useState([])

    const [briefAboutSeller, setBriefAboutSeller] = useState();
    const [inputSellerRating, setInputSellerRating] = useState(0);
    const [purchasedProducts, setPurchasedProducts] = useState([]);
    const [reviewDescription, setReviewDescription] = useState();
    const [productImage, setProductImage] = useState();
    const [productImageUrl, setProductImageUrl] = useState();
    const [boughItems, setBoughtItems] = useState([]);
    const [isLoading,setIsLoading] = useState(false);

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
        setIsLoading(true);
        getProducts();
        getSeller();
        setIsLoading(false);

    }, [params.id])

    function handlePurchasedProducts(data) {
        // console.log(data)

        setPurchasedProducts(data);
        var items = [];
        data.map(item => {
            items.push(item.value);
        })

        setBoughtItems(items);
    }

    const getProducts = () => {
        GetProducts("moradabad", params.id)
            .then(res => {
                setProducts(res.data)
                var i = 0;
                res.data.forEach(item => {
                    productList[i] = { label: item.title, value: item.title };
                    i++;
                })
                console.log("productList")
                console.log(productList)
                setAllProducts(productList);
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


    const postReview = async (e) => {
        e.preventDefault();
        if(!briefAboutSeller || !inputSellerRating || !reviewDescription || !boughItems )
        {
            alert("All the inputs are mandatory !");
            return;
        }
        
        setIsLoading(true);


        if (productImage) {
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
                        "seller_id": shop._id,
                        "reviewer_name": user.name,
                        "one_liner": briefAboutSeller,
                        "reviewer_dp": user.dp,
                        "rating": parseInt(inputSellerRating),
                        "desc": reviewDescription,
                        "purchased_products": boughItems,
                        "item_image": data.url || "none"
                    }

                    PostReview(body)
                        .then(res => {
                            setOpenReviewModal(false);
                            alert(res.data.message);
                            setIsLoading(false);
                        })
                        .catch(err => {
                            setOpenReviewModal(false);
                            alert(err.message);
                        })


                })
                .catch(err => {
                    console.log(err);
                })
        }
        else
        {
            const body = {
                "seller_id": shop._id,
                "reviewer_name": user.name,
                "one_liner": briefAboutSeller,
                "reviewer_dp": user.dp,
                "rating": parseInt(inputSellerRating),
                "desc": reviewDescription,
                "purchased_products": boughItems
            }

            PostReview(body)
                .then(res => {
                    setOpenReviewModal(false);
                    alert(res.data.message);
                    setIsLoading(false);
                })
                .catch(err => {
                    setOpenReviewModal(false);
                    alert(err.message);
                })
        }

        console.log(purchasedProducts);
        setIsLoading(false);
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
                    <button onClick={() => { setOpenReviewModal(true) }}>Write a seller review</button>
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
                                    <b> {showDate(review.createdAt)}</b>
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
                                    {
                                        review.item_image
                                        &&
                                        <img src={review.item_image} alt="" />
                                    }
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
                        <input type="text" placeholder='One thing you like about the seller' onChange={(e) => { setBriefAboutSeller(e.target.value) }} />
                        <input type="number" min={1} max={5} placeholder='Rate seller out of 5' onChange={(e) => { setInputSellerRating(e.target.value) }} />
                        {/* <input type="text" placeholder='Purchased products by you ' onChange={(e) => { setPurchasedProducts(e.target.value) }} /> */}

                        <div className="dropdown-container">
                            <Select
                                options={allProducts}
                                placeholder="Product purchased by you "
                                value={purchasedProducts}
                                onChange={handlePurchasedProducts}
                                isSearchable={true}
                                isMulti
                            />
                        </div>
                        <input type="text" placeholder='explain why you like/dislike seller ' onChange={(e) => { setReviewDescription(e.target.value) }} />
                        <div className="prd-img">
                            <label style={{ marginBottom: "8px" }}>Upload product image if any bought by you</label>
                            <input type="file" onChange={(e) => { setProductImage(e.target.files[0]) }} />
                        </div>
                        <button onClick={(e) => { postReview(e) }} >Post this Review</button>
                    </form>
                </div>

            </Modal>
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

export default Shop