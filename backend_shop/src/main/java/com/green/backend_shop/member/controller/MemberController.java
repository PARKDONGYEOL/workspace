package com.green.backend_shop.member.controller;

import com.green.backend_shop.book.dto.BookDTO;
import com.green.backend_shop.member.dto.MemberDTO;
import com.green.backend_shop.member.service.MemberService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {
  private final MemberService memberService;

  //회원가입 api
  @PostMapping("")
  public void insertMember(@RequestBody MemberDTO memberDTO){
    System.out.println(memberDTO);
    memberService.join(memberDTO);
  }

  //id 사용 가능 여부 판단 api
  @GetMapping("/checkId/{memId}")
  public boolean checkId(@PathVariable("memId") String memId){
    //사용가능 : return true
    return memberService.isUsableId(memId);
  }

  //로그인 api
  //get 방식은 주로 리액트에서 하나의 데이터가 넘어온다. -> 문제없다
  //get 방식 사용 중 종종 리액트에서 넘어오는 데이터가 여러개 있는 경우가 있다
  @GetMapping("/login")
  public MemberDTO login(MemberDTO memberDTO){
    System.out.println(memberDTO);
    return memberService.login(memberDTO);
  }


}






