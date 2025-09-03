import React, { useState } from 'react'
import styles from './CheckBox.module.css'

const CheckBox = () => {
  //체크 박스에서 선태한 데이터를 저장할 state 변수
  //필터 함수는 배열 요소 중 특정 조건에 부합하는 데이터를 리턴 시켜줌
  //문법 : 패열.filter(()=>{return 조건})
  const [chkBox, setChkBox] = useState(['apple']); // 마운트시 체크 원하면 지정하면 됨
  //체크박스 변경시 실행되는 함수 
  const handleChkBox=(e)=>{
    if(e.target.checked) setChkBox(oldData=>([...oldData, e.target.value]));
    else setChkBox(chkBox.filter(data=>data != e.target.value));
   }
  return (
    <div>
      <input type="checkbox" value={'apple'} checked={chkBox.includes('apple')} onChange={e=>handleChkBox(e)}/>사과 
      <input type="checkbox" value={'orange'} checked={chkBox.includes('orange')} onChange={e=>handleChkBox(e)}/>오렌지 
      <input type="checkbox" value={'banana'} checked={chkBox.includes('banana')} onChange={e=>handleChkBox(e)}/>바나나 
    </div>
  )
}

export default CheckBox