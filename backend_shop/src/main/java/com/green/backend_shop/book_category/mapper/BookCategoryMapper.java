package com.green.backend_shop.book_category.mapper;

import com.green.backend_shop.book_category.dto.BookCategoryDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BookCategoryMapper {
  //카테고리 목록 조회
  public List<BookCategoryDTO> getCateList();


}
