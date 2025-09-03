package com.green.backend_shop.buy.mapper;

import com.green.backend_shop.buy.dto.BuyDTO;
import com.green.backend_shop.buy.dto.BuyDTOForAdmin;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BuyMapper {

    //도서 상세 페이지 구매하기
    public void buyAdd(BuyDTO buyDTO);
    public void buyAll(BuyDTO buyDTO);
    public List<BuyDTOForAdmin> getBuylistForAdmin();

}
