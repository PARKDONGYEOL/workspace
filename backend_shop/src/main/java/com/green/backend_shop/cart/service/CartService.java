package com.green.backend_shop.cart.service;

import com.green.backend_shop.cart.dto.CartDTO;
import com.green.backend_shop.cart.mapper.CartMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {
  private final CartMapper cartMapper;

  //장바구니 등록
  //현재 장바구니에 등록할 도서에 존재하면 수량을 업데이트
  //존재하지 않으면 등록
  public void addCart(CartDTO cartDTO){
    //현재 선택한 상품이 장바구니에 있는지 확인
    //장바구니에 담으려는 상품이 존재하지 않으면 result = null
    String result = cartMapper.getCartNum(cartDTO);

    //현재 내 장바구니에 없는 상품이면 장바구니에 등록
    if(result == null){
      cartMapper.addCart(cartDTO);
    }
    //현재 내 장바구니에 있는 상품이면 장바구니의 수량을 업데이트
    else{
      cartMapper.updateCartCnt(cartDTO);
    }
  }

  //장바구니 목록 조회
  public List<CartDTO> getCartList(String memId){
    return cartMapper.getCartList(memId);
  }

  public void deleteCart(int cartNum){ cartMapper.deleteCart(cartNum);}

  public void updateCart(CartDTO cartDTO) { cartMapper.updateCart(cartDTO);}

}
