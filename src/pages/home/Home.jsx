import React from 'react'
import './home.scss'
import { Rating } from 'react-simple-star-rating'
import { useEffect } from 'react'
import { getProducts } from '../../redux/apiCalls'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { avgRating } from '../../helperFunctions'
import Loading from '../../components/loading/Loading'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    var currentUser = useSelector((state) => state.user.currentUser);
    var isFetching = useSelector((state) => state.user.isFetching);
    const [isLoading, setIsLoading] = useState(0);
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(1);
        getProducts(currentUser.city)
            .then(res => {
                console.log(res.data);
                setFeaturedProducts(res.data);
                setIsLoading(0);

            })
            .catch(err => {
                console.log(err.message);
                setIsLoading(0);

            })
    }, [])

    const visitSeller = (e, sellerId) => {
        e.preventDefault();
        navigate(`/shop/${sellerId}`);
    }

    const [featuredProducts, setFeaturedProducts] = useState([
        {
            title: "Nike Air jordan 356 s global white ",
            photos: ["https://dxkvlfvncvqr8.cloudfront.net/media/images/product/image/sm-756-nbgo-1-1664014052.jpg", "https://dxkvlfvncvqr8.cloudfront.net/media/images/product/image/sm-756-nbgo-1-1664014052.jpg"],
            seller: "Faizzy Shoe Store",
            ratings: 4,
            price: 15000,
            id: 1
        },
        {
            title: "Woodland F1 Sweater Black ",
            photos: ["https://img.freepik.com/free-photo/man-black-sweater-black-bucket-hat-youth-apparel-shoot_53876-102294.jpg"],
            ratings: 5,
            price: 998,
            id: 5
        },
        {
            title: "Nike Air jordan 356 s global white ",
            photos: ["https://dxkvlfvncvqr8.cloudfront.net/media/images/product/image/sm-756-nbgo-1-1664014052.jpg"],
            seller: "Faizzy Shoe Store",
            ratings: 3,
            price: 15000,
            id: 3
        },
        {
            title: "Woodland F1 Sweater Black ",
            photos: ["https://img.freepik.com/free-photo/man-black-sweater-black-bucket-hat-youth-apparel-shoot_53876-102294.jpg"],
            ratings: 4.5,
            price: 999,
            id: 2
        }
    ])

    return (
        isLoading || isFetching
            ?
            <Loading />
            :

            <div className="home">
                <h3>Featured Products</h3>
                <div className="products">
                    {
                        featuredProducts.map(product =>
                            <div key={product.id} className="product">
                                <div>
                                    <img onClick={(e)=>{e.preventDefault();navigate(`/product/${product._id}`)}} src={product.photos.length > 0 ? product.photos[0] : ""} alt="" />
                                </div>
                                <div className='seller'>
                                    {product.seller_name}
                                </div>
                                <div className='title'>
                                    {product.title}
                                </div>
                                <div className="ratings">
                                    <Rating
                                        initialValue={avgRating(product.ratings)}
                                    /* Available Props */
                                    />
                                </div>
                                <div className="price">
                                    ₹{product.price}
                                </div>
                                <div>
                                    <button onClick={(e) => visitSeller(e, product.seller_id)}>Visit Seller</button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
    )
}

export default Home