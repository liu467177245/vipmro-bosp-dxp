package net.vipmro.bosp.dxp.controller;


import net.vipmro.athena.common.dto.Result;
import net.vipmro.bosp.dxp.feign.BaseDataModelServiceFeignClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 基础资料-地区 Controller
 *
 * @author wmt
 * @date 2017/12/06
 */
@RestController
@RequestMapping("/api/area")
public class AreaController {

    @Autowired
    private BaseDataModelServiceFeignClient baseService;


    /**
     * 根据父级ID加载中国省市区
     * @return
     */
    @GetMapping
    public Result listToArea(){
        return baseService.listToArea();
    }


}

