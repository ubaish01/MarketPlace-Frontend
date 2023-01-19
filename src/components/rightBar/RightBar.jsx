import React from 'react'
import './rightbar.scss'
const RightBar = () => {
  const topSellers = [
    {
      img:"https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName:"Suhail groceries",
      address:"delhi road budh bazar pakbara moradabad",
      contact:"989721498",
      time:"8am-10pm"
    },
    {
      img:"https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName:"Suhail groceries",
      address:"delhi road budh bazar pakbara moradabad",
      contact:"989721498",
      time:"8am-10pm"
    },
    {
      img:"https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName:"Suhail groceries",
      address:"delhi road budh bazar pakbara moradabad",
      contact:"989721498",
      time:"8am-10pm"
    },
    {
      img:"https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName:"Suhail groceries",
      address:"delhi road budh bazar pakbara moradabad",
      contact:"989721498",
      time:"8am-10pm"
    },
    {
      img:"https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName:"Suhail groceries",
      address:"delhi road budh bazar pakbara moradabad",
      contact:"989721498",
      time:"8am-10pm"
    },
    {
      img:"https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName:"Suhail groceries",
      address:"delhi road budh bazar pakbara moradabad",
      contact:"989721498",
      time:"8am-10pm"
    },
    {
      img:"https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName:"Suhail groceries",
      address:"delhi road budh bazar pakbara moradabad",
      contact:"989721498",
      time:"8am-10pm"
    },
    {
      img:"https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName:"Suhail groceries",
      address:"delhi road budh bazar pakbara moradabad",
      contact:"989721498",
      time:"8am-10pm"
    },
    {
      img:"https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName:"Suhail groceries",
      address:"delhi road budh bazar pakbara moradabad",
      contact:"989721498",
      time:"8am-10pm"
    },
    {
      img:"https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName:"Suhail groceries",
      address:"delhi road budh bazar pakbara moradabad",
      contact:"989721498",
      time:"8am-10pm"
    },
    {
      img:"https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName:"Suhail groceries",
      address:"delhi road budh bazar pakbara moradabad",
      contact:"989721498",
      time:"8am-10pm"
    },
    {
      img:"https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName:"Suhail groceries",
      address:"delhi road budh bazar pakbara moradabad",
      contact:"989721498",
      time:"8am-10pm"
    },
    {
      img:"https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName:"Suhail groceries",
      address:"delhi road budh bazar pakbara moradabad",
      contact:"989721498",
      time:"8am-10pm"
    },
  ]
  return (
    <div className="rightbar">
      <div className="top-sellers">
        <h3>Top Sellers</h3>
      {topSellers.map(seller=>
        <div className="seller">
          <div>
            <img src={seller.img} alt="" />
            <span>{seller.shopName}</span>
          </div>
          <div>
            <span>{seller.time}</span>
            <span>|</span>
            <span>{seller.contact}</span>
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