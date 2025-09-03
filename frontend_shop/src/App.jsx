import './App.css'
import UserLayout from './layout/UserLayout'
import { Route, Routes } from 'react-router-dom'
import BookList from './pages/BookList'
import AdminLayout from './layout/AdminLayout'
import RegBook from './pages/RegBook'
import CategoryManage from './pages/CategoryManage'
import BookDetail from './pages/BookDetail'
import CartList from './pages/CartList'
import PersonalLayout from './layout/PersonalLayout'
import BuyListForUser from './layout/BuyListForUser'
import BuyList from './layout/BuyList'


function App() {

  return (
    <>
      <Routes>
        {/* 일반 사용자가 접근하는 페이지들 */}
        {/* 일반 사용자가 접근하는 페이지는 모두 UserLayout과 함께 열림 */}
        {/* UserLayout의 Outlet 위치에 우리가 원하는 컴포넌트가 뜬다 */}
        
        <Route path='/' element={ <UserLayout /> }>
          {/* 도서 목록 페이지, url : / */}
          <Route path='' element={ <BookList /> }/>

          {/* 도서 상세 페이지 url : /book-detail */}
          <Route path='book-detail/:bookNum' element={ <BookDetail /> }/>

          {/* 장바구니 페이지 url : /cart-list */}
          <Route path='cart-list' element={ <CartList /> }/>

        </Route>

        {/* 관리자페이지는 AdminLayout이랑 함께 열린다 */}
        <Route path='/admin' element={ <AdminLayout /> }>
          {/* 도서 등록 페이지, url : /admin/reg-book */}
          <Route path='reg-book' element={ <RegBook /> }/>

          {/* 카테고리 관리 페이지, url : /admin/cate-manage */}
          <Route path='cate-manage' element={ <CategoryManage /> }/>
          
          {/* 구매 내역 리스트 */}
          <Route path='buy-list' element={ <BuyList/>}/>             
        </Route>

        {/* 마이페이지 layout */}
        <Route path='/user' element={<PersonalLayout/>}>
          {/* 장바구니 페이지 url : /cart-list */}
          <Route path='cart-list' element={ <CartList /> }/>
          {/* 구매 내역 리스트 */}
          <Route path='buy-list' element={ <BuyListForUser/>}/>          
        </Route>
      </Routes>
    </>
  )
}

export default App
