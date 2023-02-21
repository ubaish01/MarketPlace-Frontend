import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getFeaturedSellers } from '../../redux/apiCalls';
import { Rating } from 'react-simple-star-rating'

import './rightbar.scss'
import { avgRating } from '../../helperFunctions';
const RightBar = () => {
  var user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();



  const [featuredSellers, setFeaturedSellers] = useState([
    {
      img: "https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName: "Suhail groceries",
      address: "delhi road budh bazar pakbara moradabad",
      contact: "989721498",
      time: "8am-10pm",
      id: 1,
      sellerRating: [1, 2, 3]
    },
    {
      img: "https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName: "Suhail groceries",
      address: "delhi road budh bazar pakbara moradabad",
      contact: "989721498",
      time: "8am-10pm",
      id: 2,
      sellerRating: [1, 2, 3]
    },
    {
      img: "https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName: "Suhail groceries",
      address: "delhi road budh bazar pakbara moradabad",
      contact: "989721498",
      time: "8am-10pm",
      id: 3,
      sellerRating: [1, 2, 3]

    },
    {
      img: "https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName: "Suhail groceries",
      address: "delhi road budh bazar pakbara moradabad",
      contact: "989721498",
      time: "8am-10pm",
      id: 4,
      sellerRating: [1, 2, 3]
    },
    {
      img: "https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName: "Suhail groceries",
      address: "delhi road budh bazar pakbara moradabad",
      contact: "989721498",
      time: "8am-10pm",
      id: 5,
      sellerRating: [1, 2, 3]
    },
    {
      img: "https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName: "Suhail groceries",
      address: "delhi road budh bazar pakbara moradabad",
      contact: "989721498",
      time: "8am-10pm",
      id: 6,
      sellerRating: [1, 2, 3]
    },
    {
      img: "https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName: "Suhail groceries",
      address: "delhi road budh bazar pakbara moradabad",
      contact: "989721498",
      time: "8am-10pm",
      id: 7,
      sellerRating: [1, 2, 3]
    },
    {
      img: "https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName: "Suhail groceries",
      address: "delhi road budh bazar pakbara moradabad",
      contact: "989721498",
      time: "8am-10pm",
      id: 8,
      sellerRating: [1, 2, 3]
    },
    {
      img: "https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName: "Suhail groceries",
      address: "delhi road budh bazar pakbara moradabad",
      contact: "989721498",
      time: "8am-10pm",
      id: 9,
      sellerRating: [1, 2, 3]
    },
    {
      img: "https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName: "Suhail groceries",
      address: "delhi road budh bazar pakbara moradabad",
      contact: "989721498",
      time: "8am-10pm",
      id: 10,
      sellerRating: [1, 2, 3]
    },
    {
      img: "https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName: "Suhail groceries",
      address: "delhi road budh bazar pakbara moradabad",
      contact: "989721498",
      time: "8am-10pm",
      id: 11,
      sellerRating: [1, 2, 3]
    },
    {
      img: "https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName: "Suhail groceries",
      address: "delhi road budh bazar pakbara moradabad",
      contact: "989721498",
      time: "8am-10pm",
      id: 12,
      sellerRating: [1, 2, 3]
    },
    {
      img: "https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName: "Suhail groceries",
      address: "delhi road budh bazar pakbara moradabad",
      contact: "989721498",
      time: "8am-10pm",
      id: 13,
      sellerRating: [1, 2, 3]
    },
  ]);

  useEffect(() => {
    getFeaturedSellers(user.city)
      .then(res => {
        console.log("Here i am", user.city);
        console.log(res.data);
        setFeaturedSellers(res.data);
        console.log("Yaha se")
        console.log(res.data)
        console.log("yaha tak")
      })
      .catch(err => {
        console.log(err.message);
      })
  }, [])


  return (
    <div className="rightbar">
      <div className="top-sellers">
        <h3>Top Sellers</h3>
        {featuredSellers.map(seller =>
          <div key={seller._id} className="seller" onClick={(e) => { navigate(`/shop/${seller._id}`) }}>
            <div>
              <img src={seller.dp} alt="" />
              <span>{seller.name}</span>
              <span>
                <Rating
                  size={20}
                  allowFraction={true}
                  initialValue={avgRating(seller.sellerRating
                  )}
                  readonly={true}
                />
              </span>
            </div>
            <div>
              <span>{seller.openingTime}</span>
              -
              <span>{seller.closingTime}</span>
              <span>|</span>
              <span>{seller.phone}</span>
            </div>
            <div className='address'>
              {seller.address}
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

export default RightBar