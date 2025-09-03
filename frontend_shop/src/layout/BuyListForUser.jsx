import React from 'react'

const BuyListForUser = () => {
  return (
    <div>
      <p>구매 이력 조회</p>
      <div>
        <div>
          <span>주문번호</span>
          <input type="text" />
        </div>
        <div>
          <span>구매자ID</span>
          <input type="text" />
        </div>
        <div>
          <span>구매일시</span>
          <input type="text" />
          <span>-</span>
          <input type="text" />
        </div>
        
      </div>   
    </div>
  )
}

export default BuyListForUser