import React from 'react'
import { IoSearch } from "react-icons/io5";
import './searchbox.css'

const SearchBox = (props) => {
  return (
    <div className='search-box-wrapper' style={{width: props.width}}>
        <IoSearch size={20} className='search-icon' />
        <input type="text" placeholder={props.placeholder} className='search-box' />
    </div>
  )
}

export default SearchBox


