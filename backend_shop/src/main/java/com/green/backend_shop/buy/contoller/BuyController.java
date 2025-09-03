package com.green.backend_shop.buy.contoller;

import com.green.backend_shop.buy.dto.BuyDTO;
import com.green.backend_shop.buy.dto.BuyDTOForAdmin;
import com.green.backend_shop.buy.service.BuyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/buys")
public class BuyController {
    private final BuyService buyService;

    //도서 상세 페이지 구매하기
    @PostMapping()
    public void insertBuy(@RequestBody BuyDTO buyDTO){
        buyService.buyAdd(buyDTO);
    }

    @PostMapping("/all")
    public void buyAll(@RequestBody BuyDTO buyDTO){
        buyService.buyAll(buyDTO);
    }

    @GetMapping("/buy-list-admin")
    public List<BuyDTOForAdmin> getBuylistForAdmin(){
        return buyService.getBuylistForAdmin();
    }
}
