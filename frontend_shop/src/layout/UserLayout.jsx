import React from 'react'
import styles from './UserLayout.module.css'
import UserHeader from './UserHeader'
import { Outlet } from 'react-router-dom'

//일반유저가 보는 화면의 레이아웃을 구성하는 컴포넌트
const UserLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header_div}>
        <UserHeader />  
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default UserLayout