import React from 'react'
import './home.scss'
import { Rating } from 'react-simple-star-rating'

const Home = () => {
    const featuredProducts = [
        {
            title: "Nike Air jordan 356 s global white ",
            img: "https://dxkvlfvncvqr8.cloudfront.net/media/images/product/image/sm-756-nbgo-1-1664014052.jpg",
            seller: "Faizzy Shoe Store",
            ratings: 4,
            price: 15000
        },
        {
            title: "Woodland F1 Sweater Black ",
            img: "https://img.freepik.com/free-photo/man-black-sweater-black-bucket-hat-youth-apparel-shoot_53876-102294.jpg",
            ratings: 5,
            price: 998
        },
        {
            title: "Nike Air jordan 356 s global white ",
            img: "https://dxkvlfvncvqr8.cloudfront.net/media/images/product/image/sm-756-nbgo-1-1664014052.jpg",
            seller: "Faizzy Shoe Store",
            ratings: 3,
            price: 15000
        },
        {
            title: "Woodland F1 Sweater Black ",
            img: "https://img.freepik.com/free-photo/man-black-sweater-black-bucket-hat-youth-apparel-shoot_53876-102294.jpg",
            ratings: 4.5,
            price: 999
        }
    ]
    return (
        <div className="home">
            <h3>Featured Products</h3>
            <div className="products">
                {
                    featuredProducts.map(product =>
                        <div className="product">
                            <div>
                                <img src={product.img} alt="" />
                            </div>
                            <div className='seller'>
                                {product.seller}
                            </div>
                            <div className='title'>
                                {product.title}
                            </div>
                            <div className="ratings">
                                <Rating
                                    initialValue={product.ratings}
                                /* Available Props */
                                />
                            </div>
                            <div className="price">
                                ₹{product.price}
                            </div>
                            <div>
                                <button>Visit Seller</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Home