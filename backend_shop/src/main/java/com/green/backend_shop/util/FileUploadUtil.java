package com.green.backend_shop.util;

import com.green.backend_shop.book.dto.BookImgDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

//파일 업로드 기능을 제공하는 클래스
public class FileUploadUtil {

  //단일 파일 업로드 기능
  public static BookImgDTO fileUpload(MultipartFile img){
    // 1) 파일 업로드 경로 지정
    String uploadPath = "D:\\01-STUDY\\dev\\workspace_spring\\backend_shop\\src\\main\\resources\\static\\upload\\";

    // 2) 파일명 중복방지를 위해 업로드를 파일명을 세팅
    // ex> 원본 파일명 : java.jpg  -> fgfsdgdfgffefef.jpg
    // ex> 원본 파일명 : java.txt  -> hyhdfvsrrsfr.txt
    String attachedFileName = UUID.randomUUID().toString();

    //String testName = "aaa.edf.jpg";
    //testName.substring(3); //.jpg
    //testName.lastIndexOf("."); //특정 문자의 가장 마지막 index를 파악

    //원본 파일의 확장자 추출
    // "abc.jpg" -> 3
    int index = img.getOriginalFilename().lastIndexOf(".");
    String extension = img.getOriginalFilename().substring(index);

    //완성된 업로드할 파일명
    attachedFileName = attachedFileName + extension;

    // 3) 파일 업로드
    //java.io.File
    //파일이 생성될 경로와 파일명을 세팅 (ex> D:\\study\\upload\\abc.jpg )
    File f = new File(uploadPath + attachedFileName);

    //세팅된 경로와 파일명을 실제 파일로 변환
    try{
      img.transferTo(f);
    }catch(Exception e){
      System.out.println(e);
    }

    //BOOK_IMG INSERT에 필요 데이터 RETURN

    BookImgDTO bookImgDTO = new BookImgDTO();
    bookImgDTO.setOriginImgName(img.getOriginalFilename());
    bookImgDTO.setAttachedImgName(attachedFileName);
    bookImgDTO.setIsMain("Y");
    return bookImgDTO;
  }

  //파일 다중 업로드 기능 배열형태로 전달됨
  public static List<BookImgDTO> multipleFileUpload(MultipartFile[] subImgs){
    List<BookImgDTO> imgList = new ArrayList<>();
    for (MultipartFile img : subImgs) {
      BookImgDTO imgDTO = fileUpload(img);
      imgDTO.setIsMain("N");
      imgList.add(imgDTO);
    }

    return imgList;
  }

}
