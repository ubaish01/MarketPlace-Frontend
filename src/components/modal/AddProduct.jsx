import { useState } from 'react'
import './addProduct.scss'

const AddProduct = ({isOpen,setIsOpen}) => {
  return (
    <div className="bg">
        <div className="container" style={{position:"absolute"}}>
            <div className="modal">
            <button onClick={(e)=>{setIsOpen(false)}} >X</button>
            <h3 >This is a modal im</h3>
            </div>
        </div>
    </div>
  )
}

export default AddProduct