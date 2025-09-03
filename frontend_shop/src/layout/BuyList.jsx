import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './Buylist.module.css';
import Button from '../common/Button';
import Input from '../common/Input';
import PageTitle from '../common/PageTitle';

const BuyList = () => {
  const [buyList, setBuyList] = useState([]);

  useEffect(() => {
    axios.get('/api/buys/buy-list-admin')
      .then(res => {
        console.log(res.data);
        setBuyList(res.data);
      })
      .catch(e => console.log(e));
  }, []);

  return (
    <div className={styles.buyList_div}>
      <div>
        <PageTitle title="구매 이력 조회" />
      </div>

      {/* 검색 영역 */}
      <div className={styles.head_div}>
        <div>
          <span>주문번호</span>
          <Input type="text" size="50%" />
        </div>
        <div>
          <span>구매자ID</span>
          <Input type="text" size="60%" />
        </div>
        <div>
          <span>구매일시</span>
          <Input type="text" size="35%" />
          <span> - </span>
          <Input type="text" size="35%" />
        </div>
        <div>
          <Button title="검색" />
        </div>
      </div>

      {/* 테이블 영역 */}
      <div style={{width: '100%'}}>
          <table style={{width: '100%'}}>
          <colgroup>
            <col style={{ width: '5%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '18%' }} />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>No</th>
              <th>주문번호</th>
              <th>구매상품</th>
              <th>구매ID</th>
              <th>결제금액</th>
              <th>구매일시</th>
            </tr>
          </thead>
          <tbody>
            {buyList.map((data, index) => (
              <tr key={data.orderNum}>
                <td>{index + 1}</td>
                <td>{data.orderNum}</td>
                <td>{data.title}</td>
                <td>{data.memId}</td>
                <td>{data.price.toLocaleString()}원</td>
                <td>{data.buyDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BuyList;
