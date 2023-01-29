import React from 'react'
import './rightbar.scss'
const RightBar = () => {
  const topSellers = [
    {
      img:"https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName:"Suhail groceries",
      address:"delhi road budh bazar pakbara moradabad",
      contact:"989721498",
      time:"8am-10pm",
      id:1
    },
    {
      img:"https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName:"Suhail groceries",
      address:"delhi road budh bazar pakbara moradabad",
      contact:"989721498",
      time:"8am-10pm",
      id:2      
    },
    {
      img:"https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName:"Suhail groceries",
      address:"delhi road budh bazar pakbara moradabad",
      contact:"989721498",
      time:"8am-10pm",
      id:3

    },
    {
      img:"https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName:"Suhail groceries",
      address:"delhi road budh bazar pakbara moradabad",
      contact:"989721498",
      time:"8am-10pm",
      id:4
    },
    {
      img:"https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName:"Suhail groceries",
      address:"delhi road budh bazar pakbara moradabad",
      contact:"989721498",
      time:"8am-10pm",
      id:5
    },
    {
      img:"https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName:"Suhail groceries",
      address:"delhi road budh bazar pakbara moradabad",
      contact:"989721498",
      time:"8am-10pm",
      id:6
    },
    {
      img:"https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName:"Suhail groceries",
      address:"delhi road budh bazar pakbara moradabad",
      contact:"989721498",
      time:"8am-10pm",
      id:7
    },
    {
      img:"https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName:"Suhail groceries",
      address:"delhi road budh bazar pakbara moradabad",
      contact:"989721498",
      time:"8am-10pm",
      id:8
    },
    {
      img:"https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName:"Suhail groceries",
      address:"delhi road budh bazar pakbara moradabad",
      contact:"989721498",
      time:"8am-10pm",
      id:9
    },
    {
      img:"https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName:"Suhail groceries",
      address:"delhi road budh bazar pakbara moradabad",
      contact:"989721498",
      time:"8am-10pm",
      id:10
    },
    {
      img:"https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName:"Suhail groceries",
      address:"delhi road budh bazar pakbara moradabad",
      contact:"989721498",
      time:"8am-10pm",
      id:11
    },
    {
      img:"https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName:"Suhail groceries",
      address:"delhi road budh bazar pakbara moradabad",
      contact:"989721498",
      time:"8am-10pm",
      id:12
    },
    {
      img:"https://www.indifi.com/blog/wp-content/uploads/2020/03/Kirana-Backbone-Economy-.jpg",
      shopName:"Suhail groceries",
      address:"delhi road budh bazar pakbara moradabad",
      contact:"989721498",
      time:"8am-10pm",
      id:13
    },
  ]
  return (
    <div className="rightbar">
      <div className="top-sellers">
        <h3>Top Sellers</h3>
      {topSellers.map(seller=>
        <div key={seller.id} className="seller">
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