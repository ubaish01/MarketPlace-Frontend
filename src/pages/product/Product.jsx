import './product.scss'
import { Rating } from 'react-simple-star-rating'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { getProduct, RequestCallBack } from '../../redux/apiCalls';
import { useEffect } from 'react';
import { avgRating } from '../../helperFunctions';
import { useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";


const Product = () => {
    const params = useParams();
    var user = useSelector((state) => state.user.currentUser);

    const [product, setProduct] = useState({
        name: "name",
        photos: [
            "https://firstcopyshoe.com/wp-content/uploads/2021/12/IMG-20211215-WA0000.jpg",
            "https://firstcopyshoe.com/wp-content/uploads/2021/12/IMG-20211215-WA0000.jpg",
            "https://firstcopyshoe.com/wp-content/uploads/2021/12/IMG-20211215-WA0000.jpg",
            "https://firstcopyshoe.com/wp-content/uploads/2021/12/IMG-20211215-WA0000.jpg"
        ],
        id: 5,
        price: 100,
        size: ["S", "M"],
        color: ["green", "blue"],
        sellerName: "seller",
        ratings: [1, 5, 7]
    });

    const getThisProduct = () => {
        const id = params.id;

        getProduct(id)
            .then(response => {
                setProduct(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    useEffect(() => {
        getThisProduct();
    }, [])

    const requesCallback = (e) => {
        const body = {
            "name": user.name,
            "phone": user.phone,
            "email": user.email,
            "seller_id": product.seller_id,
            "user_id": user._id,
            "isSeller": user.isSeller
        }
        RequestCallBack(body)
            .then(response => {
                if (response.data.status === "success")
                    alert(response.data.message)
                else
                    alert(response.data.error)


            })
            .catch(error => {
                console.log(error);

            })

    }

    return (
        <div className="product">
            <div className="item">
                <div className="images">
                    <img  src={product.photos[0]} alt="" />
                </div>
                <div className="info">
                    <span className="title">{product.title}</span>
                    <span className="seller">{product.seller_name}</span>
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
                    <div className="item-info">
                        <span>Price : </span>
                        <span>
                            ₹{product.price}
                        </span>
                    </div>
                    <button onClick={(e) => { requesCallback(e) }} >Request a callback</button>

                </div>
            </div>
            <div className="actions">

            </div>
        </div>
    )
}

export default Product