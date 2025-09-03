//유효성 검사 결과 에러 메세지를 결정하는 함수
//두번째 매개변수 : 입력한 비밀번호
export const handleErrorMsg = (e, joinData) => {

  //아이디 유효성 검사(정규식 사용) 4~8글자, 영문과 숫자만 가능
  const memIdRegex = /^[A-Za-z0-9]{4,8}$/;

  // 영문과 숫자가 모두 포함해야 하는 정규식
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/;
  
  //유효성 검사 
  let errorStr = ''; //검사 결과 에러 메시지를 저장할 변수

  switch(e.target.name){
    case 'memId' : 
      if(!e.target.value){ //빈 문자열이면...
        errorStr = '아이디는 필수입력입니다';
      }
      else if(e.target.value.length < 4 || e.target.value.length > 8){
        errorStr = '아이디는 4~8글자여야 합니다';
      }
      else if(!memIdRegex.test(e.target.value)){
        errorStr = '아이디는 영문, 숫자만 가능합니다';
      }
      else{
        errorStr = '';
      }
      break;
    case 'memPw' : 
      if(e.target.value === ''){
        errorStr = '비밀번호는 필수입력입니다';
      }
      else if(e.target.value.length < 6 || e.target.value.length > 12){
        errorStr = '비밀번호는 6~12글자여야 합니다';
      }
      else if(!passwordRegex.test(e.target.value)){
        errorStr = '비밀번호는 영문과 숫자의 조합이어야 합니다';
      }
      else{
        errorStr = '';
      }
      break;
    case 'confirmPw' :
      //비밀번호와 일치하지 않으면...
      if(e.target.value !== joinData.memPw){
        errorStr = '비밀번호가 일치하지 않습니다';
      }

      break; 
  }

  return errorStr;
}
