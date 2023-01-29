import './product.scss'
import { Rating } from 'react-simple-star-rating'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { getProduct } from '../../redux/apiCalls';
import { useEffect } from 'react';
import { avgRating } from '../../helperFunctions';


const Product = () => {
    const params = useParams();
    const [product, setProduct] = useState({
        name: "name",
        photos: [
            "https://firstcopyshoe.com/wp-content/uploads/2021/12/IMG-20211215-WA0000.jpg",
            "https://firstcopyshoe.com/wp-content/uploads/2021/12/IMG-20211215-WA0000.jpg",
            "https://firstcopyshoe.com/wp-content/uploads/2021/12/IMG-20211215-WA0000.jpg",
            "https://firstcopyshoe.com/wp-content/uploads/2021/12/IMG-20211215-WA0000.jpg"
        ],
        id:5,
        price:100,
        size:["S","M"],
        color:["green","blue"],
        sellerName:"seller",
        ratings:[1,5,7]
    });

    const getThisProduct = () => {
        const id = params.id;

        getProduct(id)
            .then(response => {
                setProduct(response.data);
                console.log(product);
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    useEffect(() => {
        getThisProduct();
    }, [])


    return (
        <div className="product">
            <div className="item">
                <div className="images">

                    <img src={product.photos[0]} alt="" />
                    <img src={product.photos[0]} alt="" />
                    <img src={product.photos[0]} alt="" />
                    <img src={product.photos[0]} alt="" />
                </div>
                <div className="info">
                    <span className="title">puma fc jacket white</span>
                    <span className="seller">Kaif Collection</span>
                    <div className="item-info">
                        <span>
                            Available Sizes :
                        </span>
                        {
                            product.size.map(item =>
                                <span key={item}>{item}</span>
                            )
                        }

                    </div>
                    <div className="item-info">
                        <span>
                            Available Colors :
                        </span>{
                            product.color.map(item =>
                                <span key={item}>{item}</span>
                            )
                        }
                    </div>
                    <div className="item-info">
                        <span>
                            Available Weights :
                        </span>
                        <span>{product.weight}</span>
                    </div>
                    <div className="item-info">
                        <span>
                            Warranty upto :
                        </span>
                        <span>Not Applicable</span>
                    </div>
                    <div className="item-info">
                        <span>
                            Replacement :
                        </span>
                        <span>{product.replacement}</span>
                    </div>
                    <div className="item-info">
                        <span>
                            Discount upto :
                        </span>
                        <span>10%</span>
                    </div>
                    <span className="rating">
                        <span>Ratings : </span>
                        <Rating
                            initialValue={avgRating(product.ratings)}
                        />
                    </span>
                    <div className="item-info">
                        <span>Price : </span>
                        <span>
                            ₹{product.price}
                        </span>
                    </div>
                    <button>Request a callback</button>

                </div>
            </div>
            <div className="actions">

            </div>
        </div>
    )
}

export default Product