package com.green.backend_shop.cart.dto;

import com.green.backend_shop.book.dto.BookDTO;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CartDTO {
  private int cartNum;
  private int bookNum;
  private int cartCnt;
  private String memId;
  private int totalPrice;
  private LocalDateTime cartDate;
  private BookDTO bookDTO;

}
