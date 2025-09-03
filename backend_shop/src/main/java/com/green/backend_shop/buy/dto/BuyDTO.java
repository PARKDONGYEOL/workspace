package com.green.backend_shop.buy.dto;

import com.green.backend_shop.book.dto.BookDTO;
import com.green.backend_shop.member.dto.MemberDTO;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class BuyDTO {
    private int buyNum;
    private int bookNum;
    private String memId;
    private int buyCnt;
    private int orderNum;
    private LocalDateTime buyDate;
    //리엑트에서 전달되는 cartNum 목록데이터(cartNumList)
    private List<Integer> cartNumList;
}
