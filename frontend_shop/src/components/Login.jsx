import React, { useState } from 'react'
import Modal from '../common/Modal'
import Input from '../common/Input'
import Button from '../common/Button'
import styles from './Login.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

//로그인 한 정보는 컴포넌트가 마운트 혹은 새로고침되어도 사라지지 않아야 한다.
//그래서 로그인 정보는 일반 변수나 state변수에 저장하면 안된다.
//클라이언트(웹 브라우저)는 자체적으로 데이터를 저장할 공간을 3개 제공한다.
//이 세 곳에 데이터를 저장하면 페이지가 새로고침되어도 데이터가 사라지지 않는다.
//3개의 공간 : Cookie, sessionStorage, localStorage
//Cookie : 문자열 데이터만 저장 가능, 
//         저장가능 크기 : 4kb
//         spring과 통신 시 자동으로 데이터가 전달 됨
//         저장 기간을 설정할 수 있음
//sessionStorage, localStorage : 문자열 데이터만 저장 가능,
//                               저장가능 크기 : 10mb
//                               spring과 통신 시 데이터는 명시적으로 전달해야 한다.
//sessionStorage vs localStorage
//localStorage : 저장된 데이터가 영구적. 직접 지우지 않으면 사라지지 않는다.
//               웹 브라우저 탭 간에 데이터를 공유하지 않는다.
//sessionStorage : 저장된 데이터가 웹 브라우저가 종료되면 자동으로 사라진다.
//                 웹 브라우저 탭 간에 데이터를 공유한다.

//sessionStorage, localStorage에 데이터를 저장하고 읽는 문법
//저장 문법
//sessionStorage.setItem('이름', 데이터),  localStorage.setItem('이름', 데이터)
// ex> sessionStorage.setItem('age', '20') 
//저장된 데이터를 읽는 문법
//sessionStorage.getItem('저장된 데이터 이름')
// ex> sessionStorage.getItem('age')
// sessionStorage에 저장된 데이터 삭제 문법
//sessionStorage.removeItem('저장된 데이터 이름')

const Login = ({isOpenLogin, onClose}) => {
  const nav = useNavigate();

  //입력한 id, pw을 저장할 state 변수
  const [loginData, setLoginData] = useState({
    'memId' : '',
    'memPw' : ''
  });

  //입력한 데이터를 저장하는 함수
  const handleLoginData = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name] : e.target.value
    })
  }

  //로그인 함수
  const login = () => {
    axios.get(`/api/members/login`, {params : loginData })
    .then(res => {
      // console.log(res.data)

      if(res.data){
        alert('환영합니다.');

        //로그인한 id, 이름, 권한 정보만을 갖는 객체를 생성
        const loginInfo = {
          'memId': res.data.memId,
          'memName' : res.data.memName,
          'memRole' : res.data.memRole
        }

        // console.log(loginInfo);
        // console.log(JSON.stringify(loginInfo));


        //로그인한 유저의 id, 이름, 권한을 sessionStorage에 저장
        //sessionStorage에는 문자열 데이터만 저장 가능하기 때문에
        //객체 타입의 res.data 를 직접 저장할 수는 없다.
        //그래서 객체를 문자열로 바꾸어서 저장한다.
        //res.data -> {'memId':'user', 'memName':'일반유저', 'memRole':'USER'}
        //문자열   -> "{'memId':'user', 'memName':'일반유저', 'memRole':'USER'}"

        //객체를 문자열로 바꾼 자료형 : JSON(제이슨)
        //객체를 문자열로 변경하는 문법 : JSON.stringify(객체)
        //JSON 데이터를 객체로 변경하는 문법 : JSON.parse(JSON데이터)
        sessionStorage.setItem('loginInfo', JSON.stringify(loginInfo));

        //로그인한 회원이 관리자면 상품등록 페이지로 이동
        if(res.data.memRole === 'ADMIN'){
          nav('/admin/reg-book');
        }
        //로그인한 회원이 일반 유저라면 상품 목록 페이지로 이동
        else{
          //모달 안 input태그를 초기화
          setLoginData({'memId' : '', 'memPw' : ''});

          //모달 닫기
          onClose();

          nav('/');
        }

      }
      else{
        alert('ID 혹은 비밀번호가 잘못 입력되었습니다');
      }      

    })
    .catch(e => console.log(e));
  }

  return (
    <Modal 
      isOpen={isOpenLogin}
      title='LOGIN'
      size='300px'
      onClose={onClose}
    >
      <div className={styles.login_div}>

        <div className={styles.login_input}>
          <Input 
            size='100%'
            placeholder='Input your ID'
            name='memId'
            value={loginData.memId}
            onChange={e => handleLoginData(e)}
            onKeyDown={e => {
              if(e.key === 'Enter') login()
            }}
          />
          <span>
            <i className="bi bi-person-fill"></i>
          </span>
        </div>

        <div className={styles.login_input}>
          <Input 
            size='100%'
            placeholder='Input your Password'
            type="password"
            name='memPw'
            value={loginData.memPw}
            onChange={e => handleLoginData(e)}
            onKeyDown={e => {
              if(e.key === 'Enter') login()
            }}
          />
          <span>
            <i className="bi bi-lock-fill"></i>
          </span>
        </div>

        <Button 
          size='100%'
          title='Sign In'
          onClick={e => login()}
        />  
      </div>
    </Modal>
  )
}

export default Login