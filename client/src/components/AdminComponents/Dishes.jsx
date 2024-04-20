import React from 'react'
import { Sidebar } from './Sidebar'
import "./AdminComponents.css"

export const Dishes = () => {
  return (
    <div className='admin-container'>
      <Sidebar />
      <h1>Dishes</h1>
    </div>
  )
}
