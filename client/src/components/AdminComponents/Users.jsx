import React from 'react'
import { Sidebar } from './Sidebar'
import "./AdminComponents.css"

export const Users = () => {
  return (
    <div className='admin-container adminGlobalCategories'>
      <Sidebar />
      <h1>Users</h1>
    </div>
  )
}
