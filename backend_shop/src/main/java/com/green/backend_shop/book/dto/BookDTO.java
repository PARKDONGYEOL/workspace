package com.green.backend_shop.book.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class BookDTO {
  private int bookNum;
  private String title;
  private String publisher;
  private int price;
  private LocalDateTime regDate;
  private String bookIntro;
  private int cateNum;
  private List<BookImgDTO> bookImgDTO;
}
