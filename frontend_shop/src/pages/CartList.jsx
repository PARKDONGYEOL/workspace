import React, { useEffect, useRef, useState } from 'react'
import styles from './CartList.module.css'
import PageTitle from '../common/PageTitle'
import Input from '../common/Input'
import Button from '../common/Button'
import axios from 'axios'
import { data, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

const CartList = () => {
  const nav = useNavigate();
  //장바구니 목록 데이터를 조회하는 유즈이팩트를 재실행하는 변수
  const [reload, setReload] = useState(0);

  //장바구니 목록 데이터를 저장할 state 변수
  const [cartList, setCartList] = useState([]);
  const [chkBox, setChkBox] = useState([]); 
  const [sumPrice,setSumPrice] = useState(0);
  const [isAll, setIsAll] = useState(false);
  const inputRefs = useRef([]);
  //조회한 장바구니 목록의  ahems cartNum을 저장할 배열
  //arr변수는 화면에 보여줄 데이터가 아니기 때문에 state 변수로 줄필요가 없음
  //스테이트 변수가 아니면 리렌더링 됫을때 초기화 되버림
  //1.변수의 값이 초기화 되지 않아야 한다.
  //2.값이 변해도 리렌더링 할 필요는 없다.
  //useRef를 사용하면 초기값이 current라는 키의 value로 저장된다.
  // const arr = useRef([]); // arr = {current : []}

  // for(const e of res.data){
  //   arr.current.push(e.cartNum); // arr = {current : []}
  // }
  
  // setChkBox(arr.current);


  //마운트되면 조회한 장바구니 목록을 cartList 변수에 저장
  useEffect(() => {
    //장바구니 페이지를 들어왔는데 만약 로그인 되어있지 않으면
    //강제로 상품 목록 페이지로 이동시키기
    const loginInfo = sessionStorage.getItem('loginInfo');
    if(loginInfo === null){
      alert('접근 권한이 없습니다');
      nav('/');
      return ;
    }

    //JSON -> 객체 변환
    const memId = JSON.parse(loginInfo).memId;
    axios.get(`/api/carts/${memId}`)
    .then(res => {
      setCartList(res.data);
      // console.log(res.data);
      checkAllItems(res.data);

    })
    .catch(e => console.log(e));
  }, [reload]);


  const handleChkBox = (e, price)  => {
    //자료형이 cartNum은 int e.target.value = 문자
    if (e.target.checked) {
      setChkBox(oldData => [...oldData,  Number(e.target.value)]);
      setSumPrice(sumPrice + price);
      
    } 
    else {
      setChkBox(oldData => oldData.filter(data => data !==  Number(e.target.value)));
      setSumPrice(sumPrice - price);
    }
  };

  const handleAllCheck = () => {
    if (isAll) {
      // 전체 해제
      setChkBox([]);
      setIsAll(false);
      setSumPrice(0); 
    } else {
      checkAllItems(cartList);
    }
  };

const checkAllItems = (data) => {
  const cartNums = [];
  let price = 0;
  for (const e of data) {
    cartNums.push(e.cartNum);
    price += e.totalPrice;
  }
  setChkBox(cartNums);
  setSumPrice(price);
  setIsAll(true);
};

const deleteCartList = (cartNum) =>{
  const result = confirm('선택한 상품을 장바구니에서 비우겠습니까?');
  if(result){
    axios.delete(`/api/carts/${cartNum}`)
    .then(res=>{
      alert('장바구니에서 삭제했습니다.');
      setReload(reload + 1);
      setChkBox(oldData => oldData.filter(data => data !==  Number(cartNum)));
    })
    .catch(e=>console.log(e));

  }
}

const updataCnt = (e, cart, i) =>{

    console.log(/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(e.target.value));
  if (e.target.value == 0 ) e.target.value = 1;

  if (/^\d*$/.test(e.target.value)) {
    const newList = [...cartList]; 
    newList[i] = {
      ...newList[i], // 기존 객체 복사
      cartCnt: Number(e.target.value), // 문자열 -> 숫자 변환
      totalPrice: newList[i].bookDTO.price * Number(e.target.value)
    };
  
    // 선택된 수량이 변경되면 전체 가격도 변경됨
    chkBox.includes(cartList[i].cartNum) && 
      setSumPrice(res=>(res + newList[i].totalPrice - cartList[i].totalPrice));
  
    setCartList(newList);
  
    axios.put('/api/carts',{
      cartCnt: e.target.value,
      bookNum: cart.bookNum,
      cartNum: cart.cartNum
    })
    .then(
      // res=>setReload(reload + 1)
    )
    .catch(e=>console.log(e))
  } else {
    return;
  }
}

const handleKeyDown = (e, i) => {
  if (e.keyCode === 229) {
    e.preventDefault();
    if (inputRefs.current[i]) {
      inputRefs.current[i].blur();
      setTimeout(() => {
        inputRefs.current[i].focus(); // 동일 input에 다시 포커스
      }, 0);
    }
    return;
  }

  // 숫자 외 입력 차단
  if (
    !(
      (e.key >= "0" && e.key <= "9") ||
      e.key === "Backspace" ||
      e.key === "Delete" ||
      e.key === "Enter"
    )
  ) {
    e.preventDefault();
  }
};

const buyAll = () => {

  const loginInfo = sessionStorage.getItem('loginInfo');
  const memId = JSON.parse(loginInfo).memId;

  if (chkBox.length === 0) {
    alert('선택된 항목이 없습니다.');
    return;
  }
  
  axios.post('/api/buys/all', {
    memId : memId,
    cartNumList : chkBox
  })
  .then(res=>{
    setReload(reload + 1);
    })
  .catch(e=>console.log(e));
};

return (
    <div className={styles.container}>
      <table className={styles.cart_list_table} border={1}>
        <colgroup>
          <col width='3%'/>
          <col width='3%'/>
          <col width='*'/>
          <col width='10%'/>
          <col width='10%'/>
          <col width='10%'/>
          <col width='15%'/>
          <col width='9%'/>
        </colgroup>
        <thead>
          <tr>
            <td>
              {/* 리스트에 1개 이상, 개별체크박스에 모두체크가 되었으면 전채체크박스 */}
            <input 
              type="checkbox"
              value="all"
              checked={cartList.length > 0 && chkBox.length === cartList.length}
              onChange={handleAllCheck}
            />
            </td>
            <td>No</td>
            <td>상품정보</td>
            <td>가 격</td>
            <td>수 량</td>
            <td>총 가격</td>
            <td>등록일</td>
            <td>삭 제</td>
          </tr>
        </thead>
        <tbody>
        {
          cartList.length === 0 
          ? 
          <tr>
            <td colSpan={8}>장바구니에 담은 도서가 없습니다.</td>
          </tr>
          :
          cartList.map((cart, i) => {
            return (
              <tr key={i}>
                <td>
                  <input type="checkbox" value={cart.cartNum} checked={chkBox.includes(cart.cartNum)} onChange={e=>{handleChkBox(e, cart.totalPrice)}}/>
                </td>
                <td>{cartList.length - i}</td>
                <td>
                  <div className={styles.item_info}>
                    <img src={`http://localhost:8080/upload/${cart.bookDTO.bookImgDTO[0].attachedImgName}`}
                     width={'50px'}/>
                    <p style={{margin:'auto'}}>{cart.bookDTO.title}</p>
                  </div>
                </td>
                <td>{cart.bookDTO.price.toLocaleString()}</td>
                <td>
                  <div className={styles.cnt_div}>
                    <Input 
                      type='number' 
                      // value={cart.cartCnt}
                      defaultValue={cart.cartCnt} //벨류와 온체인지의 두곳에서 사용하는 데이터가 다를 경우 
                      min={1}
                      onChange={e => { 
                        // e.target.value =  e.target.value === null ? Number(1) : Number(e.target.value) 
                        updataCnt(e, cart, i); }}
                        size='100%'
                      //키보드를 눌렸을때
                        ref={(e) => (inputRefs.current[i] = e)}
                        onKeyDown={(e) => handleKeyDown(e, i)}        
                    />
                  </div>
                </td>
                <td>{cart.totalPrice.toLocaleString()}</td>
                <td>{dayjs(cart.cartDate).format('YYYY-MM-DD HH:mm')}</td>
                <td>
                  <Button title='삭제' color='gray' size='100%' 
                  onClick={e=>deleteCartList(cart.cartNum)}/>
                </td>

              </tr>
            )
          })
        }  
        </tbody>
      </table>
      <div className={styles.buy_div}>
        <p>구매가격 : {sumPrice.toLocaleString()}원</p>
        <Button title='선택 구매'
        onClick={buyAll}
        />
      </div>
    </div>
  )
}

export default CartList