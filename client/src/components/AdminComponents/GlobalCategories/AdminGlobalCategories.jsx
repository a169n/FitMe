import React from 'react'
import { Sidebar } from '../Sidebar/Sidebar'
import "./GlobalCategories.css"

export const AdminGlobalCategories = () => {
  return (
    <div className='admin-container'>
      <Sidebar />
      <div className='admin-items'><h1>GlobalCategories</h1></div>
    </div>
  )
}
