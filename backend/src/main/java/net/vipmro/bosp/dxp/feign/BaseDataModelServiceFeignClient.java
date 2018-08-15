package net.vipmro.bosp.dxp.feign;

import net.vipmro.athena.common.dto.Result;
import net.vipmro.athena.principal.starter.configure.AccessTokenFeignConfigure;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


/**
 * @author wangmt
 * @date 2017/12/13
 */
@FeignClient(value = "${service.hades.bdm:vipmro-hades-bdm}",configuration = AccessTokenFeignConfigure.class)
public interface BaseDataModelServiceFeignClient {

   /**
     * 加载省市区
     * @return
     */
    @RequestMapping(value = "/area/toArea", method = RequestMethod.GET)
    Result listToArea();

}
