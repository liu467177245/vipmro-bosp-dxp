package net.vipmro.bosp.dxp;

import net.vipmro.athena.principal.starter.interceptor.AccessTokenCookieContextHandlerInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.cloud.client.SpringCloudApplication;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * @author edward
 * @date 2017/12/12
 */
@SpringCloudApplication
@EnableFeignClients(basePackages = {
        "net.vipmro.athena.multipart.starter.feign",
        "net.vipmro.athena.principal.starter.feign",
        "net.vipmro.athena.dict.starter.feign",
        "net.vipmro.athena.log.starter.feign",
        "net.vipmro.bosp.dxp.feign"
})
public class DxpServer {

    public static void main( String[] args ) {
        SpringApplication.run(DxpServer.class,args);
    }

    @Configuration
    protected class WebMvcConfigurer extends WebMvcConfigurerAdapter {
        @Autowired
        private  AccessTokenCookieContextHandlerInterceptor contextHandlerInterceptor;

        @Override
        public void addInterceptors(InterceptorRegistry registry) {
            registry.addInterceptor(contextHandlerInterceptor).addPathPatterns("/**");
        }
    }
}
