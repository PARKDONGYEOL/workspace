package com.green.backend_shop.book.dto;

import lombok.Data;

@Data
public class BookImgDTO {
    private int imgNum;
    private String originImgName;
    private String attachedImgName;
    private int bookNum;
    private String isMain;
}
