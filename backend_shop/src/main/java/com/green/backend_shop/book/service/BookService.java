package com.green.backend_shop.book.service;

import com.green.backend_shop.book.dto.BookDTO;
import com.green.backend_shop.book.dto.BookImgDTO;
import com.green.backend_shop.book.mapper.BookMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {
  private final BookMapper bookMapper;

  //도서 등록
  @Transactional(rollbackFor =  Exception.class)
  public void insertBook(BookDTO bookDTO, List<BookImgDTO> bookImgList){
    //BOOK, BOOK_IMG 테이블에 INSERT를 위해 가져온 데이터에는 BOOK_NUM이 없는 상태라서 bookNum을 조회
    int nextBookNum = bookMapper.getNextNum();
    bookDTO.setBookNum(nextBookNum);
    for(BookImgDTO dto : bookImgList) dto.setBookNum(nextBookNum);

    // BOOK 테이블에 도서 정보 INSERT
    bookMapper.insertBook(bookDTO);

    //BOOK_IMG 테이블에 도서 이미지 정보도 INSERT
    bookMapper.insertImgs(bookImgList);
  }

  //도서 목록 조회
  public List<BookDTO> getBookList(){
    return bookMapper.getBookList();
  }

  //도서 상세 조회
  public BookDTO getBookDetail(int bookNum){
    return bookMapper.getBookDetail(bookNum);
  }



}
