import React, { useEffect, useRef, useState } from 'react'
import styles from './RegBook.module.css'
import Button from '../common/Button'
import Select from '../common/Select'
import Input from '../common/Input'
import axios from 'axios'
import PageTitle from '../common/PageTitle'
import Textarea from '../common/Textarea'

const RegBook = () => {
  //선택한 메인 이미지를 저장할 state 변수
  const [mainImg, setMainImg] = useState(null);
  const [subImgs, setSubImgs] = useState(null);
  const mainImgRef = useRef(null);
  const subImgsRef = useRef(null);

  //유효성 검사 결과 에러 메시지를 저장하고 있는 state 변수
  const [errorMsg, setErrorMsg] = useState({
    'cateNum' : '',
    'title' : '',
    'price' : '',
    'publisher' : ''
  });

  //등록 버튼 활성화 여부를 저장할 state 변수
  const [isDisabled, setIsDisabled] = useState(true);  

  //조회된 카테고리 목록을 저장할 state 변수
  const [cateList, setCateList] = useState([]);
  
  //입력받은 정보를 저장할 state 변수
  const [bookData, setBookData] = useState({
    'cateNum':'',
    'title' : '',
    'publisher' : '',
    'price' : '',
    'bookIntro' : ''
  });
  // console.log(bookData.price.toLocaleString())

  //값 입력 시 실행 함수
  const handleBookData = (e) => {
    //만약 가격 데이터가 들어왔다면 천단위 구분기호를 제외한다.
    setBookData({
      ...bookData,
      [e.target.name] : e.target.name === 'price' 
                        ?               
                        e.target.value.replaceAll(',' , '') 
                        :
                        e.target.value
    })
  }

  //마운트되면 카테고리 목록을 조회해서 cateList 변수에 저장
  useEffect(() => {
    axios.get('/api/categories')
    .then(res => setCateList(res.data))
    .catch(e => console.log(e));
  }, []);

  //마운트되거나, bookData가 변경되어 리렌더링되면 버튼 활성화 여부 변경
  useEffect(() => {
    //버튼 활성화 여부를 판단하여 disable 변경
    if(bookData.cateNum !== '' && 
        bookData.title !== '' &&
        bookData.publisher !== '' &&
        bookData.price !== ''){
      setIsDisabled(false);    
    }
    else{
      setIsDisabled(true);    
    }
  }, [bookData]);

  //도서 등록 함수
  const regBook = () => {
    
    //선택한 첨부파일 spring으로 가져가기
    //파일 데이터를 자바로 전송하기 위해서는 post() 함수의 세 번째 매개변수를 활용해야 한다.

    //전달되는 데이터에 파일 데이터도 포함되어 있습니다. 라는 정의
    const fileConfig = {'Content-Type' : 'multipart/form-data'};

    //파일 데이터가 포함된 내용을 자바로 전달할 때는 formData 객체를 사용해야 한다.
    // 1. formData 객체 생성
    const formData = new FormData();

    //선택한 메인이미지를 formData에 추가
    formData.append('mainImg', mainImg);

    //선택한 서브이미지를 formData에 추가
    subImgs.forEach((file) => { formData.append('subImgs', file); });   

    //
    formData.append('cateNum',bookData.cateNum);
    formData.append('title',bookData.title);
    formData.append('publisher',bookData.publisher);
    formData.append('price',bookData.price);
    formData.append('bookIntro',bookData.bookIntro);



    //formData.append('name', 'kim');
    //formData.append('age', 20);

    axios.post('/api/books', formData, fileConfig)
      .then(res => {
      alert('등록 성공');
      setBookData({
        'cateNum':'',
        'title' : '',
        'publisher' : '',
        'price' : '',
        'bookIntro' : ''
      });
      setMainImg(null);
      setSubImgs(null);
      mainImgRef.current.value = '';
      subImgsRef.current.value = ''; 
    })
    .catch(e => console.log(e));
  }

  // console.log(bookData);

  return (
    <div className={styles.container}>
      <PageTitle title="도서 등록" />
      <div className={styles.content}>
        <div>
          <p>도서 카테고리</p>
          <Select
            size="100%"
            name='cateNum'
            value={bookData.cateNum}
            onChange={e => {
              handleBookData(e)

              setErrorMsg({
                ...errorMsg,
                'cateNum' : e.target.value === '' ? '카테고리를 선택하세요' : ''
              })
            }}
          >
            <option value=''>카테고리 선택</option>
            {
              cateList.map((e, i) => {
                return (
                  <option key={i} value={e.cateNum}>
                    {e.cateName}
                  </option>
                )
              })
            }
          </Select>
          <p>{errorMsg.cateNum}</p>
        </div>
        <div>
          <p>도서명</p>
          <Input 
            size="100%"
            name='title'
            value={bookData.title}
            onChange={e => {
              handleBookData(e)

              setErrorMsg({
                ...errorMsg,
                'title' : e.target.value === '' ? '도서명은 필수입력입니다' : ''
              })
              
            }}
          />
          <p>{errorMsg.title}</p>
        </div>
        <div>
          <p>출판사</p>
          <Input 
            size="100%"
            name='publisher'
            value={bookData.publisher}
            onChange={e => {
              handleBookData(e)

              setErrorMsg({
                ...errorMsg,
                'publisher' : e.target.value === '' ? '출판사는 필수입력입니다' : ''
              })
            }}
          />
          <p>{errorMsg.publisher}</p>
        </div>
        <div>
          <p>가 격</p>
          <Input 
            size="100%"
            name='price'
            value={
              bookData.price === '' 
              ? 
              bookData.price 
              : 
              parseInt(bookData.price).toLocaleString()
            }
            onChange={e => {
              handleBookData(e)
            
              setErrorMsg({
                ...errorMsg,
                'price' : e.target.value === '' ? '가격은 필수입력입니다' : ''
              })
            }}
          />
          <p>{errorMsg.price}</p>
        </div>
        <div>
          <p>메인 이미지</p>
          <input 
            type="file" 
            ref={mainImgRef}
            onChange={e => {
              //e.target.files -> 이벤트가 발생한 태그에서 선택한 파일들의 정보
              // console.log(e.target.files);

              //우리가 선택한 파일 정보
              // console.log(e.target.files['0']);

              //선택한 파일을 mainImg 변수에 저장
              setMainImg(e.target.files['0']);

            }}
          />
        </div>
        <div>
          <p>서브 이미지(다수 선택 가능)</p>
          {/* type="file"은 첨부파일 1개만 선택 가능. 다수 파일 선택하려면 multiple={true} 속성 부여 */}
          <input type="file" multiple={true}
            ref={subImgsRef}
            onChange={e=>{
              const fileArr = [];
              for(let i = 0 ; i < e.target.files.length; i++){
                fileArr.push(e.target.files[i]
                )
              } 
              setSubImgs(fileArr);
            }}
          />
        </div>
        <div>
          <p>도서 설명</p>
          <Textarea
            size='100%'
            height='80px' 
            name='bookIntro'
            value={bookData.bookIntro}
            onChange={e => handleBookData(e)}
          />
        </div>
        <div style={{'textAlign':'right'}}>
          <Button 
            title='등 록' 
            onClick={e => regBook()}
            disabled={isDisabled}
          />
        </div>
      </div>
    </div>
  )
}

export default RegBook