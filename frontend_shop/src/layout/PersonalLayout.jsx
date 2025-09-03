import React from 'react'
import styles from './PersonalLayout.module.css'
import { Outlet } from 'react-router-dom'
import UserHeader from './UserHeader'
import AdminSideMenu from './AdminSideMenu'

const PersonalLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header_div}>
        <UserHeader /> 
      </div>
      <div className={styles.main}>
        <div className={styles.side}>
          <AdminSideMenu />
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}


export default PersonalLayout