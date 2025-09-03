package com.green.backend_shop.book_category.service;

import com.green.backend_shop.book.dto.BookDTO;
import com.green.backend_shop.book_category.dto.BookCategoryDTO;
import com.green.backend_shop.book_category.mapper.BookCategoryMapper;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookCategoryService {
  private final BookCategoryMapper bookCategoryMapper;

  //카테고리 목록 조회
  public List<BookCategoryDTO> getCateList(){
    return bookCategoryMapper.getCateList();
  }

}
