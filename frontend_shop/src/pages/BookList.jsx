import React, { useEffect, useState } from 'react'
import styles from './BookList.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookList = () => {
  const nav = useNavigate();

  //도서 목록을 저장할 state 변수
  const [bookList, setBookList] = useState([]);

  //마운트되면 도서목록을 조회해서 bookList 변수에 저장
  useEffect(() => {
    axios.get('/api/books')
    .then(res =>{ setBookList(res.data)})
    .catch(e => console.log(e));
  }, []);


  return (
    <div className={styles.container}>
    {
      bookList.map((book, i) => {
        return (
          <div key={i}>
            <div 
              className={styles.img_div} 
              onClick={e => nav(`/book-detail/${book.bookNum}`)}
            >
              <img src={`http://localhost:8080/upload/${book.bookImgDTO[0].attachedImgName}`}   />
            </div>
            <div className={styles.info}>
              <p>{book.title}</p>
              <p>{'￦' + book.price.toLocaleString()}</p>
            </div>
          </div>
        )
      })
    }
    </div>
  )
}

export default BookList