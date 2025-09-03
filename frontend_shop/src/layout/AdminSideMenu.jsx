import React from 'react'
import styles from './AdminSideMenu.module.css'
import { NavLink, useLocation } from 'react-router-dom'

//현재 url과 링크의 경로가 일치 할때 자동으로 active 클래스를 추가.
//이를 이용해서 현재 어는 페이지에 있는지 시각적인 디자인요소를 추가 할수 있음
const AdminSideMenu = () => {
  const urlInfo = useLocation();
  //마이페이지로 접근시 '/user'
  return (
    <div className={styles.container}>
      {
        urlInfo.pathname.startsWith('/user')
          ?
          <div className={styles.menuCategory}>
            <p>
              <span>
                <i className="bi bi-bag-fill"></i>
              </span>
              마이페이지
            </p>
            <ul className={styles.sideMenu}>
              <li className={styles.menu_li}>
                <NavLink to={'/user/cart-list'} className={({isActive})=>isActive ? styles.active : null}>장바구니</NavLink>
              </li>
              <li className={styles.menu_li}>
                <NavLink to={'/user/buy-list'} className={({isActive})=>isActive ? styles.active : null}>구매 내역</NavLink>
              </li>

              <li className={styles.menu_li}>
                내 정보 관리
                </li>
            </ul>
          </div>
          :
          <>
            <div className={styles.menuCategory}>
              <p>
                <span>
                  <i className="bi bi-bag-fill"></i>
                </span>
                상품관리
              </p>
              <ul className={styles.sideMenu}>
                <li className={styles.menu_li}>
                  <NavLink to={'cate-manage'} className={({isActive})=>isActive ? styles.active : null}>
                  카테고리관리
                  </NavLink>
                </li>
                <li className={styles.menu_li}>
                  <NavLink to={'reg-book'} className={({isActive})=>isActive ? styles.active : null}>
                  상품등록
                  </NavLink>
                </li>
                <li className={styles.menu_li}>
                  상품관리
                </li>
              </ul>
            </div>
            <div className={styles.menuCategory}>
              <p>
                <span>
                  <i className="bi bi-person-lines-fill"></i>
                </span>
                고객관리
              </p>
              <ul className={styles.sideMenu}>
                <li className={styles.menu_li}>고객정보조회</li>
                <li className={styles.menu_li}>고객정보변경</li>
                <li className={styles.menu_li}>게시판관리</li>
              </ul>
            </div>
            <div className={styles.menuCategory}>
              <p>
                <span>
                  <i className="bi bi-clipboard-data-fill"></i>
                </span>
                매출관리
              </p>
              <ul className={styles.sideMenu}>
                <li className={styles.menu_li}>
                <NavLink to={'/admin/buy-list'} className={({isActive})=>isActive ? styles.active : null}>구매 내역</NavLink>
                </li>
                <li className={styles.menu_li}>주간매출관리</li>
                <li className={styles.menu_li}>년간매출관리</li>
              </ul>
            </div>
          </>
      }
    </div>
  )
}

export default AdminSideMenu
