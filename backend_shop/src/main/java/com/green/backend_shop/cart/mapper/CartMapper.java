package com.green.backend_shop.cart.mapper;

import com.green.backend_shop.buy.dto.BuyDTO;
import com.green.backend_shop.cart.dto.CartDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CartMapper {

  //장바구니 등록
  public void addCart(CartDTO cartDTO);

  //장바구니 목록 조회
  public List<CartDTO> getCartList(String memId);

  //장바구니에 등록하려는 상품이 현재 등록되어 있는지 확인
  public String getCartNum(CartDTO cartDTO);

  //장바구니 상품 수정
  public void updateCartCnt(CartDTO cartDTO);

  public void deleteCart(int cartNum);

  public void updateCart(CartDTO cartDTO);

  public void deleteCartAll(BuyDTO buyDTO);

//  public void deleteCartAll(List<Integer> cartNumList);
}






