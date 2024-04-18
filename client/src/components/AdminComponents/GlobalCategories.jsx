import React from 'react'
import { Sidebar } from './Sidebar'
import "./AdminComponents.css"

export const GlobalCategories = () => {
  return (
    <div className='admin-container adminGlobalCategories'>
      <Sidebar />
      <h1>GlobalCategories</h1>
    </div>
  )
}
