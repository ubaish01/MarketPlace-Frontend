import './product.scss'
import { Rating } from 'react-simple-star-rating'


const Product = () => {
    return (
        <div className="product">
            <div className="item">
                <div className="images">

                    <img src="https://firstcopyshoe.com/wp-content/uploads/2021/12/IMG-20211215-WA0000.jpg" alt="" />
                    <img src="https://firstcopyshoe.com/wp-content/uploads/2021/12/IMG-20211215-WA0000.jpg" alt="" />
                    <img src="https://firstcopyshoe.com/wp-content/uploads/2021/12/IMG-20211215-WA0000.jpg" alt="" />
                    <img src="https://firstcopyshoe.com/wp-content/uploads/2021/12/IMG-20211215-WA0000.jpg" alt="" />
                </div>
                <div className="info">
                    <span className="title">puma fc jacket white</span>
                    <span className="seller">Kaif Collection</span>
                    <div className="item-info">
                        <span>
                            Available Sizes :
                        </span>
                        <span>S</span>
                        <span>M</span>
                        <span>XL</span>
                    </div>
                    <div className="item-info">
                        <span>
                            Available Colors :
                        </span>
                        <span>Red</span>
                        <span>Green</span>
                        <span>Blue</span>
                    </div>
                    <div className="item-info">
                        <span>
                            Available Weights :
                        </span>
                        <span>Not Applicable</span>
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
                        <span>24 Hrs</span>
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
                        />
                    </span>
                    <div className="item-info">
                        <span>Price : </span>
                        <span>
                            ₹{1500}
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