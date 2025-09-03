package com.green.backend_shop.buy.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BuyDTOForAdmin {
    private int orderNum;
    private String title;
    private String memId;
    private int price;
    private LocalDateTime buyDate;
}
