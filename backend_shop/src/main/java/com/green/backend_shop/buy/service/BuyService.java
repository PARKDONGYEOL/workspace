package com.green.backend_shop.buy.service;

import com.green.backend_shop.buy.dto.BuyDTO;
import com.green.backend_shop.buy.dto.BuyDTOForAdmin;
import com.green.backend_shop.buy.mapper.BuyMapper;
import com.green.backend_shop.cart.mapper.CartMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BuyService {
    private final BuyMapper buyMapper;
    private final CartMapper cartMapper;

    //도서 상세 페이지 구매하기
    public void buyAdd(BuyDTO buyDTO){
        buyMapper.buyAdd(buyDTO);
    }

    //장바구니 페이지 구매하기
    //shop_buy 테이블 인서트 쿼리와  shop_cart 델리트 쿼리는 둘다 묶어 성공해야한다. (transaction)
    // ** 한나의 메소드가 같이 있어야 프랜제이션이을 묶을수 있어 롤백을 할수 있다. (메소드내 모든 쿼리 실행이 정상작동되야 commit)
    //Transactional어노테이션은 메소드내의 커리를 모두 묶음
    //rollbackFor 어떤 경우에 롤백을 진행 할지 설정
    //Exception.class 모든 오류에 롤백
    @Transactional(rollbackFor = Exception.class)
    public void buyAll(BuyDTO buyDTO){
        //shop_buy 테이블에 구매 정보 인서트
        buyMapper.buyAll(buyDTO);

        //구매한 장바구니 정보는 shop_cart 테이블에서 Delete
        cartMapper.deleteCartAll(buyDTO);
    }

   public List<BuyDTOForAdmin> getBuylistForAdmin(){
        return buyMapper.getBuylistForAdmin();
   }
}
