import React from 'react'
import { Sidebar } from './Sidebar'
import "./AdminComponents.css"

export const Users = () => {
  return (
    <div className='admin-container'>
      <Sidebar />
      <h1>Users</h1>
    </div>
  )
}
