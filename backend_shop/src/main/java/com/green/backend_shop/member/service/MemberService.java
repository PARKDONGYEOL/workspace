package com.green.backend_shop.member.service;

import com.green.backend_shop.member.dto.MemberDTO;
import com.green.backend_shop.member.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
  private final MemberMapper memberMapper;

  //회원가입
  public void join(MemberDTO memberDTO){
    memberMapper.join(memberDTO);
  }

  //아이디 사용가능 여부 확인
  //사용가능 : return true
  public boolean isUsableId(String memId){
    // 조회된 데이터가 없으면 null -> 사용 가능한 id
    String selectedId = memberMapper.checkMemId(memId);
    return selectedId == null;
  }

  //로그인
  public MemberDTO login(MemberDTO memberDTO){
    return memberMapper.login(memberDTO);
  }


}
